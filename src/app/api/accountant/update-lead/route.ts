import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/session'

const ALLOWED_STATUSES = ['new', 'contacted', 'in_progress', 'completed', 'lost']

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const proId = await verifyToken('pro', cookieStore.get('taxnorth_pro_id')?.value)
  if (!proId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { leadId, status, note } = await req.json()
  if (typeof leadId !== 'string' || !leadId) {
    return NextResponse.json({ error: 'leadId required' }, { status: 400 })
  }

  const { data: pro } = await supabaseAdmin
    .from('professionals')
    .select('email, name')
    .eq('id', proId)
    .single()

  if (!pro) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // A CPA can only update leads assigned to them (same rule the dashboard uses to list them)
  const { data: lead } = await supabaseAdmin
    .from('leads')
    .select('id')
    .eq('id', leadId)
    .eq('professional_name', pro.name)
    .maybeSingle()

  if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await supabaseAdmin
    .from('accountant_notes')
    .upsert({
      lead_id: leadId,
      professional_email: pro.email,
      status: ALLOWED_STATUSES.includes(status) ? status : 'new',
      note: typeof note === 'string' ? note.slice(0, 5000) : ''
    }, { onConflict: 'lead_id,professional_email' })

  return NextResponse.json({ success: true })
}
