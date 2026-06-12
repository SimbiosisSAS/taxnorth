import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_TABLES = ['leads', 'users', 'conversations'] as const
type AllowedTable = typeof ALLOWED_TABLES[number]

export async function POST(req: NextRequest) {
  // Verifica la cookie admin — nunca el body
  const adminCookie = req.cookies.get('taxnorth_admin')?.value
  if (adminCookie !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { table, ids } = await req.json()

  if (!ALLOWED_TABLES.includes(table as AllowedTable)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 })
  }

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: 'No IDs provided' }, { status: 400 })
  }

  // Máximo 100 deletes por request — previene abuso
  if (ids.length > 100) {
    return NextResponse.json({ error: 'Too many IDs' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from(table).delete().in('id', ids)

  if (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}