import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_TABLES = ['leads', 'users', 'conversations'] as const
type AllowedTable = typeof ALLOWED_TABLES[number]

export async function POST(req: NextRequest) {
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

  if (ids.length > 100) {
    return NextResponse.json({ error: 'Too many IDs' }, { status: 400 })
  }

  try {
    if (table === 'users') {
      // Primero buscar las conversaciones del usuario
      const { data: convs } = await supabaseAdmin
        .from('conversations')
        .select('id')
        .in('user_id', ids)

      if (convs && convs.length > 0) {
        const convIds = convs.map((c: { id: string }) => c.id)
        // Borrar mensajes de esas conversaciones
        await supabaseAdmin.from('messages').delete().in('conversation_id', convIds)
        // Borrar las conversaciones
        await supabaseAdmin.from('conversations').delete().in('id', convIds)
      }

      // Ahora sí borrar el usuario
      const { error } = await supabaseAdmin.from('users').delete().in('id', ids)
      if (error) {
        console.error('Delete error:', error)
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
      }

    } else if (table === 'conversations') {
      // Borrar mensajes primero
      await supabaseAdmin.from('messages').delete().in('conversation_id', ids)
      // Luego las conversaciones
      const { error } = await supabaseAdmin.from('conversations').delete().in('id', ids)
      if (error) {
        console.error('Delete error:', error)
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
      }

    } else {
      // leads — sin dependencias, borrar directo
      const { error } = await supabaseAdmin.from(table).delete().in('id', ids)
      if (error) {
        console.error('Delete error:', error)
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}