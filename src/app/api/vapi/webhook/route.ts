import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, call } = body

    if (type !== 'end-of-call-report' || !call) {
      return NextResponse.json({ received: true })
    }

    const transcript = call.transcript || ''
    const summary = call.summary || ''
    const customerPhone = call.customer?.number || ''
    const customerName = call.customer?.name || ''
    const durationSeconds = call.duration || 0
    const callId = call.id || ''

    // Detect if interested based on transcript keywords
    const interestedKeywords = ['interested', 'yes', 'tell me more', 'sounds good', 'website', 'partners', 'email', 'sign up']
    const interested = interestedKeywords.some(kw => transcript.toLowerCase().includes(kw))

    // Extract email from transcript
    const emailMatch = transcript.match(/[\w.-]+@[\w.-]+\.\w+/)
    const emailCaptured = emailMatch ? emailMatch[0] : null

    // Save to Supabase
    await supabaseAdmin.from('sales_calls').insert({
      vapi_call_id: callId,
      customer_name: customerName,
      customer_phone: customerPhone,
      duration_seconds: durationSeconds,
      transcript,
      summary,
      interested,
      email_captured: emailCaptured,
      status: 'completed'
    })

    // Send email notification if interested or email captured
    if (interested || emailCaptured) {
      await resend.emails.send({
        from: 'TaxNorth <hello@taxnorth.ca>',
        to: process.env.ADMIN_EMAIL!,
        subject: `${interested ? '🔥 Interested accountant' : '📞 Call completed'} — ${customerName || customerPhone}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #1A2744; padding: 24px; border-radius: 8px 8px 0 0;">
              <h1 style="color: #F4A332; margin: 0; font-size: 20px;">
                ${interested ? '🔥 Accountant showed interest!' : '📞 Outbound call completed'}
              </h1>
            </div>
            <div style="background-color: #FAF8F5; padding: 24px; border-radius: 0 0 8px 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px; width: 160px;">Name</td>
                  <td style="padding: 8px 0; color: #1A2744; font-size: 14px; font-weight: 600;">${customerName || 'Unknown'}</td>
                </tr>
                <tr style="border-top: 1px solid #EEF1F7;">
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone</td>
                  <td style="padding: 8px 0; font-size: 14px;"><a href="tel:${customerPhone}" style="color: #F4A332;">${customerPhone}</a></td>
                </tr>
                <tr style="border-top: 1px solid #EEF1F7;">
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Duration</td>
                  <td style="padding: 8px 0; color: #1A2744; font-size: 14px;">${Math.round(durationSeconds / 60)} minutes</td>
                </tr>
                ${emailCaptured ? `
                <tr style="border-top: 1px solid #EEF1F7;">
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Email captured</td>
                  <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${emailCaptured}" style="color: #F4A332; font-weight: 600;">${emailCaptured}</a></td>
                </tr>` : ''}
                <tr style="border-top: 1px solid #EEF1F7;">
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Interested</td>
                  <td style="padding: 8px 0; font-size: 14px;">
                    <span style="background: ${interested ? '#2E7D5E20' : '#EEF1F7'}; color: ${interested ? '#2E7D5E' : '#999'}; padding: 2px 8px; border-radius: 4px; font-weight: 600;">
                      ${interested ? 'Yes' : 'Not yet'}
                    </span>
                  </td>
                </tr>
                ${summary ? `
                <tr style="border-top: 2px solid #1A2744;">
                  <td colspan="2" style="padding: 16px 0 8px;">
                    <p style="color: #1A2744; font-size: 14px; font-weight: 700; margin: 0 0 8px;">Call Summary</p>
                    <div style="background: #EEF1F7; padding: 12px; border-radius: 8px; font-size: 13px; color: #444; line-height: 1.6;">${summary}</div>
                  </td>
                </tr>` : ''}
                ${transcript ? `
                <tr style="border-top: 1px solid #EEF1F7;">
                  <td colspan="2" style="padding: 16px 0 8px;">
                    <p style="color: #1A2744; font-size: 14px; font-weight: 700; margin: 0 0 8px;">Transcript</p>
                    <div style="background: white; border: 1px solid #EEF1F7; padding: 12px; border-radius: 8px; font-size: 12px; color: #666; line-height: 1.6; max-height: 300px; overflow-y: auto; white-space: pre-wrap;">${transcript}</div>
                  </td>
                </tr>` : ''}
              </table>
            </div>
          </div>
        `
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Vapi webhook error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}