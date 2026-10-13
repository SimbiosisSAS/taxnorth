const crypto = require('crypto')

function safeEqual(a, b) {
  var ab = Buffer.from(String(a))
  var bb = Buffer.from(String(b))
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb)
}

// Twilio request signature (X-Twilio-Signature) for POST webhooks:
// base64( HMAC-SHA1( authToken, fullUrl + each form field name+value sorted by name ) )
function expectedTwilioSignature(authToken, url, params) {
  var keys = Object.keys(params || {}).sort()
  var data = url + keys.map(function (k) { return k + params[k] }).join('')
  return crypto.createHmac('sha1', authToken).update(data).digest('base64')
}

// Fails closed: no TWILIO_AUTH_TOKEN or no signature header means rejected.
function validTwilioRequest(req) {
  var authToken = process.env.TWILIO_AUTH_TOKEN
  var signature = req.headers['x-twilio-signature']
  if (!authToken || !signature) return false

  var bases = []
  if (process.env.PUBLIC_URL) bases.push(process.env.PUBLIC_URL.replace(/\/$/, ''))
  if (req.headers.host) bases.push('https://' + req.headers.host)

  return bases.some(function (base) {
    return safeEqual(signature, expectedTwilioSignature(authToken, base + req.originalUrl, req.body || {}))
  })
}

// Short-lived token that /voice puts in the TwiML and /stream checks on the "start" message.
// Only a call that really went through the signed Twilio webhook can open an audio stream.
function streamSecret() {
  var s = process.env.VOICE_STREAM_SECRET
  return s && s.length >= 32 ? s : null
}

function tokenSignature(secret, callSid, type, exp) {
  return crypto.createHmac('sha256', secret).update(callSid + '|' + type + '|' + exp).digest('hex')
}

function signStreamToken(callSid, type) {
  var secret = streamSecret()
  if (!secret || !callSid) return null
  var exp = Math.floor(Date.now() / 1000) + 120
  return exp + '.' + tokenSignature(secret, callSid, type, exp)
}

function verifyStreamToken(token, callSid, type) {
  var secret = streamSecret()
  if (!secret || typeof token !== 'string' || !callSid) return false
  var parts = token.split('.')
  if (parts.length !== 2) return false
  var exp = Number(parts[0])
  if (!isFinite(exp) || exp < Date.now() / 1000) return false
  return safeEqual(parts[1], tokenSignature(secret, callSid, type, exp))
}

module.exports = { safeEqual, expectedTwilioSignature, validTwilioRequest, signStreamToken, verifyStreamToken }
