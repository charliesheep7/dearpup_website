import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * DearPup publishes in English only. This middleware used to negotiate a
 * locale from Accept-Language and redirect Arabic-speaking visitors to /ar,
 * but that tree was inherited from the DeenUp template with DeenUp's copy
 * still in it and no dog-care content behind it, so it has been removed.
 * The headers stay because layouts and components read them.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set('x-locale', 'en')
  requestHeaders.set('x-pathname', pathname)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set('x-locale', 'en')
  response.headers.set('x-pathname', pathname)

  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!api|_next|static|.*\\..*|feed.xml).*)',
  ],
}
