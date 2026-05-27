import { NextRequest } from 'next/server'
import twilio from 'twilio'
import { openrouter } from '@/lib/openrouter'

const VoiceResponse = twilio.twiml.VoiceResponse

const SALES_PROMPT = `You are a professional sales representative for TaxNorth.ca calling tax accountants and CPAs in Alberta, Canada.

YOUR GOAL: Convince them to subscribe to TaxNorth's professional directory at taxnorth.ca/partners

KEY FACTS:
- TaxNorth.ca is a free AI guide that educates newcomers about Canadian taxes in 12 languages
- When they need a professional, we connect them to accountants in our directory
- Clients pay $19.99 to connect — they arrive pre-qualified and ready to hire
- Directory subscription starts at $29/month — no per-client fees
- Annual plans with money-back guarantee if no clients in 12 months
- Over 500,000 newcomers arrive in Canada each year

RULES:
- Keep every response SHORT — maximum 2-3 sentences
- Sound natural and conversational
- If they show interest, tell them to visit taxnorth.ca/partners
- If they want follow-up, offer to send email to partners@taxnorth.ca
- If not interested, thank them politely and end
- If asked if you are human or AI, be honest
- End the call naturally when appropriate

Respond with ONLY the spoken words — no stage directions.`

const TAX_GUIDANCE_PROMPT = `You are TaxNorth, a friendly AI tax guide for newcomers to Canada.

RULES:
- Respond in the same language the person speaks
- Keep responses SHORT for voice — maximum 3 sentences
- Be warm and patient
- Never recommend specific tax software by name such as TurboTax or Wealthsimple
- For filing options, mention only two paths: the CRA's free certified software list at canada dot ca, or working with a licensed professional through TaxNorth
- Always present the professional option as the better choice for newcomers
- When suggesting a professional say: I can connect you with a verified tax professional who speaks your language. Visit taxnorth dot ca slash connect or I can arrange it for you.
- You provide educational information only, not professional tax advice

Respond with ONLY the spoken words — no stage directions, no markdown, no bullet points.`

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const type = url.searchParams.get('type') || 'inbound'
  const firmName = url.searchParams.get('firmName') || ''
  const rawHistory = url.searchParams.get('history') || ''

  const formData = await req.formData()
  const speechResult = formData.get('SpeechResult') as string || ''

  const twiml = new VoiceResponse()
  const baseUrl = 'https://www.taxnorth.ca'

  let history: { role: string; content: string }[] = []
  try {
    history = rawHistory ? JSON.parse(decodeURIComponent(rawHistory)) : []
  } catch {
    history = []
  }

  if (!speechResult) {
    twiml.say({ voice: 'Polly.Joanna-Neural' }, 'Thank you for calling TaxNorth. Goodbye.')
    twiml.hangup()
    return new Response(twiml.toString(), {
      headers: { 'Content-Type': 'text/xml' },
    })
  }

  history.push({ role: 'user', content: speechResult })

  const systemPrompt = type === 'outbound'
    ? SALES_PROMPT + `\n\nYou are calling ${firmName || 'a tax firm'} in Alberta.`
    : TAX_GUIDANCE_PROMPT

  try {
    const completion = await openrouter.chat.completions.create({
      model: 'deepseek/deepseek-v4-flash',
      messages: [
        { role: 'system', content: systemPrompt },
        ...history as any,
      ],
      max_tokens: 120,
    })

    const aiResponse = completion.choices[0]?.message?.content || 'Thank you for calling TaxNorth.'
    history.push({ role: 'assistant', content: aiResponse })

    const shouldEnd = type === 'outbound' && (
      aiResponse.toLowerCase().includes('thank you for your time') ||
      aiResponse.toLowerCase().includes('have a great day') ||
      aiResponse.toLowerCase().includes('goodbye')
    )

    if (shouldEnd) {
      twiml.say({ voice: 'Polly.Joanna-Neural', language: 'en-US' }, aiResponse)
      twiml.hangup()
    } else {
      const historyEncoded = encodeURIComponent(JSON.stringify(history))

      const gather = twiml.gather({
        input: ['speech'],
        action: `${baseUrl}/api/voice/respond?type=${type}&firmName=${encodeURIComponent(firmName)}&history=${historyEncoded}`,
        method: 'POST',
        speechTimeout: '1',
        speechModel: 'phone_call',
        enhanced: true,
        language: 'en-CA',
        timeout: 10,
      })

      gather.say({
        voice: 'Polly.Joanna-Neural',
        language: 'en-US',
      }, aiResponse)

      twiml.redirect(`${baseUrl}/api/voice/respond?type=${type}&firmName=${encodeURIComponent(firmName)}&history=${historyEncoded}`)
    }

  } catch (error) {
    console.error('Voice AI error:', error)
    twiml.say({ voice: 'Polly.Joanna-Neural' }, 'I apologize for the technical issue. Please visit taxnorth dot ca. Thank you.')
    twiml.hangup()
  }

  return new Response(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}