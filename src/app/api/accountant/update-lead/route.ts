import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const proId = cookieStore.get('taxnorth_pro_id')?.value
  if (!proId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { leadId, status, note } = await req.json()

  const { data: pro } = await supabaseAdmin
    .from('professionals')
    .select('email')
    .eq('id', proId)
    .single()

  if (!pro) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await supabaseAdmin
    .from('accountant_notes')
    .upsert({
      lead_id: leadId,
      professional_email: pro.email,
      status: status || 'new',
      note: note || ''
    }, { onConflict: 'lead_id,professional_email' })

  return NextResponse.json({ success: true })
}