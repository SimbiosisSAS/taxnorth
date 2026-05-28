import { supabaseAdmin } from '@/lib/supabase'
import { openrouter } from '@/lib/openrouter'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      fullName, email, phone, province, language,
      situation, notes, sessionId,
      professionalSlug, professionalName
    } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Obtener conversation_id
    let conversationId = null
    if (sessionId) {
      const { data: conversation } = await supabaseAdmin
        .from('conversations')
        .select('id')
        .eq('session_id', sessionId)
        .single()
      conversationId = conversation?.id || null
    }

    // Guardar el lead
    const { data: lead, error } = await supabaseAdmin
      .from('leads')
      .insert({
        full_name: fullName,
        email,
        phone,
        province,
        language,
        situation,
        notes,
        professional_name: professionalName || null,
        conversation_id: conversationId,
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      console.error('Lead error:', error)
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }

    // Generar resumen de la conversación del chat
    let conversationSummary = ''
    if (conversationId) {
      const { data: messages } = await supabaseAdmin
        .from('messages')
        .select('role, content')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
        .limit(20)

      if (messages && messages.length > 0) {
        const conversationText = messages
          .map(m => `${m.role === 'user' ? 'Client' : 'TaxNorth'}: ${m.content}`)
          .join('\n')

        const summaryResponse = await openrouter.chat.completions.create({
          model: 'deepseek/deepseek-v4-flash',
          messages: [
            {
              role: 'system',
              content: 'You are summarizing a tax consultation for a tax professional. Extract the key points in 3-5 bullet points: what the client asked about, their specific situation, and what they need help with. Be concise and professional.'
            },
            {
              role: 'user',
              content: `Summarize this conversation:\n\n${conversationText}`
            }
          ],
          max_tokens: 300
        })
        conversationSummary = summaryResponse.choices[0]?.message?.content || ''
      }
    }

    const isPreSelected = !!professionalName

    await resend.emails.send({
      from: 'TaxNorth <hello@taxnorth.ca>',
      to: process.env.ADMIN_EMAIL!,
      subject: `${isPreSelected ? `Client for ${professionalName}` : 'New lead'} — ${province || 'Canada'} — ${new Date().toLocaleDateString('en-CA')}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1A2744; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #F4A332; margin: 0; font-size: 20px;">
              ${isPreSelected ? `New client for ${professionalName}` : 'New Professional Connection Request'}
            </h1>
            <p style="color: white; margin: 8px 0 0; opacity: 0.7; font-size: 14px;">
              ${isPreSelected ? `Client selected ${professionalName} from the TaxNorth directory` : 'Client requested TaxNorth to match them with a professional'}
            </p>
          </div>
          <div style="background-color: #FAF8F5; padding: 24px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 14px; width: 160px;">Name</td>
                <td style="padding: 8px 0; color: #1A2744; font-size: 14px; font-weight: 600;">${fullName || 'Not provided'}</td>
              </tr>
              <tr style="border-top: 1px solid #EEF1F7;">
                <td style="padding: 8px 0; color: #666; font-size: 14px;">Email</td>
                <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #F4A332;">${email}</a></td>
              </tr>
              <tr style="border-top: 1px solid #EEF1F7;">
                <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone</td>
                <td style="padding: 8px 0; font-size: 14px;"><a href="tel:${phone}" style="color: #F4A332;">${phone || 'Not provided'}</a></td>
              </tr>
              <tr style="border-top: 1px solid #EEF1F7;">
                <td style="padding: 8px 0; color: #666; font-size: 14px;">Province</td>
                <td style="padding: 8px 0; color: #1A2744; font-size: 14px;">${province || 'Not provided'}</td>
              </tr>
              <tr style="border-top: 1px solid #EEF1F7;">
                <td style="padding: 8px 0; color: #666; font-size: 14px;">Language</td>
                <td style="padding: 8px 0; color: #1A2744; font-size: 14px;">${language || 'Not provided'}</td>
              </tr>
              ${isPreSelected ? `
              <tr style="border-top: 1px solid #EEF1F7;">
                <td style="padding: 8px 0; color: #666; font-size: 14px;">Professional</td>
                <td style="padding: 8px 0; font-size: 14px;">
                  <span style="background:#F4A332; color:#1A2744; padding: 2px 10px; border-radius: 4px; font-weight: 600;">${professionalName}</span>
                </td>
              </tr>` : ''}
              <tr style="border-top: 1px solid #EEF1F7;">
                <td style="padding: 8px 0; color: #666; font-size: 14px; vertical-align: top;">Situation</td>
                <td style="padding: 8px 0; color: #1A2744; font-size: 14px;">
                  ${situation && situation.length > 0
                    ? situation.map((s: string) => `<span style="background:#EEF1F7; padding: 2px 8px; border-radius: 4px; margin: 2px; display: inline-block;">${s}</span>`).join(' ')
                    : 'Not specified'}
                </td>
              </tr>
              ${notes ? `
              <tr style="border-top: 1px solid #EEF1F7;">
                <td style="padding: 8px 0; color: #666; font-size: 14px; vertical-align: top;">Notes</td>
                <td style="padding: 8px 0; color: #1A2744; font-size: 14px;">${notes}</td>
              </tr>` : ''}
              ${conversationSummary ? `
              <tr style="border-top: 2px solid #1A2744;">
                <td colspan="2" style="padding: 16px 0 8px;">
                  <p style="color: #1A2744; font-size: 14px; font-weight: 700; margin: 0 0 8px;">AI Summary of Chat Conversation</p>
                  <div style="background: #1A2744; color: white; padding: 12px 16px; border-radius: 8px; font-size: 13px; line-height: 1.6; white-space: pre-line;">${conversationSummary}</div>
                </td>
              </tr>` : ''}
            </table>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #EEF1F7;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                Lead ID: ${lead.id}<br>
                Received: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })} EST<br>
                Payment: Pending
              </p>
            </div>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true, leadId: lead.id })

  } catch (error) {
    console.error('Leads API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}