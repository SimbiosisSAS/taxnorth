import { openrouter, DEEPSEEK_MODEL } from '@/lib/openrouter'
import { supabaseAdmin } from '@/lib/supabase'
import { TAXNORTH_SYSTEM_PROMPT } from '@/lib/prompts'
import { getRelevantContext } from '@/lib/rag'
import { NextRequest } from 'next/server'

// Límites de rate limiting
const SESSION_MESSAGE_LIMIT = 20   // mensajes por sesión en 24 horas
const SESSION_WINDOW_HOURS = 24

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json()

    if (!message || !sessionId) {
      return new Response('Missing required fields', { status: 400 })
    }

    // Capturar IP para monitoreo
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown'

    const refCode = req.cookies.get('taxnorth_ref')?.value || null

    const { data: conversation, error: convError } = await supabaseAdmin
      .from('conversations')
      .upsert(
        { session_id: sessionId, referral_code: refCode },
        { onConflict: 'session_id' }
      )
      .select('id')
      .single()

    if (convError || !conversation) {
      console.error('Conversation error:', convError)
      return new Response('Failed to create conversation', { status: 500 })
    }

    // ── RATE LIMITING POR SESIÓN ──────────────────────────────
    const windowStart = new Date(
      Date.now() - SESSION_WINDOW_HOURS * 60 * 60 * 1000
    ).toISOString()

    const { count: messageCount } = await supabaseAdmin
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('conversation_id', conversation.id)
      .eq('role', 'user')
      .gte('created_at', windowStart)

    if ((messageCount || 0) >= SESSION_MESSAGE_LIMIT) {
      console.warn(`Rate limit hit — session: ${sessionId}, IP: ${ip}`)
      return new Response(
        JSON.stringify({
          error: 'You have reached the daily message limit for this session. Please try again tomorrow or contact hello@taxnorth.ca for assistance.'
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '86400',
          }
        }
      )
    }
    // ─────────────────────────────────────────────────────────

    // Validar que el mensaje no esté vacío ni sea demasiado largo
    const trimmedMessage = message.trim()
    if (!trimmedMessage) {
      return new Response('Message cannot be empty', { status: 400 })
    }
    if (trimmedMessage.length > 2000) {
      return new Response('Message too long. Maximum 2000 characters.', { status: 400 })
    }

    await supabaseAdmin.from('messages').insert({
      conversation_id: conversation.id,
      role: 'user',
      content: trimmedMessage,
    })

    const { data: history } = await supabaseAdmin
      .from('messages')
      .select('role, content')
      .eq('conversation_id', conversation.id)
      .order('created_at', { ascending: true })
      .limit(10)

    const context = await getRelevantContext(trimmedMessage)

    const systemWithContext = context
      ? `${TAXNORTH_SYSTEM_PROMPT}

VERIFIED INFORMATION FROM CRA DOCUMENTS:
Use the following verified information to answer accurately.
Always prefer this over general knowledge when available.

${context}`
      : TAXNORTH_SYSTEM_PROMPT

    const stream = await openrouter.chat.completions.create({
      model: DEEPSEEK_MODEL,
      stream: true,
      messages: [
        { role: 'system', content: systemWithContext },
        ...(history || []).map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
      ],
    })

    let fullResponse = ''

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || ''
          if (text) {
            fullResponse += text
            controller.enqueue(new TextEncoder().encode(text))
          }
        }

        await supabaseAdmin.from('messages').insert({
          conversation_id: conversation.id,
          role: 'assistant',
          content: fullResponse,
        })

        controller.close()
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}