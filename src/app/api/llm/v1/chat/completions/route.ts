import { NextRequest } from 'next/server'
import { safeEqual } from '@/lib/session'

const MAX_MESSAGES = 40
const MAX_BODY_CHARS = 30000
const MAX_TOKENS_CAP = 500

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

// Private LLM endpoint (for the voice agent). Requires:
//   Authorization: Bearer <LLM_PROXY_SECRET>
// Without LLM_PROXY_SECRET set in the environment, every request is rejected.
export async function POST(req: NextRequest) {
  const secret = process.env.LLM_PROXY_SECRET
  const auth = req.headers.get('authorization') || ''
  if (!secret || !safeEqual(auth, `Bearer ${secret}`)) {
    return json({ error: 'Unauthorized' }, 401)
  }

  const raw = await req.text()
  if (raw.length > MAX_BODY_CHARS) return json({ error: 'Request too large' }, 413)

  let body: any
  try {
    body = JSON.parse(raw)
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  if (!Array.isArray(body?.messages) || body.messages.length === 0 || body.messages.length > MAX_MESSAGES) {
    return json({ error: 'Invalid messages' }, 400)
  }

  // Only allow-listed fields are forwarded; the model is always fixed.
  const payload: Record<string, unknown> = {
    model: 'deepseek/deepseek-v4-flash',
    messages: body.messages,
    max_tokens: Math.min(Number(body.max_tokens) || 300, MAX_TOKENS_CAP),
  }
  if (typeof body.temperature === 'number') payload.temperature = body.temperature
  if (body.stream === true) payload.stream = true
  if (Array.isArray(body.tools)) payload.tools = body.tools
  if (body.tool_choice !== undefined) payload.tool_choice = body.tool_choice

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://taxnorth.ca',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (payload.stream && response.body) {
      return new Response(response.body, {
        status: response.status,
        headers: { 'Content-Type': response.headers.get('content-type') || 'text/event-stream' },
      })
    }

    const data = await response.json()
    return Response.json(data, { status: response.status })
  } catch (error) {
    console.error('LLM proxy error:', error)
    return json({ error: 'Upstream error' }, 502)
  }
}
