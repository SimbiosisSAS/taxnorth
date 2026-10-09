import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/adminAuth'

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

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
