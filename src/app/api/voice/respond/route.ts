import { NextRequest } from 'next/server'
import twilio from 'twilio'
import { openrouter } from '@/lib/openrouter'

const VoiceResponse = twilio.twiml.VoiceResponse

const SALES_PROMPT = `You are a professional sales representative for TaxNorth.ca calling tax accountants and CPAs in Alberta, Canada.

YOUR GOAL: Convince them to subscribe to TaxNorth's professional directory at taxnorth.ca/partners

KEY FACTS TO SHARE:
- TaxNorth.ca is a free AI guide that educates newcomers about Canadian taxes in 12 languages
- When they need a professional, we connect them directly to accountants in our directory
- Clients pay $19.99 to connect - they arrive pre-qualified and ready to hire
- Directory subscription starts at $29/month — no per-client fees
- Annual plans with money-back guarantee if no clients in 12 months
- Over 500,000 newcomers arrive in Canada each year — growing market

CONVERSATION RULES:
- Keep every response SHORT — maximum 2-3 sentences
- Sound natural and conversational, not scripted
- If they ask questions, answer confidently
- If they show interest, tell them to visit taxnorth.ca/partners
- If they want more time, offer to send an email to partners@taxnorth.ca
- If they are not interested, thank them politely and end the call
- If asked if you are human or AI, be honest: you are an AI assistant from TaxNorth

END THE CALL if:
- They say they are not interested
- They ask to be removed from the list
- They confirm they will visit the website
Respond with ONLY the spoken words — no stage directions, no quotation marks.`

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const firmName = url.searchParams.get('firmName') || ''
  const rawHistory = url.searchParams.get('history') || ''

  const formData = await req.formData()
  const speechResult = formData.get('SpeechResult') as string || ''
  const callStatus = formData.get('CallStatus') as string || ''

  const twiml = new VoiceResponse()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.taxnorth.ca'

  // Parse conversation history
  let history: { role: string; content: string }[] = []
  try {
    history = rawHistory ? JSON.parse(decodeURIComponent(rawHistory)) : []
  } catch {
    history = []
  }

  if (!speechResult || callStatus === 'completed') {
    twiml.say({ voice: 'Polly.Joanna-Neural' }, 'Thank you for your time. Have a great day.')
    twiml.hangup()
    return new Response(twiml.toString(), {
      headers: { 'Content-Type': 'text/xml' },
    })
  }

  // Add user message to history
  history.push({ role: 'user', content: speechResult })

  try {
    // Generate AI response
    const completion = await openrouter.chat.completions.create({
      model: 'deepseek/deepseek-v4-flash',
      messages: [
        { role: 'system', content: SALES_PROMPT + `\n\nYou are calling ${firmName || 'a tax firm'} in Alberta.` },
        ...history as any,
      ],
      max_tokens: 150,
    })

    const aiResponse = completion.choices[0]?.message?.content || 'Thank you for your time.'

    // Add AI response to history
    history.push({ role: 'assistant', content: aiResponse })

    // Check if we should end the call
    const shouldEnd = aiResponse.toLowerCase().includes('thank you for your time') ||
      aiResponse.toLowerCase().includes('have a great day') ||
      aiResponse.toLowerCase().includes('goodbye')

    if (shouldEnd) {
      twiml.say({ voice: 'Polly.Joanna-Neural', language: 'en-US' }, aiResponse)
      twiml.hangup()
    } else {
      const historyEncoded = encodeURIComponent(JSON.stringify(history))

      const gather = twiml.gather({
        input: ['speech'],
        action: `${baseUrl}/api/voice/respond?firmName=${encodeURIComponent(firmName)}&history=${historyEncoded}`,
        method: 'POST',
        speechTimeout: 'auto',
        language: 'en-CA',
      })

      gather.say({
        voice: 'Polly.Joanna-Neural',
        language: 'en-US',
      }, aiResponse)

      twiml.redirect(`${baseUrl}/api/voice/respond?firmName=${encodeURIComponent(firmName)}&history=${historyEncoded}`)
    }

  } catch (error) {
    console.error('AI response error:', error)
    twiml.say({ voice: 'Polly.Joanna-Neural' }, 'I apologize, there was a technical issue. Please visit taxnorth.ca/partners for more information. Thank you.')
    twiml.hangup()
  }

  return new Response(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}