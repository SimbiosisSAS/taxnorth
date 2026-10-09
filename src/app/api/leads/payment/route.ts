import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, clientIp } from '@/lib/rateLimit'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// The browser can only say "I sent the e-Transfer" (pending_etransfer).
// A lead becomes 'completed' ONLY when an admin confirms it in /admin/leads
// (or, later, from a verified Helcim webhook). Never trust the client for this.
export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(`lead-payment:${clientIp(req)}`, 10, 60 * 60 * 1000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const { sessionId, email } = await req.json()

    const hasSession = typeof sessionId === 'string' && UUID_REGEX.test(sessionId)
    const cleanEmail = typeof email === 'string' ? email.trim() : ''
    const hasEmail = cleanEmail.length <= 254 && EMAIL_REGEX.test(cleanEmail)

    if (!hasSession && !hasEmail) {
      return NextResponse.json({ error: 'sessionId or email required' }, { status: 400 })
    }

    let query = supabaseAdmin
      .from('leads')
      .update({
        payment_status: 'pending_etransfer',
        payment_amount: 19.99,
        payment_date: new Date().toISOString(),
      })
      // never touch a lead that an admin already marked as paid
      .or('payment_status.is.null,payment_status.neq.completed')

    query = hasSession ? query.eq('session_id', sessionId) : query.eq('email', cleanEmail)

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
