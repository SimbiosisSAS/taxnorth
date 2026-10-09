import { supabaseAdmin } from '@/lib/supabase'
import { isAdminRequest } from '@/lib/adminAuth'
import { NextRequest, NextResponse } from 'next/server'

const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest(req))) return unauthorized()

  const { source } = await req.json()
  if (!source || (!source.code && !source.name)) {
    return NextResponse.json({ error: 'Name or code required' }, { status: 400 })
  }
  const slug = source.code || String(source.name).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const { data } = await supabaseAdmin.from('referral_sources').insert({ ...source, code: slug }).select().single()
  return NextResponse.json({ source: data })
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminRequest(req))) return unauthorized()

  const { id, source } = await req.json()
  await supabaseAdmin.from('referral_sources').update(source).eq('id', id)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminRequest(req))) return unauthorized()

  const { id } = await req.json()
  await supabaseAdmin.from('referral_sources').delete().eq('id', id)
  return NextResponse.json({ success: true })
}
