import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendMail } from '@/lib/mailer'
import { rateLimit, clientIp } from '@/lib/rateLimit'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    // max 5 requests per hour per IP
    if (!rateLimit(`magic-ip:${clientIp(req)}`, 5, 60 * 60 * 1000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const sessionId = typeof body.sessionId === 'string' && UUID_REGEX.test(body.sessionId) ? body.sessionId : null

    if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // max 3 emails per hour to the same address (stops email bombing)
    if (!rateLimit(`magic-email:${email.toLowerCase()}`, 3, 60 * 60 * 1000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

    const { data: user } = await supabaseAdmin
      .from('users')
      .upsert({ email, source: 'chat', last_seen: new Date().toISOString() }, { onConflict: 'email' })
      .select('id')
      .single()

    await supabaseAdmin
      .from('users')
      .update({ magic_token: token, magic_token_expires: expires.toISOString() })
      .eq('email', email)

    if (sessionId && user) {
      await supabaseAdmin
        .from('conversations')
        .update({ user_id: user.id })
        .eq('session_id', sessionId)
    }

    const magicLink = `https://www.taxnorth.ca/api/auth/verify?token=${token}`

    const sent = await sendMail('customer-magic-link', {
      from: 'TaxNorth <hello@taxnorth.ca>',
      to: email,
      subject: 'Access your TaxNorth conversation history',
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
          <div style="background-color: #1A2744; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #F4A332; margin: 0; font-size: 22px;">TaxNorth.ca</h1>
          </div>
          <div style="background-color: #FAF8F5; padding: 32px 24px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1A2744; font-size: 18px; margin: 0 0 16px;">Your conversation is saved.</h2>
            <p style="color: #444; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
              Click the button below to access your TaxNorth account and see your full conversation history. No password needed.
            </p>
            <a href="${magicLink}" style="display: block; background-color: #F4A332; color: #1A2744; text-align: center; padding: 14px 24px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; margin-bottom: 24px;">
              Access my account →
            </a>
            <p style="color: #aaa; font-size: 12px; margin: 0;">
              This link expires in 24 hours. If you didn't request this, ignore this email.
            </p>
          </div>
        </div>
      `
    })

    if (!sent) {
      return NextResponse.json({ error: 'Email could not be sent' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}