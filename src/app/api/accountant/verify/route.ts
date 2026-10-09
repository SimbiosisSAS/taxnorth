import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { signToken } from '@/lib/session'

const PORTAL_TTL_SECONDS = 7 * 24 * 60 * 60

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.redirect(new URL('/portal', req.url))

  const { data: professional } = await supabaseAdmin
    .from('professionals')
    .select('id, portal_token_expires')
    .eq('portal_token', token)
    .single()

  if (!professional || new Date(professional.portal_token_expires) < new Date()) {
    return NextResponse.redirect(new URL('/portal?error=expired', req.url))
  }

  // Sign the session first, so a server misconfiguration does not burn the magic link
  const session = await signToken('pro', professional.id, PORTAL_TTL_SECONDS)
  if (!session) {
    console.error('SESSION_SECRET is missing or shorter than 32 characters')
    return NextResponse.redirect(new URL('/portal?error=config', req.url))
  }

  await supabaseAdmin
    .from('professionals')
    .update({ portal_token: null, portal_token_expires: null })
    .eq('id', professional.id)

  const response = NextResponse.redirect(new URL('/portal/dashboard', req.url))
  response.cookies.set('taxnorth_pro_id', session, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: PORTAL_TTL_SECONDS,
    path: '/',
  })
  return response
}
