import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function POST(req: NextRequest) {
  try {
    const { to, contactName, firmName } = await req.json()

    if (!to) {
      return NextResponse.json({ error: 'Phone number required' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.taxnorth.ca'

    const call = await client.calls.create({
      to,
      from: process.env.TWILIO_PHONE_NUMBER!,
      url: `${baseUrl}/api/voice/webhook?contactName=${encodeURIComponent(contactName || '')}&firmName=${encodeURIComponent(firmName || '')}`,
      statusCallback: `${baseUrl}/api/voice/status`,
      statusCallbackMethod: 'POST',
    })

    return NextResponse.json({ success: true, callSid: call.sid })
  } catch (error) {
    console.error('Outbound call error:', error)
    return NextResponse.json({ error: 'Failed to initiate call' }, { status: 500 })
  }
}