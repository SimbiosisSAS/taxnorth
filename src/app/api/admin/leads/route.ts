import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/adminAuth'
import { escapeHtml } from '@/lib/html'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(req: NextRequest) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from('leads')
    .select(`
      *,
      professional:professionals(id, name, firm_name, email, province, languages)
    `)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { leadId, action, professionalId, notes } = body

  if (action === 'confirm_payment') {
    const { error } = await supabaseAdmin
      .from('leads')
      .update({
        payment_status: 'completed',
        payment_date: new Date().toISOString(),
        status: 'contacted',
      })
      .eq('id', leadId)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  }

  if (action === 'assign') {
    const { data: professional } = await supabaseAdmin
      .from('professionals')
      .select('name, email, firm_name')
      .eq('id', professionalId)
      .single()

    const { data: lead } = await supabaseAdmin
      .from('leads')
      .select('full_name, email, phone, province, language, situation, notes')
      .eq('id', leadId)
      .single()

    const { error } = await supabaseAdmin
      .from('leads')
      .update({
        professional_id: professionalId,
        professional_name: professional?.name || null,
        assigned_at: new Date().toISOString(),
        assignment_notes: notes || null,
        status: 'contacted',
      })
      .eq('id', leadId)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    await supabaseAdmin.from('lead_assignments').insert({
      lead_id: leadId,
      professional_id: professionalId,
      assigned_by: 'admin',
      notes: notes || null,
      action: 'assigned',
    })

    if (professional?.email && lead) {
      await resend.emails.send({
        from: 'TaxNorth <hello@taxnorth.ca>',
        to: professional.email,
        subject: `New client assigned — ${lead.province || 'Canada'} — TaxNorth`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#1A2744;padding:24px;border-radius:8px 8px 0 0">
              <h1 style="color:#F4A332;margin:0;font-size:18px">New Client Assigned</h1>
              <p style="color:white;opacity:.7;margin:8px 0 0;font-size:14px">TaxNorth has matched a client to your practice</p>
            </div>
            <div style="background:#FAF8F5;padding:24px;border-radius:0 0 8px 8px">
              <table style="width:100%;border-collapse:collapse">
                <tr>
                  <td style="padding:8px 0;color:#666;font-size:14px;width:140px">Client name</td>
                  <td style="padding:8px 0;color:#1A2744;font-weight:600;font-size:14px">${escapeHtml((lead as any).full_name || 'Not provided')}</td>
                </tr>
                <tr style="border-top:1px solid #EEF1F7">
                  <td style="padding:8px 0;color:#666;font-size:14px">Email</td>
                  <td style="padding:8px 0;font-size:14px">
                    <a href="mailto:${escapeHtml((lead as any).email)}" style="color:#F4A332;font-weight:600">${escapeHtml((lead as any).email || '—')}</a>
                  </td>
                </tr>
                <tr style="border-top:1px solid #EEF1F7">
                  <td style="padding:8px 0;color:#666;font-size:14px">Phone</td>
                  <td style="padding:8px 0;font-size:14px">
                    <a href="tel:${escapeHtml((lead as any).phone)}" style="color:#F4A332;font-weight:600">${escapeHtml((lead as any).phone || '—')}</a>
                  </td>
                </tr>
                <tr style="border-top:1px solid #EEF1F7">
                  <td style="padding:8px 0;color:#666;font-size:14px">Province</td>
                  <td style="padding:8px 0;color:#1A2744;font-size:14px">${escapeHtml((lead as any).province || '—')}</td>
                </tr>
                <tr style="border-top:1px solid #EEF1F7">
                  <td style="padding:8px 0;color:#666;font-size:14px">Language</td>
                  <td style="padding:8px 0;color:#1A2744;font-size:14px">${escapeHtml((lead as any).language || '—')}</td>
                </tr>
                <tr style="border-top:1px solid #EEF1F7">
                  <td style="padding:8px 0;color:#666;font-size:14px;vertical-align:top">Situation</td>
                  <td style="padding:8px 0;color:#1A2744;font-size:14px">${escapeHtml(((lead as any).situation || []).join(', ') || '—')}</td>
                </tr>
                ${(lead as any).notes ? `
                <tr style="border-top:1px solid #EEF1F7">
                  <td style="padding:8px 0;color:#666;font-size:14px;vertical-align:top">Notes</td>
                  <td style="padding:8px 0;color:#1A2744;font-size:14px">${escapeHtml((lead as any).notes)}</td>
                </tr>` : ''}
                ${notes ? `
                <tr style="border-top:1px solid #EEF1F7">
                  <td style="padding:8px 0;color:#666;font-size:14px;vertical-align:top">Admin note</td>
                  <td style="padding:8px 0;color:#1A2744;font-size:14px">${escapeHtml(notes)}</td>
                </tr>` : ''}
              </table>
              <p style="color:#666;font-size:13px;margin:20px 0 0">
                Please reach out to this client within 24 hours. They have been notified that a professional will contact them soon.
              </p>
            </div>
          </div>
        `,
      }).catch(console.error)
    }

    return NextResponse.json({ success: true })
  }

  if (action === 'return') {
    const { data: lead } = await supabaseAdmin
      .from('leads')
      .select('professional_id')
      .eq('id', leadId)
      .single()

    if (lead?.professional_id) {
      await supabaseAdmin.from('lead_assignments').insert({
        lead_id: leadId,
        professional_id: lead.professional_id,
        assigned_by: 'admin',
        notes: notes || 'Returned to pool',
        action: 'returned',
      })
    }

    await supabaseAdmin
      .from('leads')
      .update({
        professional_id: null,
        professional_name: null,
        assigned_at: null,
        assignment_notes: null,
        status: 'new',
      })
      .eq('id', leadId)

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}