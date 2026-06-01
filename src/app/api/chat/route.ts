import { openrouter, DEEPSEEK_MODEL } from '@/lib/openrouter'
import { supabaseAdmin } from '@/lib/supabase'
import { TAXNORTH_SYSTEM_PROMPT } from '@/lib/prompts'
import { getRelevantContext } from '@/lib/rag'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json()

    if (!message || !sessionId) {
      return new Response('Missing required fields', { status: 400 })
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

    await supabaseAdmin.from('messages').insert({
      conversation_id: conversation.id,
      role: 'user',
      content: message,
    })

    const { data: history } = await supabaseAdmin
      .from('messages')
      .select('role, content')
      .eq('conversation_id', conversation.id)
      .order('created_at', { ascending: true })
      .limit(10)

    const context = await getRelevantContext(message)

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