require('dotenv').config()
const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const { validTwilioRequest, signStreamToken, verifyStreamToken } = require('./auth')

const app = express()
app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true, limit: '20kb' }))
app.use(express.json({ limit: '20kb' }))

const server = http.createServer(app)
const wss = new WebSocket.Server({ server, path: '/stream', maxPayload: 64 * 1024 })

// Mulaw decode table
const MULAW_DECODE = new Int16Array(256)
for (let i = 0; i < 256; i++) {
  let b = ~i & 0xFF
  const sign = b & 0x80
  const exp = (b >> 4) & 0x07
  const mantissa = b & 0x0F
  let sample = ((mantissa << 3) + 132) << exp
  MULAW_DECODE[i] = sign ? 132 - sample : sample - 132
}

function mulawToLinear16(mulawBuf) {
  const out = Buffer.alloc(mulawBuf.length * 2)
  for (let i = 0; i < mulawBuf.length; i++) {
    out.writeInt16LE(MULAW_DECODE[mulawBuf[i]], i * 2)
  }
  return out
}

function linear16ToMulaw(linearBuf) {
  const out = Buffer.alloc(linearBuf.length / 2)
  for (let i = 0; i < out.length; i++) {
    let s = linearBuf.readInt16LE(i * 2)
    const sign = s < 0 ? 0x80 : 0
    if (s < 0) s = -s
    s += 132
    if (s > 32767) s = 32767
    let exp = 7
    for (let e = 0; e < 8; e++) {
      if (s <= (256 << e)) { exp = e; break }
    }
    const mantissa = (s >> (exp + 3)) & 0x0F
    out[i] = (~(sign | (exp << 4) | mantissa)) & 0xFF
  }
  return out
}

const INBOUND_PROMPT = 'You are TaxNorth, a friendly AI tax guide for newcomers to Canada. Keep responses SHORT for voice, maximum 2 sentences. Never recommend TurboTax or Wealthsimple. When the user needs a professional say: Visit taxnorth.ca slash connect. You provide educational information only.'

const OUTBOUND_PROMPT = 'You are a sales representative for TaxNorth.ca calling tax accountants in Alberta. Goal: convince them to subscribe at taxnorth.ca/partners. Keep responses to 2 sentences. If interested direct to taxnorth.ca/partners. If not interested thank them and end.'

// Cost and abuse limits
var MAX_CONCURRENT_CALLS = parseInt(process.env.MAX_CONCURRENT_CALLS || '3', 10)
var MAX_CALL_MS = 10 * 60 * 1000
var activeCalls = 0

