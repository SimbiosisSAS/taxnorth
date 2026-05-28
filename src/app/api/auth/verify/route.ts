import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/chat', req.url))
  }

  const { data: user } = await supabaseAdmin
    .from('users')
    .select('id, email, magic_token_expires')
    .eq('magic_token', token)
    .single()

  if (!user) {
    return NextResponse.redirect(new URL('/chat?error=invalid_link', req.url))
  }

  if (new Date(user.magic_token_expires) < new Date()) {
    return NextResponse.redirect(new URL('/chat?error=expired_link', req.url))
  }

  await supabaseAdmin
    .from('users')
    .update({ magic_token: null, magic_token_expires: null, last_seen: new Date().toISOString() })
    .eq('id', user.id)

  const response = NextResponse.redirect(new URL('/my-taxes', req.url))
  response.cookies.set('taxnorth_user_id', user.id, {
    httpOnly: true,
    secure: true,
    maxAge: 365 * 24 * 60 * 60,
    path: '/',
  })

  return response
}