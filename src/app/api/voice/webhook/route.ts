import { NextRequest } from 'next/server'
import twilio from 'twilio'

const VoiceResponse = twilio.twiml.VoiceResponse

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const contactName = url.searchParams.get('contactName') || ''
  const firmName = url.searchParams.get('firmName') || 'your firm'

  const twiml = new VoiceResponse()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.taxnorth.ca'

  const greeting = contactName
    ? `Hello, may I speak with ${contactName} from ${firmName}?`
    : `Hello, I'm calling from TaxNorth.ca regarding a partnership opportunity for tax professionals in Alberta.`

  const gather = twiml.gather({
    input: ['speech'],
    action: `${baseUrl}/api/voice/respond?firmName=${encodeURIComponent(firmName)}&history=`,
    method: 'POST',
    speechTimeout: 'auto',
    language: 'en-CA',
  })

  gather.say({
    voice: 'Polly.Joanna-Neural',
    language: 'en-US',
  }, greeting + ' TaxNorth connects newcomers to Canada with verified tax professionals. Do you have a moment to hear how it works?')

  twiml.redirect(`${baseUrl}/api/voice/webhook?firmName=${encodeURIComponent(firmName)}`)

  return new Response(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}