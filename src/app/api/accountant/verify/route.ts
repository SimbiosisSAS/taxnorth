import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

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

  await supabaseAdmin
    .from('professionals')
    .update({ portal_token: null, portal_token_expires: null })
    .eq('id', professional.id)

  const response = NextResponse.redirect(new URL('/portal/dashboard', req.url))
  response.cookies.set('taxnorth_pro_id', professional.id, {
    httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60, path: '/',
  })
  return response
}