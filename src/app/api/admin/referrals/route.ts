import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { key, source } = await req.json()
  if (key !== process.env.ADMIN_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const slug = source.code || source.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const { data } = await supabaseAdmin.from('referral_sources').insert({ ...source, code: slug }).select().single()
  return NextResponse.json({ source: data })
}

export async function PUT(req: NextRequest) {
  const { key, id, source } = await req.json()
  if (key !== process.env.ADMIN_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await supabaseAdmin.from('referral_sources').update(source).eq('id', id)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const { key, id } = await req.json()
  if (key !== process.env.ADMIN_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await supabaseAdmin.from('referral_sources').delete().eq('id', id)
  return NextResponse.json({ success: true })
}