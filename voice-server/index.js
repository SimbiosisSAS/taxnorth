require('dotenv').config()
const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const server = http.createServer(app)
const wss = new WebSocket.Server({ server, path: '/stream' })

const INBOUND_PROMPT = `You are TaxNorth, a friendly AI tax guide for newcomers to Canada.
Respond in the same language the person speaks.
Keep responses SHORT — maximum 3 sentences for voice.
Never recommend specific tax software by name like TurboTax or Wealthsimple.
For filing options, mention only: the CRA free software list at canada.ca, or a licensed professional through TaxNorth.
Always present the professional option as the better choice.
When suggesting a professional say: I can connect you with a verified tax professional who speaks your language. Visit taxnorth.ca slash connect.
You provide educational information only, not professional tax advice.`

const OUTBOUND_PROMPT = `You are a professional sales representative for TaxNorth.ca calling tax accountants in Alberta, Canada.
YOUR GOAL: Convince them to subscribe at taxnorth.ca/partners
KEY FACTS: TaxNorth connects newcomers to verified tax professionals. Clients pay $19.99 to connect. Subscription starts at $29/month with money-back guarantee. 500,000+ newcomers arrive in Canada each year.
Keep responses SHORT — 2-3 sentences max.
If interested, direct to taxnorth.ca/partners.
If not interested, thank them and end politely.
If asked if you are AI, be honest.`

wss.on('connection', (twilioWs, req) => {
  console.log('Twilio connected')

  const urlParams = new URLSearchParams(req.url.split('?')[1] || '')
  const callType = urlParams.get('type') || 'inbound'
  const firmName = urlParams.get('firmName') || ''

  const systemPrompt = callType === 'outbound'
    ? OUTBOUND_PROMPT + ` You are calling ${firmName || 'a tax firm'} in Alberta.`
    : INBOUND_PROMPT

  let streamSid = null
  let deepgramWs = null

  // Connect to Deepgram Voice Agent
  deepgramWs = new WebSocket('wss://agent.deepgram.com/agent', {
    headers: { Authorization: `Token ${process.env.DEEPGRAM_API_KEY}` }
  })

  deepgramWs.on('open', () => {
    console.log('Deepgram connected')

    deepgramWs.send(JSON.stringify({
      type: 'SettingsConfiguration',
      audio: {
        input: { encoding: 'mulaw', sample_rate: 8000 },
        output: { encoding: 'mulaw', sample_rate: 8000, container: 'none' }
      },
      agent: {
        listen: { model: 'nova-3' },
        think: {
          provider: {
            type: 'open_ai',
            fallback_to_groq: false
          },
          model: 'gpt-4o-mini',
          instructions: systemPrompt
        },
        speak: { model: 'aura-2-theia-en' }
      }
    }))
  })

  deepgramWs.on('message', (data) => {
    if (Buffer.isBuffer(data) && streamSid) {
      if (twilioWs.readyState === WebSocket.OPEN) {
        twilioWs.send(JSON.stringify({
          event: 'media',
          streamSid,
          media: { payload: data.toString('base64') }
        }))
      }
    } else {
      try {
        const event = JSON.parse(data.toString())
        console.log('Deepgram event:', event.type)
      } catch (e) {}
    }
  })

  deepgramWs.on('error', (err) => console.error('Deepgram error:', err))
  deepgramWs.on('close', () => console.log('Deepgram disconnected'))

  twilioWs.on('message', (rawData) => {
    try {
      const msg = JSON.parse(rawData.toString())

      if (msg.event === 'start') {
        streamSid = msg.start.streamSid
        console.log('Stream started:', streamSid)
      }

      if (msg.event === 'media' && deepgramWs?.readyState === WebSocket.OPEN) {
        const audioBuffer = Buffer.from(msg.media.payload, 'base64')
        deepgramWs.send(audioBuffer)
      }

      if (msg.event === 'stop') {
        console.log('Stream stopped')
        deepgramWs?.close()
      }
    } catch (e) {}
  })

  twilioWs.on('close', () => {
    console.log('Twilio disconnected')
    deepgramWs?.close()
  })
})

// TwiML endpoint for inbound calls
app.post('/voice', (req, res) => {
  const host = req.headers.host
  const type = req.query.type || 'inbound'
  const firmName = req.query.firmName || ''

  res.type('text/xml')
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="wss://${host}/stream?type=${type}&firmName=${encodeURIComponent(firmName)}"/>
  </Connect>
</Response>`)
})

app.get('/health', (req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 3001
server.listen(PORT, () => console.log(`Voice server running on port ${PORT}`))