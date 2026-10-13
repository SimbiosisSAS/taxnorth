import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { escapeHtml } from '@/lib/html'
import { rateLimit, clientIp } from '@/lib/rateLimit'

const resend = new Resend(process.env.RESEND_API_KEY)
const IMAGE_MODEL = 'openai/gpt-4o-mini'
const TEXT_MODEL = 'deepseek/deepseek-v4-flash'

const MAX_FILE_BYTES = 10 * 1024 * 1024
const MAX_DOCS_PER_SESSION_PER_DAY = 10
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// Checks the first bytes of the file, so a renamed file or a spoofed Content-Type is rejected.
function matchesDeclaredType(buf: Buffer, mime: string): boolean {
  if (mime === 'application/pdf') return buf.subarray(0, 5).toString('latin1') === '%PDF-'
  if (mime === 'image/jpeg') return buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff
  if (mime === 'image/png') return buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  if (mime === 'image/webp') return buf.subarray(0, 4).toString('latin1') === 'RIFF' && buf.subarray(8, 12).toString('latin1') === 'WEBP'
  if (mime === 'image/heic') return buf.subarray(4, 8).toString('latin1') === 'ftyp'
  return false
}

// SIN values are masked in the admin email (the original file and the stored data are untouched).
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

const EXTRACTION_PROMPT = `You are a Canadian tax document analyzer. Extract all information from this document.

Identify the document type: T4, T4A, T4E, T5, T3, T2202, T5018, Notice of Assessment, RRSP Receipt, or other.

Extract ALL fields that actually appear. Do NOT invent values.

For T5018: payer name, payer BN, recipient name, recipient SIN/BN, total payments, year, province.
For T4: employer name, employee name, year, all boxes with values.
For others: every visible field and value.

Return ONLY valid JSON:
{
  "document_type": "actual type",
  "tax_year": "actual year",
  "issuer_name": "actual name",
  "recipient_name": "actual name",
  "fields": { "field_name": "actual value" },
  "confidence": "high|medium|low",
  "notes": "observations"
}`

