import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, clientIp } from '@/lib/rateLimit'

const IMAGE_MODEL = 'openai/gpt-4o-mini'
const TEXT_MODEL = 'openai/gpt-4o-mini'

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

// Reads the first JSON object in a model reply (tolerates ``` fences and text around it).
function parseJsonObject(text: string): Record<string, unknown> {
  const cleaned = text.replace(/```(?:json)?/gi, '')
  const start = cleaned.indexOf('{')
  if (start === -1) throw new Error('no JSON object')
  let depth = 0
  let inString = false
  let escaped = false
  for (let i = start; i < cleaned.length; i++) {
    const ch = cleaned[i]
    if (inString) {
      if (escaped) escaped = false
      else if (ch === '\\') escaped = true
      else if (ch === '"') inString = false
      continue
    }
    if (ch === '"') inString = true
    else if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) {
        const parsed = JSON.parse(cleaned.slice(start, i + 1))
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed as Record<string, unknown>
        throw new Error('JSON is not an object')
      }
    }
  }
  throw new Error('unterminated JSON object')
}

// An extraction only counts if it names a document type and has at least one real value.
function hasUsableFields(data: Record<string, unknown>): boolean {
  const type = data.document_type
  const fields = data.fields
  if (typeof type !== 'string' || !type.trim() || type.toLowerCase() === 'unreadable') return false
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) return false
  return Object.values(fields as Record<string, unknown>).some(v => v !== null && v !== undefined && String(v).trim() !== '')
}

// Reads the model response. The error text keeps the HTTP status and the provider message,
// so the real cause shows up in the logs and in documents.extracted_data when something fails.
async function readExtraction(response: Response, label: string): Promise<Record<string, unknown>> {
  if (!response.ok) {
    const detail = (await response.text().catch(() => '')).slice(0, 300)
    throw new Error(`${label} API error ${response.status}: ${detail}`)
  }
  const result = await response.json()
  const choice = result.choices?.[0]
  const content: string = choice?.message?.content || ''
  try {
    return parseJsonObject(content)
  } catch {
    throw new Error(`${label}: no valid JSON in reply (finish_reason=${choice?.finish_reason ?? 'unknown'}, length=${content.length})`)
  }
}

const EXTRACTION_PROMPT = `You are a Canadian tax document analyzer. Extract all information from this document.

Identify the document type: T4, T4A, T4E, T5, T3, T2202, T5018, Notice of Assessment, RRSP Receipt, or other.

Extract ONLY the fields that are clearly legible in the document. Copy every value exactly as printed.
NEVER guess, estimate or fill in a typical value. If a value is missing, unreadable or you are not sure, leave that field out.
If the file is not a tax document, or is too blurry or incomplete to read, return {"document_type":"unreadable","fields":{},"confidence":"low","notes":"reason"}.

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
      max_tokens: 4000,
      temperature: 0,
    }),
  })
  return readExtraction(response, 'image')
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
      max_tokens: 4000,
      temperature: 0,
    }),
  })
  return readExtraction(response, 'PDF')
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
      if (!hasUsableFields(extractedData)) {
        throw new Error('extraction returned no usable fields')
      }
      console.log('Extraction completed')
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err)
      console.error('Extraction failed:', reason)
      extractionStatus = 'error'
      extractedData = { error: reason.slice(0, 500) }
    }

    await supabaseAdmin
      .from('documents')
      .update({
        extracted_data: extractedData,
        document_type: (extractedData.document_type as string) || 'unknown',
        status: extractionStatus,
      })
      .eq('id', document.id)

    if (extractionStatus !== 'completed') {
      return NextResponse.json({ error: 'extraction_failed', documentId: document.id }, { status: 422 })
    }

    // Save the extracted values (SIN masked) in the conversation, so the agent answers from the real
    // numbers on the next messages instead of guessing.
    try {
      const savedFields = maskSensitiveFields((extractedData.fields as Record<string, unknown>) || {})
      const summaryLines = Object.entries(savedFields)
        .slice(0, 40)
        .map(([k, v]) => `- ${k.replace(/_/g, ' ')}: ${String(v ?? '').slice(0, 200)}`)
        .join('\n')
      let targetConversationId = conversationId
      if (!targetConversationId) {
        const { data: created } = await supabaseAdmin
          .from('conversations')
          .insert({ session_id: sessionId })
          .select('id')
          .maybeSingle()
        targetConversationId = created?.id ?? null
      }
      if (targetConversationId) {
        await supabaseAdmin.from('messages').insert({
          conversation_id: targetConversationId,
          role: 'assistant',
          content: `[Document received] ${String(extractedData.document_type || 'Tax document')}${extractedData.tax_year ? ` (${String(extractedData.tax_year)})` : ''}. Values read from the user's uploaded file:\n${summaryLines}`,
        })
      }
    } catch (saveError) {
      console.error('Could not save document summary to the conversation')
    }

    return NextResponse.json({
      success: true,
      documentId: document.id,
      documentType: extractedData.document_type || 'unknown',
      taxYear: extractedData.tax_year || null,
      extractedData,
      status: extractionStatus,
      confidence: extractedData.confidence || null,
    })

  } catch (error) {
    console.error('Document processing error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}