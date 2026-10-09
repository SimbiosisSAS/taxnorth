// Signed, expiring tokens for cookies (admin session, CPA portal session).
// Uses Web Crypto so it works in both the Edge middleware and Node routes.
// Requires SESSION_SECRET (32+ chars). If it is missing, everything fails closed.

const encoder = new TextEncoder()

function getSecret(): string | null {
  const secret = process.env.SESSION_SECRET
  return secret && secret.length >= 32 ? secret : null
}

async function hmacHex(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

// Constant-time string comparison (no early exit on the first different char).
export function safeEqual(a: string, b: string): boolean {
  const length = Math.max(a.length, b.length)
  let diff = a.length ^ b.length
  for (let i = 0; i < length; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0)
  }
  return diff === 0
}

// Token format: <subject>.<expiresAtSeconds>.<hmac>. The scope ("admin", "pro")
// is part of the signed data, so a token for one scope never works for another.
export async function signToken(
  scope: string,
  subject: string,
  ttlSeconds: number
): Promise<string | null> {
  const secret = getSecret()
  if (!secret || !subject || subject.includes('.')) return null
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds
  const signature = await hmacHex(secret, `${scope}.${subject}.${exp}`)
  return `${subject}.${exp}.${signature}`
}

// Returns the subject if the token is valid and not expired, otherwise null.
export async function verifyToken(
  scope: string,
  token: string | undefined | null
): Promise<string | null> {
  const secret = getSecret()
  if (!secret || !token) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [subject, expText, signature] = parts
  const exp = Number(expText)
  if (!subject || !Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null
  const expected = await hmacHex(secret, `${scope}.${subject}.${exp}`)
  return safeEqual(signature, expected) ? subject : null
}