async function extractFromImage(
  base64Content: string,
  mimeType: string
): Promise<Record<string, unknown>> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://www.taxnorth.ca',
      'X-Title': 'TaxNorth.ca',
    },
    body: JSON.stringify({
      model: IMAGE_MODEL,
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64Content}` } },
          { type: 'text', text: EXTRACTION_PROMPT },
        ],
      }],
      max_tokens: 2000,
    }),
  })
  if (!response.ok) throw new Error(`Image API error: ${response.status}`)
  const result = await response.json()
  const content = result.choices[0]?.message?.content || ''
  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON in image response')
  return JSON.parse(jsonMatch[0])
}

async function extractFromPDF(buffer: Buffer): Promise<Record<string, unknown>> {
  const { extractText } = await import('unpdf')
  const { text } = await extractText(new Uint8Array(buffer), { mergePages: true })

  console.log('PDF text length:', text.length)

  if (!text || text.trim().length < 20) {
    throw new Error('Could not extract text from PDF')
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://www.taxnorth.ca',
      'X-Title': 'TaxNorth.ca',
    },
    body: JSON.stringify({
      model: TEXT_MODEL,
      messages: [{
        role: 'user',
        content: `${EXTRACTION_PROMPT}\n\nDOCUMENT TEXT:\n${text}`,
      }],
      max_tokens: 2000,
    }),
  })
  if (!response.ok) throw new Error(`Text API error: ${response.status}`)
  const result = await response.json()
  const content = result.choices[0]?.message?.content || ''
  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON in PDF response')
  return JSON.parse(jsonMatch[0])
}

export async function POST(req: NextRequest) {
  try {
    // max 20 uploads per hour per IP (per server instance)
    if (!rateLimit(`doc-ip:${clientIp(req)}`, 20, 60 * 60 * 1000)) {
      return NextResponse.json({ error: 'Too many uploads. Please try again later.' }, { status: 429 })
    }

    const declaredLength = Number(req.headers.get('content-length') || 0)
    if (declaredLength > MAX_FILE_BYTES + 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum 10 MB.' }, { status: 413 })
    }

    const formData = await req.formData()
    const file = formData.get('file')
    const sessionId = formData.get('sessionId')

    if (!(file instanceof File) || typeof sessionId !== 'string' || !UUID_REGEX.test(sessionId)) {
      return NextResponse.json({ error: 'File and sessionId are required' }, { status: 400 })
    }

    if (file.size === 0 || file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: 'File too large. Maximum 10 MB.' }, { status: 413 })
    }

    // at most 10 documents per session per 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { count: recentDocs } = await supabaseAdmin
      .from('documents')
      .select('id', { count: 'exact', head: true })
      .eq('session_id', sessionId)
      .gte('created_at', since)
    if ((recentDocs || 0) >= MAX_DOCS_PER_SESSION_PER_DAY) {
      return NextResponse.json({ error: 'Daily document limit reached. Please try again tomorrow.' }, { status: 429 })
    }

    // the conversation is looked up on the server, never taken from the client
    const { data: conversation } = await supabaseAdmin
      .from('conversations')
      .select('id')
      .eq('session_id', sessionId)
      .maybeSingle()
    const conversationId: string | null = conversation?.id ?? null

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Unsupported file type.' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    if (!matchesDeclaredType(buffer, file.type)) {
      return NextResponse.json({ error: 'File content does not match its type.' }, { status: 400 })
    }
    const base64 = buffer.toString('base64')

    console.log('Processing document:', file.type, buffer.length, 'bytes')

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-100) || 'document'
    const filePath = `${sessionId}/${Date.now()}-${safeName}`
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('tax-documents')
      .upload(filePath, buffer, { contentType: file.type, upsert: false })

    if (uploadError) {
      console.error('Storage error:', uploadError)
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
    }

    const { data: signedUrlData } = await supabaseAdmin.storage
      .from('tax-documents')
      .createSignedUrl(uploadData.path, 60 * 60 * 24 * 7)

    const fileUrl = signedUrlData?.signedUrl || ''

    const { data: document, error: docError } = await supabaseAdmin
      .from('documents')
      .insert({
        session_id: sessionId,
        conversation_id: conversationId || null,
        file_name: file.name.slice(0, 200),
        file_type: file.type,
        file_url: fileUrl,
        status: 'processing',
      })
      .select()
      .single()

    if (docError || !document) {
      return NextResponse.json({ error: 'Failed to create document record' }, { status: 500 })
    }

    let extractedData: Record<string, unknown> = {}
    let extractionStatus = 'completed'

    try {
      extractedData = file.type === 'application/pdf'
        ? await extractFromPDF(buffer)
        : await extractFromImage(base64, file.type)
      console.log('Extraction completed')
    } catch (err) {
      console.error('Extraction failed:', err)
      extractionStatus = 'error'
    }

    await supabaseAdmin
      .from('documents')
      .update({
        extracted_data: extractedData,
        document_type: (extractedData.document_type as string) || 'unknown',
        status: extractionStatus,
      })
      .eq('id', document.id)

    if (extractionStatus === 'completed' && process.env.ADMIN_EMAIL) {
      const docType = (extractedData.document_type as string) || 'Tax Document'
      const taxYear = (extractedData.tax_year as string) || 'Unknown year'
      const issuer = (extractedData.issuer_name as string) || 'Unknown issuer'
      const recipient = (extractedData.recipient_name as string) || 'Unknown'
      const fields = (extractedData.fields as Record<string, string>) || {}
      const emailFields = maskSensitiveFields(fields)

      await resend.emails.send({
        from: 'TaxNorth <hello@taxnorth.ca>',
        to: process.env.ADMIN_EMAIL,
        subject: `New Document — ${docType} ${taxYear} — ${recipient}`.replace(/[\r\n]+/g, ' '),
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1A2744; padding: 24px; border-radius: 8px 8px 0 0;">
              <h1 style="color: #F4A332; margin: 0; font-size: 18px;">New Tax Document Received</h1>
              <p style="color: white; opacity: 0.7; margin: 8px 0 0; font-size: 14px;">${escapeHtml(docType)} · ${escapeHtml(taxYear)} · ${escapeHtml(recipient)}</p>
            </div>
            <div style="background: #FAF8F5; padding: 24px; border-radius: 0 0 8px 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding:8px 0;color:#666;font-size:14px;width:160px">Document type</td><td style="padding:8px 0;color:#1A2744;font-weight:600;font-size:14px">${escapeHtml(docType)}</td></tr>
                <tr style="border-top:1px solid #EEF1F7"><td style="padding:8px 0;color:#666;font-size:14px">Tax year</td><td style="padding:8px 0;color:#1A2744;font-size:14px">${escapeHtml(taxYear)}</td></tr>
                <tr style="border-top:1px solid #EEF1F7"><td style="padding:8px 0;color:#666;font-size:14px">Issuer</td><td style="padding:8px 0;color:#1A2744;font-size:14px">${escapeHtml(issuer)}</td></tr>
                <tr style="border-top:1px solid #EEF1F7"><td style="padding:8px 0;color:#666;font-size:14px">Recipient</td><td style="padding:8px 0;color:#1A2744;font-size:14px">${escapeHtml(recipient)}</td></tr>
              </table>
              <h3 style="color:#1A2744;font-size:14px;margin:20px 0 12px">Extracted Fields</h3>
              <table style="width:100%;border-collapse:collapse">
                ${Object.entries(emailFields).map(([k, v]) => `
                  <tr style="border-top:1px solid #EEF1F7">
                    <td style="padding:6px 0;color:#666;font-size:13px;width:200px">${escapeHtml(k.replace(/_/g,' ').replace(/box /gi,'Box '))}</td>
                    <td style="padding:6px 0;color:#1A2744;font-size:13px;font-weight:500">${escapeHtml(v)}</td>
                  </tr>`).join('')}
              </table>
              ${fileUrl ? `<div style="margin-top:24px;padding-top:16px;border-top:1px solid #EEF1F7">
                <a href="${escapeHtml(fileUrl)}" style="background:#F4A332;color:#1A2744;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px">View Original Document →</a>
                <p style="color:#999;font-size:11px;margin:8px 0 0">Link expires in 7 days</p>
              </div>` : ''}
              <p style="color:#999;font-size:11px;margin:16px 0 0">Session: ${sessionId} · ID: ${document.id}</p>
            </div>
          </div>`,
      }).catch(err => console.error('Email error:', err))

      await supabaseAdmin
        .from('documents')
        .update({ sent_to_cpa: true, sent_at: new Date().toISOString() })
        .eq('id', document.id)
    }

    return NextResponse.json({
      success: true,
      documentId: document.id,
      documentType: extractedData.document_type || 'unknown',
      taxYear: extractedData.tax_year || null,
      extractedData,
      status: extractionStatus,
    })

  } catch (error) {
    console.error('Document processing error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}