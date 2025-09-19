import { NextResponse } from 'next/server'
import { getSessionCookie } from "better-auth/cookies"
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)
  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/analytics', '/admin']

  // Check if the current path is a protected route
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // If no session cookie, redirect to login
    if (!sessionCookie) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // For auth pages, check if user has a session and redirect accordingly
  if (sessionCookie && (pathname === '/login' || pathname === '/signup')) {
    // For now, just redirect to home since we can't validate session in middleware
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
}