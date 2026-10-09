import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'
import { isAdminRequest } from '@/lib/adminAuth'
import { safeEqual } from '@/lib/session'
import { rateLimit } from '@/lib/rateLimit'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

// Canada / US numbers only: +1 and a 10-digit number (area code cannot start with 0 or 1)
const NA_NUMBER_REGEX = /^\+1[2-9]\d{9}$/

// Allowed callers: a logged-in admin, or a request with
//   Authorization: Bearer <VOICE_OUTBOUND_SECRET>
async function isAuthorized(req: NextRequest): Promise<boolean> {
  if (await isAdminRequest(req)) return true
  const secret = process.env.VOICE_OUTBOUND_SECRET
  const auth = req.headers.get('authorization') || ''
  return !!secret && safeEqual(auth, `Bearer ${secret}`)
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Max 10 outbound calls per hour (per server instance)
  if (!rateLimit('voice-outbound', 10, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Call limit reached. Try again later.' }, { status: 429 })
  }

  try {
    const { to, contactName, firmName } = await req.json()

    if (typeof to !== 'string' || !NA_NUMBER_REGEX.test(to)) {
      return NextResponse.json({ error: 'Phone number must be in +1XXXXXXXXXX format' }, { status: 400 })
    }

    const safeContact = String(contactName || '').slice(0, 80)
    const safeFirm = String(firmName || '').slice(0, 80)

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.taxnorth.ca'

    const call = await client.calls.create({
      to,
      from: process.env.TWILIO_PHONE_NUMBER!,
      url: `${baseUrl}/api/voice/webhook?type=outbound&contactName=${encodeURIComponent(safeContact)}&firmName=${encodeURIComponent(safeFirm)}`,
      statusCallback: `${baseUrl}/api/voice/status`,
      statusCallbackMethod: 'POST',
    })

    return NextResponse.json({ success: true, callSid: call.sid })
  } catch (error) {
    console.error('Outbound call error:', error)
    return NextResponse.json({ error: 'Failed to initiate call' }, { status: 500 })
  }
}
