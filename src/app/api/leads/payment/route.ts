import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { sessionId, email, method } = await req.json()

    if (!sessionId && !email) {
      return NextResponse.json({ error: 'sessionId or email required' }, { status: 400 })
    }

    // Find the lead by sessionId or email
    const query = supabaseAdmin
      .from('leads')
      .update({
        payment_status: method === 'card' ? 'completed' : 'pending_etransfer',
        payment_amount: 19.99,
        payment_date: new Date().toISOString(),
      })

    if (sessionId) {
      query.eq('session_id', sessionId)
    } else {
      query.eq('email', email)
    }

    const { error } = await query

    if (error) {
      console.error('Payment update error:', error)
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Payment route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}