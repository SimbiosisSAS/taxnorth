import { openrouter, DEEPSEEK_MODEL } from '@/lib/openrouter'
import { supabaseAdmin } from '@/lib/supabase'
import { buildSystemPrompt } from '@/lib/prompts'
import { getRelevantContext } from '@/lib/rag'
import { NextRequest } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'

const SESSION_MESSAGE_LIMIT = 20
const SESSION_WINDOW_HOURS = 24

const THINK_OPEN = ['<ds_thinking>', '<think>', '<thinking>']
const THINK_CLOSE = ['</ds_thinking>', '</think>', '</thinking>']

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json()

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!message || !sessionId || !uuidRegex.test(sessionId)) {
      return new Response('Missing or invalid required fields', { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown'

    // 60 messages per hour per IP, on top of the 20-per-session daily limit
    if (!rateLimit(`chat-ip:${ip}`, 60, 60 * 60 * 1000)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests from your network. Please try again in a while.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '3600' } }
      )
    }

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
        JSON.stringify({ error: 'You have reached the daily message limit. Please try again tomorrow or contact hello@taxnorth.ca for assistance.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '86400' } }
      )
    }

    const trimmedMessage = message.trim()
    if (!trimmedMessage) return new Response('Message cannot be empty', { status: 400 })
    if (trimmedMessage.length > 2000) return new Response('Message too long. Maximum 2000 characters.', { status: 400 })

    await supabaseAdmin.from('messages').insert({
      conversation_id: conversation.id,
      role: 'user',
      content: trimmedMessage,
    })

    // the 10 most recent messages, oldest first
    const { data: recentMessages } = await supabaseAdmin
      .from('messages')
      .select('role, content')
      .eq('conversation_id', conversation.id)
      .order('created_at', { ascending: false })
      .limit(10)
    const history = (recentMessages || []).reverse()

    const { context, sources } = await getRelevantContext(trimmedMessage)

    // Check if this session has a completed payment
    const { data: paidLeads } = await supabaseAdmin
      .from('leads')
      .select('id')
      .eq('session_id', sessionId)
      .eq('payment_status', 'completed')
      .limit(1)

    const hasPaid = (paidLeads?.length ?? 0) > 0

    const systemWithContext = buildSystemPrompt({
      hasPaid,
      ragContext: context || undefined,
    })

    const openrouterStream = await openrouter.chat.completions.create({
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

    const enc = new TextEncoder()
    let fullRaw = ''
    let fullCleaned = ''
    let sourcesText = ''

    const readableStream = new ReadableStream({
      async start(controller) {
        let preBuffer = ''
        let streamingStarted = false
        let inThinkBlock = false

        for await (const chunk of openrouterStream) {
          const text = chunk.choices[0]?.delta?.content || ''
          if (!text) continue

          fullRaw += text

          if (streamingStarted) {
            if (THINK_OPEN.some(t => text.includes(t))) inThinkBlock = true
            if (inThinkBlock) {
              if (THINK_CLOSE.some(t => text.includes(t))) inThinkBlock = false
              continue
            }
            fullCleaned += text
            controller.enqueue(enc.encode(text))
          } else {
            preBuffer += text
            const hasOpen = THINK_OPEN.some(t => preBuffer.includes(t))
            const hasClose = THINK_CLOSE.some(t => preBuffer.includes(t))

            if (!hasOpen || hasClose) {
              streamingStarted = true
              let toSend = preBuffer
              THINK_OPEN.forEach((open, i) => {
                const close = THINK_CLOSE[i]
                const regex = new RegExp(open.replace(/[<>]/g, c => `\\${c}`) + '[\\s\\S]*?' + close.replace(/[<>\/]/g, c => `\\${c}`), 'gi')
                toSend = toSend.replace(regex, '')
              })
              toSend = toSend.replace(/^[^a-zA-Z\*\[\#]+/, '').trim()
              if (toSend) {
                fullCleaned += toSend
                controller.enqueue(enc.encode(toSend))
              }
              preBuffer = ''
            }
          }
        }

        if (!streamingStarted && preBuffer) {
          let toSend = preBuffer
          THINK_OPEN.forEach((open, i) => {
            const close = THINK_CLOSE[i]
            const regex = new RegExp(open.replace(/[<>]/g, c => `\\${c}`) + '[\\s\\S]*?' + close.replace(/[<>\/]/g, c => `\\${c}`), 'gi')
            toSend = toSend.replace(regex, '')
          })
          toSend = toSend.replace(/^[^a-zA-Z\*\[\#]+/, '').trim()
          if (toSend) {
            fullCleaned += toSend
            controller.enqueue(enc.encode(toSend))
          }
        }

        if (sources.length > 0) {
          sourcesText = `\n\n---\n**Sources:** ${sources.join(' · ')}`
          controller.enqueue(enc.encode(sourcesText))
        }

        await supabaseAdmin.from('messages').insert({
          conversation_id: conversation.id,
          role: 'assistant',
          content: fullCleaned + sourcesText,
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