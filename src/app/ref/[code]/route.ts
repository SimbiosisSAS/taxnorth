import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params

  const { data: source } = await supabase
    .from('referral_sources')
    .select('id, name, is_active')
    .eq('code', code)
    .single()

  if (!source || !source.is_active) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  const response = NextResponse.redirect(new URL('/chat', req.url))
  response.cookies.set('taxnorth_ref', code, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
  })

  return response
}