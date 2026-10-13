import twilio from 'twilio'

// Turns the form body Twilio posts into a plain object of strings.
export function formToParams(form: FormData): Record<string, string> {
  const params: Record<string, string> = {}
  form.forEach((value, key) => {
    params[key] = typeof value === 'string' ? value : ''
  })
  return params
}

// Checks the X-Twilio-Signature header. Fails closed if TWILIO_AUTH_TOKEN is missing.
// The signature covers the full URL (query string included) and every form field,
// so nobody can forge a request or alter parameters such as `history`.
export function validateTwilioRequest(req: Request, params: Record<string, string>): boolean {
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const signature = req.headers.get('x-twilio-signature')
  if (!authToken || !signature) return false

  const url = new URL(req.url)
  const site = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.taxnorth.ca').replace(/\/$/, '')
  const candidates = new Set([req.url, `${site}${url.pathname}${url.search}`])

  for (const candidate of candidates) {
    if (twilio.validateRequest(authToken, signature, candidate, params)) return true
  }
  return false
}
