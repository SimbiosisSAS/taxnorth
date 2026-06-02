import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const payload = body.message || body
    const eventType = payload.type || 'unknown'
    const call = payload.call || null

    console.log('Vapi event:', eventType, 'has call:', !!call)

    if (!call || !call.id) {
      return NextResponse.json({ received: true })
    }

    const transcript = call.transcript || ''
    const summary = call.summary || call.analysis?.summary || ''
    const customerPhone = call.customer?.number || ''
    const customerName = call.customer?.name || ''
    const durationSeconds = call.duration || 0
    const callId = call.id

    // Only process if we have a transcript (end of call)
    if (!transcript) {
      return NextResponse.json({ received: true })
    }

    const interestedKeywords = ['interested', 'sounds good', 'website', 'partners', 'sign up', 'tell me more', 'send me', 'more information']
    const interested = interestedKeywords.some(kw => transcript.toLowerCase().includes(kw))

    // Better email detection - also catch spoken emails
    const emailMatch = transcript.match(/[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}/)
    const emailCaptured = emailMatch ? emailMatch[0] : null

    console.log('Transcript length:', transcript.length, 'Interested:', interested, 'Email:', emailCaptured)

    // Upsert to avoid duplicates
    const { error: dbError } = await supabaseAdmin
      .from('sales_calls')
      .upsert({
        vapi_call_id: callId,
        customer_name: customerName,
        customer_phone: customerPhone,
        duration_seconds: durationSeconds,
        transcript,
        summary,
        interested,
        email_captured: emailCaptured,
        status: 'completed'
      }, { onConflict: 'vapi_call_id' })

    if (dbError) console.error('Supabase error:', dbError)
    else console.log('Saved/updated in Supabase')

    // Send email for all calls with transcript
    await resend.emails.send({
      from: 'TaxNorth <hello@taxnorth.ca>',
      to: process.env.ADMIN_EMAIL!,
      subject: `${interested ? '🔥 Interested!' : '📞 Call done'} — ${customerName || customerPhone}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1A2744; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #F4A332; margin: 0; font-size: 20px;">
              ${interested ? '🔥 Accountant interested!' : '📞 Outbound call completed'}
            </h1>
          </div>
          <div style="background-color: #FAF8F5; padding: 24px; border-radius: 0 0 8px 8px;">
            <p><strong>Name:</strong> ${customerName || 'Unknown'}</p>
            <p><strong>Phone:</strong> <a href="tel:${customerPhone}" style="color:#F4A332;">${customerPhone}</a></p>
            <p><strong>Duration:</strong> ${Math.round(durationSeconds / 60)} min</p>
            <p><strong>Interested:</strong> ${interested ? '✅ Yes' : '❌ Not yet'}</p>
            ${emailCaptured ? `<p><strong>Email captured:</strong> <a href="mailto:${emailCaptured}" style="color:#F4A332;">${emailCaptured}</a></p>` : ''}
            ${summary ? `<p><strong>Summary:</strong> ${summary}</p>` : ''}
            ${transcript ? `
            <hr/>
            <p><strong>Transcript:</strong></p>
            <pre style="background:#EEF1F7; padding:12px; border-radius:8px; font-size:12px; white-space:pre-wrap;">${transcript}</pre>` : ''}
          </div>
        </div>
      `
    })

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Vapi webhook error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}