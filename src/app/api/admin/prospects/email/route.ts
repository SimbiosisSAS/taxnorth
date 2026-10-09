import { supabaseAdmin } from '@/lib/supabase'
import { isAdminRequest } from '@/lib/adminAuth'
import { openrouter } from '@/lib/openrouter'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_PROMPTS = {
  cold: (prospect: Record<string, string>) => `
Write a concise cold outreach email from Andrés at TaxNorth.ca to a Canadian CPA firm.

PROSPECT INFO:
- Firm: ${prospect.firm_name}
- Contact: ${prospect.contact_name || 'there'}
- Province: ${prospect.province || 'Canada'}

ABOUT TAXNORTH:
TaxNorth.ca guides newcomers to Canada through the tax system for free, 
in 12 languages. Over 500,000 newcomers arrive in Canada every year. 
When they are ready to hire a professional, they pay $19.99 CAD to connect 
with a CPA in our directory — they arrive committed, with their full tax 
situation already explained.

DIRECTORY PRICING:
- $149/year flat — no per-lead fees, no commissions
- Monthly plans available for those who prefer flexibility
- Money-back guarantee: if we don't send at least one new client 
  in 12 months, full refund, no questions asked

RULES:
- Maximum 120 words in the body
- Open with the contact name only — no "Hi" or "Dear"
- Lead with the market opportunity for the CPA, not with TaxNorth
- Mention that clients pay $19.99 to connect — they are not cold leads
- Include the money-back guarantee
- End with a soft CTA — a question inviting a reply, not a signup link
- Tone: direct, peer-to-peer, not salesy
- Do NOT use "I hope this email finds you well"
- Do NOT use "No effort required" or "perfect fit"
- Do NOT use "locked forever"

Subject line rules:
- Reference leads or clients and the province
- Maximum 8 words
- No emojis

Return ONLY a JSON object:
{"subject": "...", "body": "..."}
`,

  followup: (prospect: Record<string, string>) => `
Write a short follow-up email from Andrés at TaxNorth.ca. 
The CPA has not responded to the first email.

PROSPECT INFO:
- Firm: ${prospect.firm_name}
- Contact: ${prospect.contact_name || 'there'}
- Province: ${prospect.province || 'Canada'}

CONTEXT:
TaxNorth connects newcomers (500K+ per year) with licensed CPAs. 
Clients pay $19.99 to connect — they arrive pre-qualified.
Directory: $149/year, money-back guarantee if no clients in 12 months.

GOAL: Re-engage with a different angle. Focus on the fact that most 
newcomers don't know they need a CPA — this is an untapped client base 
that actively searches by language and province.

RULES:
- Maximum 80 words
- Different angle from cold email — focus on untapped market size
- Acknowledge they may be busy — one sentence maximum
- End with one soft question inviting a reply
- Do NOT include a signup link in this email
- Do NOT ask for a call

Return ONLY a JSON object:
{"subject": "...", "body": "..."}
`,

  final: (prospect: Record<string, string>) => `
Write a final "last touch" email from Andrés at TaxNorth.ca. 
This is the last outreach before moving on.

PROSPECT INFO:
- Firm: ${prospect.firm_name}
- Contact: ${prospect.contact_name || 'there'}
- Province: ${prospect.province || 'Canada'}

CONTEXT:
TaxNorth is filling its CPA directory province by province. 
$149/year, money-back guarantee. taxnorth.ca/partners

GOAL: Create gentle urgency around limited spots in their province 
and leave the door completely open for the future.

RULES:
- Maximum 60 words
- Mention that the directory in their province is nearly full
- No pressure — warm and respectful tone
- Include the link: taxnorth.ca/partners
- Leave the door open — "no worries if the timing isn't right"
- Do NOT ask for a call

Return ONLY a JSON object:
{"subject": "...", "body": "..."}
`
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { prospectId, templateType, send, subject: providedSubject, body: providedBody } = await req.json()

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

    let emailData: { subject: string; body: string }

    // Si el cliente envía contenido editado y es un envío real, úsalo directamente
    if (send && providedSubject && providedBody) {
      emailData = { subject: providedSubject, body: providedBody }
    } else {
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

      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/)
        emailData = JSON.parse(jsonMatch?.[0] || content)
      } catch {
        return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
      }
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
    })

    // Log activity automáticamente
    await supabaseAdmin.from('prospect_activities').insert({
      prospect_id: prospectId,
      type: 'email',
      description: `${templateType === 'cold' ? 'Cold email' : templateType === 'followup' ? 'Follow-up email' : 'Final email'} sent: "${emailData.subject}"`,
      activity_date: new Date().toISOString(),
    })

    // Actualizar last_contact y status si estaba en prospect
    await supabaseAdmin
      .from('prospects')
      .update({
        last_contact_at: new Date().toISOString(),
        status: prospect.status === 'prospect' ? 'contacted' : prospect.status,
      })
      .eq('id', prospectId)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}