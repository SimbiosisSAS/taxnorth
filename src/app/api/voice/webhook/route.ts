import { NextRequest } from 'next/server'
import twilio from 'twilio'

const VoiceResponse = twilio.twiml.VoiceResponse

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const contactName = url.searchParams.get('contactName') || ''
  const firmName = url.searchParams.get('firmName') || 'your firm'

  const twiml = new VoiceResponse()
  const baseUrl = 'https://www.taxnorth.ca'

  const greeting = contactName
    ? `Hello, may I speak with ${contactName} from ${firmName}?`
    : `Hello, I'm calling from TaxNorth dot ca regarding a partnership for tax professionals in Alberta.`

  const gather = twiml.gather({
    input: ['speech'],
    action: `${baseUrl}/api/voice/respond?firmName=${encodeURIComponent(firmName)}&history=`,
    method: 'POST',
    speechTimeout: '3',
    speechModel: 'phone_call',
    enhanced: true,
    language: 'en-CA',
    timeout: 10,
  })

  gather.say({
    voice: 'Polly.Joanna-Neural',
    language: 'en-US',
  }, greeting + ' TaxNorth connects newcomers to Canada with verified tax professionals. Do you have a moment to hear how it works?')

  twiml.say({ voice: 'Polly.Joanna-Neural' }, 'I did not hear a response. Please call us back at taxnorth dot ca. Thank you.')
  twiml.hangup()

  return new Response(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}