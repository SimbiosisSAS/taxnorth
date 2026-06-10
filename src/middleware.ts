import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Proteger todas las rutas /admin excepto el login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const adminCookie = req.cookies.get('taxnorth_admin')?.value

    if (adminCookie !== process.env.ADMIN_KEY) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}