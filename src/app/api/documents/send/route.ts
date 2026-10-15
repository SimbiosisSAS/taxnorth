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
    if (isSin || /^\d{3}[ -]?\d{3}[ -]?\d{3}$/.test(String(value ?? '').trim())) {
      const digits = String(value ?? '').replace(/\D/g, '')
      result[key] = digits.length >= 3 ? `***-***-${digits.slice(-3)}` : '[hidden]'
    } else {
      result[key] = value
    }
  }
  return result
}

// Second step of the document flow: the client has seen the extracted data and agreed to share it.
// /api/documents/process only reads and stores the document; nothing is emailed until this route is called.
//
// Rules:
//  - no lead for the session (no contact details)  -> nothing is sent, answer 409 contact_required
//  - lead with payment not confirmed               -> emailed to the admin marked "hold until payment is confirmed"
//  - lead with payment confirmed                   -> emailed to the admin with the client's contact data and accountant
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
    if (!sessionId || !UUID_REGEX.test(sessionId)) {
      return NextResponse.json({ error: 'Valid sessionId required' }, { status: 400 })
    }

    // the document must belong to this session
    const { data: document, error } = await supabaseAdmin
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .eq('session_id', sessionId)
      .single()

    if (error || !document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    if (document.sent_to_cpa) {
      return NextResponse.json({ success: true, alreadySent: true, status: 'sent' })
    }

    // a document whose extraction failed has nothing to send
    if (document.status !== 'completed') {
      return NextResponse.json({ error: 'Document was not processed' }, { status: 409 })
    }

    // without contact details nobody could answer the client
    const { data: lead } = await supabaseAdmin
      .from('leads')
      .select('full_name, email, phone, province, language, payment_status, professional_name')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!lead) {
      return NextResponse.json({ error: 'contact_required' }, { status: 409 })
    }

    if (!process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Admin email not configured' }, { status: 500 })
    }

    const paid = lead.payment_status === 'completed'

    let accountant: { name: string | null; firm_name: string | null; email: string | null } | null = null
    if (lead.professional_name) {
      const { data: pro } = await supabaseAdmin
        .from('professionals')
        .select('name, firm_name, email')
        .eq('name', lead.professional_name)
        .limit(1)
        .maybeSingle()
      accountant = pro || { name: lead.professional_name, firm_name: null, email: null }
    }

    const extractedData = (document.extracted_data as Record<string, unknown>) || {}
    const docType = (extractedData.document_type as string) || 'Tax Document'
    const taxYear = (extractedData.tax_year as string) || 'Unknown year'
    const issuer = (extractedData.issuer_name as string) || 'Unknown issuer'
    const recipient = (extractedData.recipient_name as string) || 'Unknown'
    const fields = (extractedData.fields as Record<string, unknown>) || {}
    const emailFields = maskSensitiveFields(fields)
    const clientName = lead.full_name || recipient

    const { error: sendError } = await resend.emails.send({
      from: 'TaxNorth <hello@taxnorth.ca>',
      to: process.env.ADMIN_EMAIL,
      subject: `${paid ? '' : '[PAYMENT PENDING] '}Document (client consent) — ${docType} ${taxYear} — ${clientName}`.replace(/[\r\n]+/g, ' '),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1A2744;padding:24px;border-radius:8px 8px 0 0">
            <h1 style="color:#F4A332;margin:0;font-size:18px">Document Shared with Client Consent</h1>
            <p style="color:white;opacity:.7;margin:8px 0 0;font-size:14px">
              ${escapeHtml(docType)} · ${escapeHtml(taxYear)} · ${escapeHtml(clientName)}
            </p>
          </div>
          <div style="background:#FAF8F5;padding:24px;border-radius:0 0 8px 8px">
            ${paid ? '' : `
            <div style="background:#FFF4DC;border-left:4px solid #F4A332;padding:12px 16px;margin-bottom:20px;font-size:14px;color:#1A2744">
              <strong>Payment not confirmed yet.</strong> Hold this document and pass it to the accountant only after the payment is confirmed.
            </div>`}
            <h3 style="color:#1A2744;font-size:14px;margin:0 0 12px">Client</h3>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#666;font-size:14px;width:160px">Name</td><td style="padding:6px 0;color:#1A2744;font-weight:600;font-size:14px">${escapeHtml(lead.full_name || 'Not provided')}</td></tr>
              <tr style="border-top:1px solid #EEF1F7"><td style="padding:6px 0;color:#666;font-size:14px">Email</td><td style="padding:6px 0;font-size:14px"><a href="mailto:${escapeHtml(lead.email)}" style="color:#1A2744">${escapeHtml(lead.email || 'Not provided')}</a></td></tr>
              <tr style="border-top:1px solid #EEF1F7"><td style="padding:6px 0;color:#666;font-size:14px">Phone</td><td style="padding:6px 0;font-size:14px"><a href="tel:${escapeHtml(lead.phone)}" style="color:#1A2744">${escapeHtml(lead.phone || 'Not provided')}</a></td></tr>
              <tr style="border-top:1px solid #EEF1F7"><td style="padding:6px 0;color:#666;font-size:14px">Province</td><td style="padding:6px 0;color:#1A2744;font-size:14px">${escapeHtml(lead.province || 'Not provided')}</td></tr>
              <tr style="border-top:1px solid #EEF1F7"><td style="padding:6px 0;color:#666;font-size:14px">Language</td><td style="padding:6px 0;color:#1A2744;font-size:14px">${escapeHtml(lead.language || 'Not provided')}</td></tr>
              <tr style="border-top:1px solid #EEF1F7"><td style="padding:6px 0;color:#666;font-size:14px">Payment</td><td style="padding:6px 0;color:#1A2744;font-size:14px">${escapeHtml(paid ? 'Confirmed' : (lead.payment_status || 'Pending'))}</td></tr>
              <tr style="border-top:1px solid #EEF1F7"><td style="padding:6px 0;color:#666;font-size:14px">Accountant</td><td style="padding:6px 0;color:#1A2744;font-size:14px">${accountant ? escapeHtml([accountant.name, accountant.firm_name, accountant.email].filter(Boolean).join(' · ')) : 'Not assigned yet'}</td></tr>
            </table>
            <h3 style="color:#1A2744;font-size:14px;margin:20px 0 12px">Document</h3>
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
              Document ID: ${escapeHtml(documentId)} · Session: ${escapeHtml(sessionId)}
            </p>
          </div>
        </div>`,
    })

    // Resend does not throw when it rejects an email: it returns an error. Without this check the
    // document would be marked as sent even though nobody received it.
    if (sendError) {
      console.error('Document email was rejected:', sendError.message || sendError)
      return NextResponse.json({ error: 'Email could not be sent' }, { status: 502 })
    }

    // paid: the document counts as sent. Not paid yet: only the time of the notification is stored, so it
    // can be sent again once the payment is confirmed.
    await supabaseAdmin
      .from('documents')
      .update(paid
        ? { sent_to_cpa: true, sent_at: new Date().toISOString() }
        : { sent_at: new Date().toISOString() })
      .eq('id', documentId)

    return NextResponse.json({ success: true, status: paid ? 'sent' : 'pending_payment' })

  } catch (error) {
    console.error('Document send error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
