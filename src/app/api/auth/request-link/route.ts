import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email, sessionId } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
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

    await resend.emails.send({
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}