import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_COOKIE,
  ADMIN_TTL_SECONDS,
  checkAdminKey,
  createAdminCookieValue,
} from '@/lib/adminAuth'
import { rateLimit, clientIp } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  // 5 attempts per 15 minutes per IP
  if (!rateLimit(`admin-login:${clientIp(req)}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
  }

  let key: unknown
  try {
    ;({ key } = await req.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!checkAdminKey(key)) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 401 })
  }

  // Signed, expiring session token. The cookie never contains the admin key itself.
  const sessionValue = await createAdminCookieValue()
  if (!sessionValue) {
    console.error('SESSION_SECRET is missing or shorter than 32 characters')
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(ADMIN_COOKIE, sessionValue, {
    httpOnly: true,
    secure: true,
    maxAge: ADMIN_TTL_SECONDS,
    path: '/',
    sameSite: 'strict',
  })
  return response
}
