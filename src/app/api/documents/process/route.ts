import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const VISION_MODEL = 'google/gemini-2.0-flash-001'

const EXTRACTION_PROMPT = `You are a Canadian tax document analyzer. Extract all information from this document.

First identify the document type: T4, T4A, T4E, T5, T3, T2202, RRSP Receipt, Notice of Assessment, T1135, T2200, T5018, or other.

Extract ALL fields visible in the document. Return ONLY a valid JSON object, no other text:
{
  "document_type": "T4",
  "tax_year": "2025",
  "issuer_name": "Employer or institution name",
  "recipient_name": "Employee or taxpayer name",
  "fields": {
    "box_14_employment_income": "52431.00",
    "box_22_income_tax_deducted": "8124.50",
    "box_16_cpp_contributions": "1234.00",
    "box_18_ei_premiums": "987.00"
  },
  "confidence": "high",
  "notes": "Any relevant observations"
}`

async function extractDocument(
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
      model: VISION_MODEL,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${base64Content}`,
              },
            },
            {
              type: 'text',
              text: EXTRACTION_PROMPT,
            },
          ],
        },
      ],
      max_tokens: 2000,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Gemini API error:', response.status, errorText)
    throw new Error(`Gemini API error: ${response.status}`)
  }

  const result = await response.json()
  const content = result.choices[0]?.message?.content || ''

  console.log('Gemini response:', content.substring(0, 500))

  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON found in response')

  return JSON.parse(jsonMatch[0])
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const sessionId = formData.get('sessionId') as string
    const conversationId = formData.get('conversationId') as string | null

    if (!file || !sessionId) {
      return NextResponse.json(
        { error: 'File and sessionId are required' },
        { status: 400 }
      )
    }

    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/webp',
      'image/heic', 'application/pdf'
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not supported. Please upload a JPG, PNG, WebP, or PDF.' },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString('base64')

    console.log('Processing file:', file.name, file.type, buffer.length, 'bytes')

    // 1. Upload to Supabase Storage
    const filePath = `${sessionId}/${Date.now()}-${file.name}`
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('tax-documents')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      )
    }

    const { data: signedUrlData } = await supabaseAdmin.storage
      .from('tax-documents')
      .createSignedUrl(uploadData.path, 60 * 60 * 24 * 7)

    const fileUrl = signedUrlData?.signedUrl || ''

    // 2. Create document record
    const { data: document, error: docError } = await supabaseAdmin
      .from('documents')
      .insert({
        session_id: sessionId,
        conversation_id: conversationId || null,
        file_name: file.name,
        file_type: file.type,
        file_url: fileUrl,
        status: 'processing',
      })
      .select()
      .single()

    if (docError || !document) {
      console.error('Document insert error:', docError)
      return NextResponse.json(
        { error: 'Failed to create document record' },
        { status: 500 }
      )
    }

    // 3. Extract with Gemini Vision (handles both images and PDFs)
    let extractedData: Record<string, unknown> = {}
    let extractionStatus = 'completed'

    try {
      extractedData = await extractDocument(base64, file.type)
      console.log('Extraction success:', JSON.stringify(extractedData).substring(0, 200))
    } catch (extractionError) {
      console.error('Extraction failed:', extractionError)
      extractionStatus = 'error'
    }

    // 4. Update document
    await supabaseAdmin
      .from('documents')
      .update({
        extracted_data: extractedData,
        document_type: (extractedData.document_type as string) || 'unknown',
        status: extractionStatus,
      })
      .eq('id', document.id)

    // 5. Send package to CPA
    if (extractionStatus === 'completed' && process.env.ADMIN_EMAIL) {
      const docType = (extractedData.document_type as string) || 'Tax Document'
      const taxYear = (extractedData.tax_year as string) || 'Unknown year'
      const issuer = (extractedData.issuer_name as string) || 'Unknown issuer'
      const recipient = (extractedData.recipient_name as string) || 'Unknown'
      const fields = (extractedData.fields as Record<string, string>) || {}

      await resend.emails.send({
        from: 'TaxNorth <hello@taxnorth.ca>',
        to: process.env.ADMIN_EMAIL,
        subject: `New Document — ${docType} ${taxYear} — ${recipient}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1A2744; padding: 24px; border-radius: 8px 8px 0 0;">
              <h1 style="color: #F4A332; margin: 0; font-size: 18px;">New Tax Document Received</h1>
              <p style="color: white; opacity: 0.7; margin: 8px 0 0; font-size: 14px;">
                ${docType} · ${taxYear} · ${recipient}
              </p>
            </div>
            <div style="background: #FAF8F5; padding: 24px; border-radius: 0 0 8px 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px; width: 160px;">Document type</td>
                  <td style="padding: 8px 0; color: #1A2744; font-weight: 600; font-size: 14px;">${docType}</td>
                </tr>
                <tr style="border-top: 1px solid #EEF1F7;">
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Tax year</td>
                  <td style="padding: 8px 0; color: #1A2744; font-size: 14px;">${taxYear}</td>
                </tr>
                <tr style="border-top: 1px solid #EEF1F7;">
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Issuer</td>
                  <td style="padding: 8px 0; color: #1A2744; font-size: 14px;">${issuer}</td>
                </tr>
                <tr style="border-top: 1px solid #EEF1F7;">
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Recipient</td>
                  <td style="padding: 8px 0; color: #1A2744; font-size: 14px;">${recipient}</td>
                </tr>
              </table>
              <h3 style="color: #1A2744; font-size: 14px; margin: 20px 0 12px;">Extracted Fields</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${Object.entries(fields).map(([key, value]) => `
                  <tr style="border-top: 1px solid #EEF1F7;">
                    <td style="padding: 6px 0; color: #666; font-size: 13px; width: 200px;">
                      ${key.replace(/_/g, ' ').replace(/box /gi, 'Box ')}
                    </td>
                    <td style="padding: 6px 0; color: #1A2744; font-size: 13px; font-weight: 500;">
                      ${value}
                    </td>
                  </tr>
                `).join('')}
              </table>
              ${fileUrl ? `
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #EEF1F7;">
                <a href="${fileUrl}" style="background: #F4A332; color: #1A2744; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                  View Original Document →
                </a>
                <p style="color: #999; font-size: 11px; margin: 8px 0 0;">Link expires in 7 days</p>
              </div>
              ` : ''}
              <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #EEF1F7;">
                <p style="color: #999; font-size: 11px; margin: 0;">
                  Session: ${sessionId} · Document ID: ${document.id}
                </p>
              </div>
            </div>
          </div>
        `,
      }).catch(err => console.error('Email send error:', err))

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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}