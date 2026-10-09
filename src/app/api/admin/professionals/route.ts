import { supabaseAdmin } from '@/lib/supabase'
import { isAdminRequest } from '@/lib/adminAuth'
import { NextRequest, NextResponse } from 'next/server'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function GET(req: NextRequest) {
  if (!(await isAdminRequest(req))) return unauthorized()

  const { data, error } = await supabaseAdmin
    .from('professionals')
    .select('id, name, firm_name, email, province, languages')
    .eq('is_verified', true)
    .order('name')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data || [])
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest(req))) return unauthorized()

  const { professional } = await req.json()
  const { data } = await supabaseAdmin.from('professionals').insert(professional).select().single()
  return NextResponse.json({ professional: data })
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminRequest(req))) return unauthorized()

  const { id, professional } = await req.json()
  await supabaseAdmin.from('professionals').update(professional).eq('id', id)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminRequest(req))) return unauthorized()

  const { id } = await req.json()
  await supabaseAdmin.from('professionals').delete().eq('id', id)
  return NextResponse.json({ success: true })
}
