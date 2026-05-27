import { NextRequest } from 'next/server'
import twilio from 'twilio'

const VoiceResponse = twilio.twiml.VoiceResponse

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const type = url.searchParams.get('type') || 'inbound'
  const contactName = url.searchParams.get('contactName') || ''
  const firmName = url.searchParams.get('firmName') || 'your firm'

  const twiml = new VoiceResponse()
  const baseUrl = 'https://www.taxnorth.ca'

  if (type === 'outbound') {
    // SALES SCRIPT — for accountants
    const greeting = contactName
      ? `Hello, may I speak with ${contactName} from ${firmName}?`
      : `Hello, I'm calling from TaxNorth dot ca regarding a partnership opportunity for tax professionals in Alberta.`

    const gather = twiml.gather({
      input: ['speech'],
      action: `${baseUrl}/api/voice/respond?type=outbound&firmName=${encodeURIComponent(firmName)}&history=`,
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

    twiml.say({ voice: 'Polly.Joanna-Neural' }, 'I did not hear a response. Please visit taxnorth dot ca slash partners. Thank you.')
    twiml.hangup()

  } else {
    // TAX GUIDANCE SCRIPT — for newcomers calling inbound
    const gather = twiml.gather({
      input: ['speech'],
      action: `${baseUrl}/api/voice/respond?type=inbound&history=`,
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
    }, 'Welcome to TaxNorth. I am your free AI tax guide for Canada. You can speak to me in any language. How can I help you today?')

    twiml.say({ voice: 'Polly.Joanna-Neural' }, 'I did not hear you. Please call back or visit taxnorth dot ca. Goodbye.')
    twiml.hangup()
  }

  return new Response(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}