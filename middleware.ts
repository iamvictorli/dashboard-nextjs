// https://nextjs.org/docs/app/building-your-application/authentication#optimistic-checks-with-middleware-optional
import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

import { isAuthenticated } from '@/lib/session'

// protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login']

export default async function middleware(req: NextRequest) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const isAuth = await isAuthenticated()

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !isAuth) {
    const redirectUrl = new URL('/login', req.nextUrl)
    // set redirect URL
    redirectUrl.searchParams.set('redirectUrl', path)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute
    && isAuth
    && !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
