import { supabaseAdmin } from '@/lib/supabase'
import { isAdminRequest } from '@/lib/adminAuth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { data, error } = await supabaseAdmin
    .from('prospect_activities')
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error }, { status: 500 })

  await supabaseAdmin
    .from('prospects')
    .update({ last_contact_at: new Date().toISOString() })
    .eq('id', body.prospect_id)

  return NextResponse.json(data)
}