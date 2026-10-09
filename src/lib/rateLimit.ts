// Simple in-memory rate limiter. On serverless (Vercel) each instance keeps its
// own counters, so this slows brute force and abuse but is NOT a hard limit.
// For a hard limit use Vercel Firewall rate limiting or Upstash/Vercel KV.

const hits = new Map<string, number[]>()

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const recent = (hits.get(key) || []).filter(t => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)

  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every(t => now - t >= windowMs)) hits.delete(k)
    }
  }
  return true
}

export function clientIp(req: { headers: Headers }): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}
