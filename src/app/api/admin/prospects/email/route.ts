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

ABOUT TAXNORTH FOR CPAs:
TaxNorth.ca is an AI-powered educational platform that guides newcomers to Canada through the tax system in 12 languages. When users need a professional CPA, TaxNorth matches them by province, language, and specialty and connects them for a $19.99 fee paid by the client.

CPAs join the TaxNorth directory for $29/month (founding rate, locked forever). Benefits:
- Pre-qualified leads matched to your province and languages
- Full client details: name, email, phone, and tax situation
- Access to Partner Portal dashboard to manage clients
- No marketing effort required — clients come to you

GOAL: Get the CPA to click the link and sign up directly. No call needed.

CTA: Direct them to sign up at https://www.taxnorth.ca/partners

RULES:
- Maximum 150 words in the body
- Lead with the benefit for them (more clients, no marketing)
- Mention the $29/month founding rate and that it locks in forever
- End with a clear, single CTA: sign up at taxnorth.ca/partners
- Do NOT ask for a call or meeting
- Do NOT use "I hope this email finds you well"
- Subject line should be benefit-focused, not salesy

Return ONLY a JSON object with this exact format:
{"subject": "...", "body": "..."}
`,

  followup: (prospect: Record<string, string>) => `
Write a short follow-up email from Andrés at TaxNorth.ca. The prospect has not responded to the first email.

PROSPECT INFO:
- Firm: ${prospect.firm_name}
- Contact: ${prospect.contact_name || 'there'}
- Province: ${prospect.province || 'Canada'}

CONTEXT:
TaxNorth connects newcomers to Canada (500K+ per year) with licensed CPAs. CPAs pay $29/month (founding rate, locked forever) and receive pre-qualified leads matched by province, language, and specialty — no marketing needed. Sign up at taxnorth.ca/partners.

GOAL: Re-engage with a different angle. Use the stat that 500,000+ newcomers arrive in Canada every year and most don't know they need a CPA. This is an untapped client base.

RULES:
- Maximum 80 words
- Different angle from the first email — focus on the size of the newcomer market
- Acknowledge they may be busy
- End with the same CTA: taxnorth.ca/partners
- Do NOT ask for a call
- One soft question to invite a reply if they're not ready to sign up

Return ONLY a JSON object with this exact format:
{"subject": "...", "body": "..."}
`,

  final: (prospect: Record<string, string>) => `
Write a final "last chance" email from Andrés at TaxNorth.ca. This is the last email before moving on.

PROSPECT INFO:
- Firm: ${prospect.firm_name}
- Contact: ${prospect.contact_name || 'there'}
- Province: ${prospect.province || 'Canada'}

CONTEXT:
TaxNorth is filling its CPA directory by province. Once a province has enough CPAs, new spots are limited. CPAs pay $29/month founding rate, locked forever. taxnorth.ca/partners

GOAL: Create gentle urgency around limited spots in their province and leave the door open.

RULES:
- Maximum 60 words
- Mention that spots in their province are filling up
- Leave the link: taxnorth.ca/partners
- Warm, not aggressive
- Do NOT ask for a call

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

    const { data: prospect, error } = await supabaseAdmin
      .from('prospects')
      .select('*')
      .eq('id', prospectId)
      .single()

    if (error || !prospect) {
      return NextResponse.json({ error: 'Prospect not found' }, { status: 404 })
    }

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

    if (!send) {
      return NextResponse.json({ subject: emailData.subject, body: emailData.body })
    }

    const recipientEmail = prospect.email
    if (!recipientEmail) {
      return NextResponse.json({ error: 'Prospect has no email' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Andrés at TaxNorth <partners@taxnorth.ca>',
      to: recipientEmail,
      subject: emailData.subject,
      text: emailData.body,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A2744;line-height:1.6">
          ${emailData.body.split('\n').map((line: string) =>
            line.trim() ? `<p style="margin:0 0 12px">${line}</p>` : ''
          ).join('')}
          <hr style="border:none;border-top:1px solid #EEF1F7;margin:24px 0"/>
          <p style="font-size:12px;color:#aaa;margin:0">
            Andrés Castaneda — TaxNorth.ca<br/>
            <a href="https://www.taxnorth.ca/partners" style="color:#F4A332">
              taxnorth.ca/partners
            </a>
          </p>
        </div>
      `
    })

    await supabaseAdmin.from('prospect_activities').insert({
      prospect_id: prospectId,
      type: 'email',
      description: `${
        templateType === 'cold' ? 'Cold outreach' :
        templateType === 'followup' ? 'Follow-up' : 'Final'
      } email sent: "${emailData.subject}"`,
      activity_date: new Date().toISOString(),
    })

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