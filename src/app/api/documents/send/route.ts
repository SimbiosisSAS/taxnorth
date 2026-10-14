import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { escapeHtml } from '@/lib/html'
import { rateLimit, clientIp } from '@/lib/rateLimit'

const resend = new Resend(process.env.RESEND_API_KEY)

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function maskSensitiveFields(fields: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(fields)) {
    const isSin = /(^|[^a-z])sin([^a-z]|$)|social.?insurance/i.test(key)
    if (isSin) {
      const digits = String(value ?? '').replace(/\D/g, '')
      result[key] = digits.length >= 3 ? `***-***-${digits.slice(-3)}` : '[hidden]'
    } else {
      result[key] = value
    }
  }
  return result
}

// Second step of the document flow: the client has seen the extracted data and agreed to send it.
// /api/documents/process only reads and stores the document; nothing is emailed until this route is called.
export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(`doc-send-ip:${clientIp(req)}`, 30, 60 * 60 * 1000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    let body: { documentId?: unknown; sessionId?: unknown }
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
    const documentId = typeof body.documentId === 'string' ? body.documentId : ''
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId : ''

    if (!documentId || !UUID_REGEX.test(documentId)) {
      return NextResponse.json({ error: 'Valid documentId required' }, { status: 400 })
    }

    // Verify the document belongs to this session
    let query = supabaseAdmin
      .from('documents')
      .select('*')
      .eq('id', documentId)

    if (sessionId && UUID_REGEX.test(sessionId)) {
      query = query.eq('session_id', sessionId)
    }

    const { data: document, error } = await query.single()

    if (error || !document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    if (document.sent_to_cpa) {
      return NextResponse.json({ success: true, alreadySent: true })
    }

    // a document whose extraction failed has nothing to send
    if (document.status !== 'completed') {
      return NextResponse.json({ error: 'Document was not processed' }, { status: 409 })
    }

    if (!process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Admin email not configured' }, { status: 500 })
    }

    const extractedData = (document.extracted_data as Record<string, unknown>) || {}
    const docType = (extractedData.document_type as string) || 'Tax Document'
    const taxYear = (extractedData.tax_year as string) || 'Unknown year'
    const issuer = (extractedData.issuer_name as string) || 'Unknown issuer'
    const recipient = (extractedData.recipient_name as string) || 'Unknown'
    const fields = (extractedData.fields as Record<string, unknown>) || {}
    const emailFields = maskSensitiveFields(fields)

    await resend.emails.send({
      from: 'TaxNorth <hello@taxnorth.ca>',
      to: process.env.ADMIN_EMAIL,
      subject: `Document (client consent) — ${docType} ${taxYear} — ${recipient}`.replace(/[\r\n]+/g, ' '),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1A2744;padding:24px;border-radius:8px 8px 0 0">
            <h1 style="color:#F4A332;margin:0;font-size:18px">Document Sent with Client Consent</h1>
            <p style="color:white;opacity:.7;margin:8px 0 0;font-size:14px">
              ${escapeHtml(docType)} · ${escapeHtml(taxYear)} · ${escapeHtml(recipient)}
            </p>
          </div>
          <div style="background:#FAF8F5;padding:24px;border-radius:0 0 8px 8px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#666;font-size:14px;width:160px">Document type</td><td style="padding:8px 0;color:#1A2744;font-weight:600;font-size:14px">${escapeHtml(docType)}</td></tr>
              <tr style="border-top:1px solid #EEF1F7"><td style="padding:8px 0;color:#666;font-size:14px">Tax year</td><td style="padding:8px 0;color:#1A2744;font-size:14px">${escapeHtml(taxYear)}</td></tr>
              <tr style="border-top:1px solid #EEF1F7"><td style="padding:8px 0;color:#666;font-size:14px">Issuer</td><td style="padding:8px 0;color:#1A2744;font-size:14px">${escapeHtml(issuer)}</td></tr>
              <tr style="border-top:1px solid #EEF1F7"><td style="padding:8px 0;color:#666;font-size:14px">Recipient</td><td style="padding:8px 0;color:#1A2744;font-size:14px">${escapeHtml(recipient)}</td></tr>
            </table>
            <h3 style="color:#1A2744;font-size:14px;margin:20px 0 12px">Extracted Fields</h3>
            <table style="width:100%;border-collapse:collapse">
              ${Object.entries(emailFields).map(([k, v]) => `
                <tr style="border-top:1px solid #EEF1F7">
                  <td style="padding:6px 0;color:#666;font-size:13px;width:200px">${escapeHtml(String(k).replace(/_/g,' ').replace(/box /gi,'Box '))}</td>
                  <td style="padding:6px 0;color:#1A2744;font-size:13px;font-weight:500">${escapeHtml(String(v))}</td>
                </tr>`).join('')}
            </table>
            ${document.file_url ? `
            <div style="margin-top:24px;padding-top:16px;border-top:1px solid #EEF1F7">
              <a href="${escapeHtml(document.file_url)}" style="background:#F4A332;color:#1A2744;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px">
                View Original Document →
              </a>
              <p style="color:#999;font-size:11px;margin:8px 0 0">Link expires in 7 days</p>
            </div>` : ''}
            <p style="color:#999;font-size:11px;margin:16px 0 0">
              Document ID: ${escapeHtml(documentId)} · Session: ${escapeHtml(sessionId || 'N/A')}
            </p>
          </div>
        </div>`,
    })

    await supabaseAdmin
      .from('documents')
      .update({ sent_to_cpa: true, sent_at: new Date().toISOString() })
      .eq('id', documentId)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Document send error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
