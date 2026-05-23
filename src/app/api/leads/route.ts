import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, email, province, language, situation, notes, sessionId } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Obtener conversation_id si existe sesión
    let conversationId = null
    if (sessionId) {
      const { data: conversation } = await supabaseAdmin
        .from('conversations')
        .select('id')
        .eq('session_id', sessionId)
        .single()
      conversationId = conversation?.id || null
    }

    // Guardar el lead
    const { data: lead, error } = await supabaseAdmin
      .from('leads')
      .insert({
        full_name: fullName,
        email,
        province,
        language,
        situation,
        notes,
        conversation_id: conversationId,
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      console.error('Lead error:', error)
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, leadId: lead.id })

  } catch (error) {
    console.error('Leads API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}