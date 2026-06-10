import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { key } = await req.json()

  if (key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set('taxnorth_admin', process.env.ADMIN_KEY!, {
    httpOnly: true,
    secure: true,
    maxAge: 8 * 60 * 60, // 8 horas
    path: '/',
    sameSite: 'strict',
  })
  return response
}