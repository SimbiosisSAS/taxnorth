import { supabaseAdmin } from '@/lib/supabase'
import { openrouter } from '@/lib/openrouter'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_PROMPTS = {
  cold: (prospect: Record<string, string>) => `
Write a concise, professional cold outreach email from Andrés at TaxNorth.ca to a Canadian CPA firm.

PROSPECT INFO:
- Firm: ${prospect.firm_name}
- Contact: ${prospect.contact_name || 'there'}
- Province: ${prospect.province || 'Canada'}
- Website: ${prospect.website || 'N/A'}

ABOUT TAXNORTH:
TaxNorth.ca is an AI-powered educational platform that guides newcomers to Canada through the tax system in 12 languages. When users need a professional, we connect them with a licensed CPA for a $19.99 connection fee. CPAs join our directory for $29/month and receive pre-qualified leads matched by province, language, and specialty.

GOAL: Get a 15-minute call to explain the partnership.

RULES:
- Maximum 150 words in the body
- Professional but warm tone
- One clear call to action at the end
- Do NOT use generic phrases like "I hope this email finds you well"
- Mention the specific province if not empty
- Subject line should be specific and intriguing, not salesy

Return ONLY a JSON object with this exact format:
{"subject": "...", "body": "..."}
`,

  followup: (prospect: Record<string, string>) => `
Write a short follow-up email from Andrés at TaxNorth.ca. This is a second touchpoint — the prospect has not responded to the first email.

PROSPECT INFO:
- Firm: ${prospect.firm_name}
- Contact: ${prospect.contact_name || 'there'}
- Province: ${prospect.province || 'Canada'}

CONTEXT:
TaxNorth connects newcomers to Canada (500K+ per year) with licensed CPAs. The platform matches clients by province, language, and specialty. CPAs pay $29/month and receive pre-qualified leads — no marketing effort required.

GOAL: Re-engage with a different angle. Use the stat that most newcomers don't know they're owed money by the government.

RULES:
- Maximum 80 words in the body
- Very short — respect their time
- Acknowledge they may be busy
- One question at the end to invite reply
- Do NOT repeat what was said in the first email verbatim

Return ONLY a JSON object with this exact format:
{"subject": "...", "body": "..."}
`,

  final: (prospect: Record<string, string>) => `
Write a final "break-up" email from Andrés at TaxNorth.ca. This is the last touchpoint after no response to previous emails.

PROSPECT INFO:
- Firm: ${prospect.firm_name}
- Contact: ${prospect.contact_name || 'there'}
- Province: ${prospect.province || 'Canada'}

GOAL: Leave the door open gracefully. These emails paradoxically get high response rates because they create urgency without pressure.

RULES:
- Maximum 60 words in the body
- Acknowledge the lack of response without blame
- Say you're moving on but the door remains open
- Leave contact info for when the timing is right
- Warm, not passive-aggressive

Return ONLY a JSON object with this exact format:
{"subject": "...", "body": "..."}
`
}

export async function POST(req: NextRequest) {
  try {
    const { prospectId, templateType, send } = await req.json()

    if (!prospectId || !templateType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Obtener datos del prospecto
    const { data: prospect, error } = await supabaseAdmin
      .from('prospects')
      .select('*')
      .eq('id', prospectId)
      .single()

    if (error || !prospect) {
      return NextResponse.json({ error: 'Prospect not found' }, { status: 404 })
    }

    // Generar email con DeepSeek
    const promptFn = EMAIL_PROMPTS[templateType as keyof typeof EMAIL_PROMPTS]
    if (!promptFn) {
      return NextResponse.json({ error: 'Invalid template type' }, { status: 400 })
    }

    const completion = await openrouter.chat.completions.create({
      model: 'deepseek/deepseek-v4-flash',
      messages: [{ role: 'user', content: promptFn(prospect) }],
      temperature: 0.7,
    })

    const content = completion.choices[0]?.message?.content || ''

    let emailData: { subject: string; body: string }
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      emailData = JSON.parse(jsonMatch?.[0] || content)
    } catch {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
    }

    // Si solo es preview, devolver sin enviar
    if (!send) {
      return NextResponse.json({ subject: emailData.subject, body: emailData.body })
    }

    // Enviar el email
    const recipientEmail = prospect.email
    if (!recipientEmail) {
      return NextResponse.json({ error: 'Prospect has no email' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Andrés at TaxNorth <partners@taxnorth.ca>',
      to: recipientEmail,
      subject: emailData.subject,
      text: emailData.body,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A2744;line-height:1.6">
        ${emailData.body.split('\n').map((line: string) => line.trim() ? `<p>${line}</p>` : '').join('')}
        <hr style="border:none;border-top:1px solid #EEF1F7;margin:24px 0"/>
        <p style="font-size:12px;color:#aaa">
          Andrés Castaneda — TaxNorth.ca<br/>
          <a href="https://www.taxnorth.ca/partners" style="color:#F4A332">taxnorth.ca/partners</a>
        </p>
      </div>`
    })

    // Registrar actividad
    await supabaseAdmin.from('prospect_activities').insert({
      prospect_id: prospectId,
      type: 'email',
      description: `${templateType === 'cold' ? 'Cold outreach' : templateType === 'followup' ? 'Follow-up' : 'Final'} email sent: "${emailData.subject}"`,
      activity_date: new Date().toISOString(),
    })

    // Actualizar last_contact y status
    await supabaseAdmin
      .from('prospects')
      .update({
        last_contact_at: new Date().toISOString(),
        status: prospect.status === 'prospect' ? 'contacted' : prospect.status,
      })
      .eq('id', prospectId)

    return NextResponse.json({ success: true, subject: emailData.subject })

  } catch (error) {
    console.error('Email agent error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}