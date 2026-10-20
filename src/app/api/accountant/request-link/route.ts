import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendMail } from '@/lib/mailer'
import { rateLimit, clientIp } from '@/lib/rateLimit'
import { escapeHtml } from '@/lib/html'

export async function POST(req: NextRequest) {
  if (!rateLimit(`pro-link-ip:${clientIp(req)}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  let body: { email?: unknown } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  if (!email || email.length > 254) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  if (!rateLimit(`pro-link-email:${email.toLowerCase()}`, 3, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const { data: professional } = await supabaseAdmin
    .from('professionals')
    .select('id, name, firm_name')
    .eq('email', email.toLowerCase())
    .maybeSingle()

  // Same answer whether or not the email belongs to a partner, so this form
  // cannot be used to find out which firms are in the network.
  if (!professional) {
    return NextResponse.json({ success: true })
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

  await supabaseAdmin
    .from('professionals')
    .update({ portal_token: token, portal_token_expires: expires.toISOString() })
    .eq('id', professional.id)

  const link = `https://www.taxnorth.ca/api/accountant/verify?token=${token}`

  await sendMail('cpa-magic-link', {
    from: 'TaxNorth <hello@taxnorth.ca>',
    to: email,
    subject: 'Access your TaxNorth partner portal',
    html: `
      <div style="font-family:sans-serif; max-width:500px; margin:0 auto;">
        <div style="background:#1A2744; padding:24px; border-radius:8px 8px 0 0; text-align:center;">
          <h1 style="color:#F4A332; margin:0; font-size:22px;">TaxNorth Partner Portal</h1>
        </div>
        <div style="background:#FAF8F5; padding:32px 24px; border-radius:0 0 8px 8px;">
          <h2 style="color:#1A2744; font-size:18px; margin:0 0 16px;">Hi ${escapeHtml(professional.name)},</h2>
          <p style="color:#444; font-size:15px; line-height:1.6; margin:0 0 24px;">
            Click the button below to access your TaxNorth partner portal — see your clients, update statuses, and access multilingual templates.
          </p>
          <a href="${link}" style="display:block; background:#F4A332; color:#1A2744; text-align:center; padding:14px 24px; border-radius:8px; font-weight:700; font-size:15px; text-decoration:none; margin-bottom:16px;">
            Access my portal →
          </a>
          <p style="color:#aaa; font-size:12px; margin:0;">This link expires in 24 hours.</p>
        </div>
      </div>
    `
  })

  return NextResponse.json({ success: true })
}