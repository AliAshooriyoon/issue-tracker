import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Check for NextAuth session token cookie (adjust the cookie name if different)
  const token =
    req.cookies.get('next-auth.session-token') ||
    req.cookies.get('__Secure-next-auth.session-token');

  if (!token) {
    // Redirect to sign-in if not authenticated
    const signInUrl = new URL('/api/auth/signin', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Allow the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/issues/:path*'], // applies to /issues and all subpaths
};
