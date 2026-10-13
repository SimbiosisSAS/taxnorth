import { NextRequest } from 'next/server'
import twilio from 'twilio'
import { validateTwilioRequest, formToParams } from '@/lib/twilioAuth'

const MessagingResponse = twilio.twiml.MessagingResponse

export async function POST(req: NextRequest) {
  const form = await req.formData()
  if (!validateTwilioRequest(req, formToParams(form))) {
    return new Response('Forbidden', { status: 403 })
  }

  const twiml = new MessagingResponse()

  twiml.message(
    'Thanks for reaching out to TaxNorth! 🍁 Subscribe to our professional directory and start receiving pre-qualified newcomer clients: https://www.taxnorth.ca/partners'
  )

  return new Response(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}