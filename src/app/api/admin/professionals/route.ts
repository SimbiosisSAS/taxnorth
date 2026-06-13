import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('professionals')
    .select('id, name, firm_name, email, province, languages')
    .eq('is_verified', true)
    .order('name')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data || [])
}

export async function POST(req: NextRequest) {
  const { key, professional } = await req.json()
  if (key !== process.env.ADMIN_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data } = await supabaseAdmin.from('professionals').insert(professional).select().single()
  return NextResponse.json({ professional: data })
}

export async function PUT(req: NextRequest) {
  const { key, id, professional } = await req.json()
  if (key !== process.env.ADMIN_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await supabaseAdmin.from('professionals').update(professional).eq('id', id)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const { key, id } = await req.json()
  if (key !== process.env.ADMIN_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await supabaseAdmin.from('professionals').delete().eq('id', id)
  return NextResponse.json({ success: true })
}