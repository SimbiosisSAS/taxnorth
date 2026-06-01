import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function ReferralPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params

  const { data: source } = await supabase
    .from('referral_sources')
    .select('id, name, is_active')
    .eq('code', code)
    .single()

  if (!source || !source.is_active) {
    redirect('/')
  }

  const cookieStore = await cookies()
  cookieStore.set('taxnorth_ref', code, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })

  redirect('/chat')
}