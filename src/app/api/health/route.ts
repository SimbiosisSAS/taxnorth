import { supabaseAdmin } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  await supabaseAdmin.from('conversations').select('id').limit(1)
  return NextResponse.json({ status: 'ok' })
}