import { signToken, verifyToken, safeEqual } from './session'

export const ADMIN_COOKIE = 'taxnorth_admin'
export const ADMIN_TTL_SECONDS = 8 * 60 * 60

// Works with NextRequest (req.cookies.get) in API routes and middleware.
type CookieSource = { cookies: { get(name: string): { value: string } | undefined } }

export async function verifyAdminCookieValue(value: string | undefined | null): Promise<boolean> {
  return (await verifyToken('admin', value)) === 'admin'
}

export async function isAdminRequest(req: CookieSource): Promise<boolean> {
  return verifyAdminCookieValue(req.cookies.get(ADMIN_COOKIE)?.value)
}

// Constant-time check of the login key. Fails closed if ADMIN_KEY is not set.
export function checkAdminKey(input: unknown): boolean {
  const expected = process.env.ADMIN_KEY
  if (!expected || typeof input !== 'string') return false
  return safeEqual(input, expected)
}

export async function createAdminCookieValue(): Promise<string | null> {
  return signToken('admin', 'admin', ADMIN_TTL_SECONDS)
}
