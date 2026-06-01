import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  const { data: professional } = await supabaseAdmin
    .from('professionals')
    .select('id, name, firm_name')
    .eq('email', email.toLowerCase())
    .single()

  if (!professional) {
    return NextResponse.json({ error: 'Email not found in our partner network.' }, { status: 404 })
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

  await supabaseAdmin
    .from('professionals')
    .update({ portal_token: token, portal_token_expires: expires.toISOString() })
    .eq('id', professional.id)

  const link = `https://www.taxnorth.ca/api/accountant/verify?token=${token}`

  await resend.emails.send({
    from: 'TaxNorth <hello@taxnorth.ca>',
    to: email,
    subject: 'Access your TaxNorth partner portal',
    html: `
      <div style="font-family:sans-serif; max-width:500px; margin:0 auto;">
        <div style="background:#1A2744; padding:24px; border-radius:8px 8px 0 0; text-align:center;">
          <h1 style="color:#F4A332; margin:0; font-size:22px;">TaxNorth Partner Portal</h1>
        </div>
        <div style="background:#FAF8F5; padding:32px 24px; border-radius:0 0 8px 8px;">
          <h2 style="color:#1A2744; font-size:18px; margin:0 0 16px;">Hi ${professional.name},</h2>
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