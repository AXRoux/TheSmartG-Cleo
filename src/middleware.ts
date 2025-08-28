import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware completely for health checks and API routes
  if (pathname === '/' || pathname === '/api/health' || pathname === '/api/fallback' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check if the request is for a dashboard page
  if (pathname.startsWith('/dashboard')) {
    const authToken = request.cookies.get('auth-token');
    const userId = request.cookies.get('user-id');

    if (!authToken || !userId || authToken.value.length < 10) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
