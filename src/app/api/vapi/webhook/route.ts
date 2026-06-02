import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('Vapi raw body:', JSON.stringify(body).substring(0, 500))

    // Vapi wraps events in a "message" object
    const payload = body.message || body
    const eventType = payload.type || 'unknown'
    const call = payload.call || null

    console.log('Event type:', eventType)
    console.log('Has call:', !!call)

    if (!call) {
      return NextResponse.json({ received: true })
    }

    const transcript = call.transcript || ''
    const summary = call.summary || call.analysis?.summary || ''
    const customerPhone = call.customer?.number || ''
    const customerName = call.customer?.name || ''
    const durationSeconds = call.duration || 0
    const callId = call.id || ''

    const interestedKeywords = ['interested', 'yes', 'sounds good', 'website', 'partners', 'email', 'sign up', 'tell me more']
    const interested = interestedKeywords.some(kw => transcript.toLowerCase().includes(kw))

    const emailMatch = transcript.match(/[\w.-]+@[\w.-]+\.\w+/)
    const emailCaptured = emailMatch ? emailMatch[0] : null

    const { error: dbError } = await supabaseAdmin.from('sales_calls').insert({
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

    if (dbError) console.error('Supabase error:', dbError)
    else console.log('Saved to Supabase — interested:', interested, 'email:', emailCaptured)

    if (true) {
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
                  <td style="padding: 8px 0; color: #1A2744; font-size: 14px;">${Math.round(durationSeconds / 60)} min</td>
                </tr>
                ${emailCaptured ? `
                <tr style="border-top: 1px solid #EEF1F7;">
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Email</td>
                  <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${emailCaptured}" style="color: #F4A332; font-weight: 600;">${emailCaptured}</a></td>
                </tr>` : ''}
                <tr style="border-top: 1px solid #EEF1F7;">
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Interested</td>
                  <td style="padding: 8px 0;">
                    <span style="background: ${interested ? '#2E7D5E20' : '#EEF1F7'}; color: ${interested ? '#2E7D5E' : '#999'}; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: 600;">
                      ${interested ? 'Yes' : 'Not yet'}
                    </span>
                  </td>
                </tr>
                ${summary ? `
                <tr style="border-top: 2px solid #1A2744;">
                  <td colspan="2" style="padding: 16px 0 8px;">
                    <p style="color: #1A2744; font-size: 14px; font-weight: 700; margin: 0 0 8px;">Summary</p>
                    <div style="background: #EEF1F7; padding: 12px; border-radius: 8px; font-size: 13px; color: #444; line-height: 1.6;">${summary}</div>
                  </td>
                </tr>` : ''}
                ${transcript ? `
                <tr style="border-top: 1px solid #EEF1F7;">
                  <td colspan="2" style="padding: 16px 0 8px;">
                    <p style="color: #1A2744; font-size: 14px; font-weight: 700; margin: 0 0 8px;">Transcript</p>
                    <div style="background: white; border: 1px solid #EEF1F7; padding: 12px; border-radius: 8px; font-size: 12px; color: #666; line-height: 1.6; white-space: pre-wrap;">${transcript}</div>
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