wss.on('connection', function(twilioWs) {
  // refuse floods of sockets that never authenticate
  if (wss.clients.size > MAX_CONCURRENT_CALLS * 5) {
    twilioWs.close(1013, 'busy')
    return
  }

  var authenticated = false
  var finished = false
  var callType = 'inbound'
  var streamSid = null
  var deepgramWs = null
  var deepgramReady = false
  var audioQueue = []

  // the first message (Twilio "start") must arrive within 5 seconds and carry a valid token
  var authTimer = setTimeout(function() {
    if (!authenticated) twilioWs.close(1008, 'unauthorized')
  }, 5000)
  var callTimer = null

  function cleanup() {
    if (finished) return
    finished = true
    clearTimeout(authTimer)
    if (callTimer) clearTimeout(callTimer)
    if (authenticated) activeCalls--
    if (deepgramWs) deepgramWs.close()
  }

  // Deepgram is only opened after the stream is authenticated
  function startAgent() {
    var systemPrompt = callType === 'outbound'
      ? OUTBOUND_PROMPT + ' You are calling a tax firm in Alberta.'
      : INBOUND_PROMPT

    deepgramWs = new WebSocket(
      'wss://agent.deepgram.com/v1/agent/converse?token=' + process.env.DEEPGRAM_API_KEY
    )

    deepgramWs.on('open', function() {
      console.log('Deepgram connected, sending Settings')
      var settings = {
        type: 'Settings',
        agent: {
          speak: {
            provider: { type: 'deepgram', model: 'aura-2-odysseus-en' }
          },
          think: {
            provider: { type: 'google', model: 'gemini-3.1-flash-lite' },
            prompt: systemPrompt
          },
          greeting: 'Welcome to TaxNorth. How can I help you today?'
        }
      }
      deepgramWs.send(JSON.stringify(settings))
      console.log('Settings sent')
    })

    deepgramWs.on('message', function(data) {
      if (Buffer.isBuffer(data)) {
        // linear16 from Deepgram, converted to mulaw for Twilio
        if (streamSid && twilioWs.readyState === WebSocket.OPEN) {
          var mulawData = linear16ToMulaw(data)
          twilioWs.send(JSON.stringify({
            event: 'media',
            streamSid: streamSid,
            media: { payload: mulawData.toString('base64') }
          }))
        }
      } else {
        // only the event type is logged: Deepgram messages contain the call transcript
        try {
          var event = JSON.parse(data.toString())
          console.log('Deepgram event:', event.type)
          if (event.type === 'SettingsApplied') {
            console.log('Settings applied, ready')
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
      var r = reason && reason.length > 0 ? reason.toString() : '(empty)'
      console.log('Deepgram closed:', code, r)
      deepgramReady = false
    })
  }

  twilioWs.on('message', function(rawData) {
    try {
      var msg = JSON.parse(rawData.toString())

      if (msg.event === 'start') {
        if (authenticated) return
        var params = (msg.start && msg.start.customParameters) || {}
        var callSid = String((msg.start && msg.start.callSid) || '')
        var type = params.type === 'outbound' ? 'outbound' : 'inbound'

        if (!callSid || params.callSid !== callSid || !verifyStreamToken(params.token, callSid, type)) {
          console.warn('Rejected stream without a valid token')
          twilioWs.close(1008, 'unauthorized')
          return
        }
        if (activeCalls >= MAX_CONCURRENT_CALLS) {
          console.warn('Rejected stream: too many concurrent calls')
          twilioWs.close(1013, 'busy')
          return
        }

        authenticated = true
        activeCalls++
        clearTimeout(authTimer)
        callType = type
        streamSid = msg.start.streamSid
        callTimer = setTimeout(function() { twilioWs.close() }, MAX_CALL_MS)
        console.log('Stream started:', streamSid, 'type:', callType)
        startAgent()
        return
      }

      if (!authenticated) return

      if (msg.event === 'media') {
        // mulaw from Twilio, converted to linear16 for Deepgram
        var mulawBuf = Buffer.from(msg.media.payload, 'base64')
        var linear16Buf = mulawToLinear16(mulawBuf)
        if (deepgramReady && deepgramWs && deepgramWs.readyState === WebSocket.OPEN) {
          deepgramWs.send(linear16Buf)
        } else {
          audioQueue.push(linear16Buf)
          if (audioQueue.length > 100) audioQueue.shift()
        }
      }
      if (msg.event === 'stop') {
        console.log('Stream stopped')
        cleanup()
      }
    } catch(e) {}
  })

  twilioWs.on('close', function() {
    console.log('Twilio disconnected')
    cleanup()
  })

  twilioWs.on('error', function(err) {
    console.error('Twilio error:', err.message)
  })
})

app.post('/voice', function(req, res) {
  // only requests signed by Twilio are accepted
  if (!validTwilioRequest(req)) {
    console.warn('Rejected /voice request with invalid Twilio signature. host:', req.headers.host, 'url:', req.originalUrl, 'PUBLIC_URL set:', !!process.env.PUBLIC_URL)
    return res.status(403).send('Forbidden')
  }

  var publicUrl = process.env.PUBLIC_URL || ('https://' + req.headers.host)
  var wsUrl = publicUrl.replace('https://', 'wss://')
  var type = req.query.type === 'outbound' ? 'outbound' : 'inbound'
  var callSid = String(req.body.CallSid || '').replace(/[^A-Za-z0-9]/g, '')
  var token = signStreamToken(callSid, type)

  if (!token) {
    console.error('VOICE_STREAM_SECRET is missing or shorter than 32 characters')
    return res.status(500).send('Server not configured')
  }

  console.log('Incoming call, type:', type)
  res.type('text/xml')
  res.send(
    '<?xml version="1.0" encoding="UTF-8"?><Response><Connect>' +
    '<Stream url="' + wsUrl + '/stream">' +
    '<Parameter name="token" value="' + token + '"/>' +
    '<Parameter name="callSid" value="' + callSid + '"/>' +
    '<Parameter name="type" value="' + type + '"/>' +
    '</Stream></Connect></Response>'
  )
})

app.get('/health', function(req, res) {
  res.json({ status: 'ok' })
})

var PORT = process.env.PORT || 3001
server.listen(PORT, function() {
  console.log('Voice server running on port ' + PORT)
})
