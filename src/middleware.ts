import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/adminAuth'

const SUPPORTED_LOCALES = ['fr', 'es', 'zh', 'ar', 'pa', 'ro', 'uk', 'ja', 'ko', 'fa', 'tr']
const LOCALE_COOKIE = 'taxnorth_locale'

function getPreferredLocale(req: NextRequest): string | null {
  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value

  if (cookieLocale) {
    if (cookieLocale === 'en') return null
    if (SUPPORTED_LOCALES.includes(cookieLocale)) return cookieLocale
  }

  const acceptLanguage = req.headers.get('accept-language') || ''
  const languages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase().substring(0, 2))

  for (const lang of languages) {
    if (SUPPORTED_LOCALES.includes(lang)) {
      return lang
    }
  }

  return null
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login'
  const isAdminApi = pathname.startsWith('/api/admin') && pathname !== '/api/admin/login'

  if (isAdminPage || isAdminApi) {
    if (!(await isAdminRequest(req))) {
      if (isAdminApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  if (pathname === '/') {
    const locale = getPreferredLocale(req)
    if (locale) {
      return NextResponse.redirect(new URL(`/${locale}`, req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/'],
}