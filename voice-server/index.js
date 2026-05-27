require('dotenv').config()
const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const server = http.createServer(app)
const wss = new WebSocket.Server({ server, path: '/stream' })

const INBOUND_PROMPT = `You are TaxNorth, a friendly AI tax guide for newcomers to Canada. Respond in the same language the person speaks. Keep responses SHORT for voice, maximum 3 sentences. Never recommend specific tax software by name. Always suggest connecting with a licensed professional through TaxNorth at taxnorth.ca slash connect. You provide educational information only.`

const OUTBOUND_PROMPT = `You are a professional sales representative for TaxNorth.ca calling tax accountants in Alberta, Canada. Goal: convince them to subscribe at taxnorth.ca/partners. TaxNorth connects newcomers to verified professionals. Clients pay $19.99 to connect. Subscription starts at $29 per month. Keep responses to 2-3 sentences. If interested, direct to taxnorth.ca/partners. If not interested, thank them politely and end.`

server.on('upgrade', function(req, socket, head) {
  console.log('WebSocket upgrade:', req.url)
})

wss.on('connection', function(twilioWs, req) {
  console.log('Twilio connected')
  var urlParams = new URLSearchParams(req.url.split('?')[1] || '')
  var callType = urlParams.get('type') || 'inbound'
  var firmName = urlParams.get('firmName') || ''
  var streamSid = null
  var deepgramWs = null
  var deepgramReady = false
  var audioQueue = []

  var systemPrompt = callType === 'outbound'
    ? OUTBOUND_PROMPT + ' You are calling ' + (firmName || 'a tax firm') + ' in Alberta.'
    : INBOUND_PROMPT

  deepgramWs = new WebSocket('wss://agent.deepgram.com/v1/agent/converse', {
    headers: { Authorization: 'Token ' + process.env.DEEPGRAM_API_KEY }
  })

  deepgramWs.on('open', function() {
    console.log('Deepgram connected — sending Settings')
    var settings = {
      type: 'Settings',
      audio: {
        input: { encoding: 'mulaw', sample_rate: 8000 },
        output: { encoding: 'mulaw', sample_rate: 8000, container: 'none' }
      },
      agent: {
        listen: {
          provider: { type: 'deepgram', model: 'nova-3' }
        },
        think: {
          provider: {
            type: 'open_ai',
            url: 'https://www.taxnorth.ca/api/llm',
            key: 'taxnorth-internal'
          },
          model: 'deepseek/deepseek-v4-flash',
          prompt: systemPrompt
        },
        speak: {
          provider: { type: 'deepgram', model: 'aura-2-theia-en' }
        },
        greeting: callType === 'inbound'
          ? 'Welcome to TaxNorth. How can I help you with your Canadian taxes today?'
          : 'Hello, I am calling from TaxNorth dot ca regarding a partnership opportunity for tax professionals in Alberta.'
      }
    }
    deepgramWs.send(JSON.stringify(settings))
    console.log('Settings sent')
  })

  deepgramWs.on('message', function(data) {
    if (Buffer.isBuffer(data)) {
      if (streamSid && twilioWs.readyState === WebSocket.OPEN) {
        twilioWs.send(JSON.stringify({
          event: 'media',
          streamSid: streamSid,
          media: { payload: data.toString('base64') }
        }))
      }
    } else {
      try {
        var event = JSON.parse(data.toString())
        console.log('Deepgram event:', event.type)
        if (event.type === 'SettingsApplied') {
          console.log('Ready — flushing audio queue')
          deepgramReady = true
          while (audioQueue.length > 0 && deepgramWs.readyState === WebSocket.OPEN) {
            deepgramWs.send(audioQueue.shift())
          }
        }
      } catch(e) {}
    }
  })

  deepgramWs.on('error', function(err) {
    console.error('Deepgram error:', err.message)
  })

  deepgramWs.on('close', function(code, reason) {
    console.log('Deepgram closed — code:', code, 'reason:', reason.toString())
    deepgramReady = false
  })

  twilioWs.on('message', function(rawData) {
    try {
      var msg = JSON.parse(rawData.toString())
      if (msg.event === 'start') {
        streamSid = msg.start.streamSid
        console.log('Stream started:', streamSid)
      }
      if (msg.event === 'media') {
        var audioBuffer = Buffer.from(msg.media.payload, 'base64')
        if (deepgramReady && deepgramWs && deepgramWs.readyState === WebSocket.OPEN) {
          deepgramWs.send(audioBuffer)
        } else {
          audioQueue.push(audioBuffer)
          if (audioQueue.length > 100) audioQueue.shift()
        }
      }
      if (msg.event === 'stop') {
        console.log('Stream stopped')
        if (deepgramWs) deepgramWs.close()
      }
    } catch(e) {}
  })

  twilioWs.on('close', function() {
    console.log('Twilio disconnected')
    if (deepgramWs) deepgramWs.close()
  })

  twilioWs.on('error', function(err) {
    console.error('Twilio error:', err.message)
  })
})

app.post('/voice', function(req, res) {
  var publicUrl = process.env.PUBLIC_URL || ('https://' + req.headers.host)
  var wsUrl = publicUrl.replace('https://', 'wss://')
  var type = req.query.type || 'inbound'
  var firmName = req.query.firmName || ''
  console.log('Incoming call — type:', type)
  res.type('text/xml')
  res.send('<?xml version="1.0" encoding="UTF-8"?><Response><Connect><Stream url="' + wsUrl + '/stream?type=' + type + '"/></Connect></Response>')
})

app.get('/health', function(req, res) {
  res.json({ status: 'ok' })
})

var PORT = process.env.PORT || 3001
server.listen(PORT, function() {
  console.log('Voice server running on port ' + PORT)
})