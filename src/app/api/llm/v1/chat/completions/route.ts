import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://taxnorth.ca',
      'X-Title': 'TaxNorth Voice Agent',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...body,
      model: 'deepseek/deepseek-v4-flash',
    }),
  })

  const data = await response.json()
  return Response.json(data)
}