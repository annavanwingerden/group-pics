import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;

  // If there's no session cookie and the user is trying to access a protected route
  if (!sessionCookie && isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = ['/dashboard', '/gallery', '/groups', '/api/images', '/api/image'];
  return protectedRoutes.some(route => pathname.startsWith(route));
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/gallery/:path*',
    '/groups/:path*',
    '/api/images/:path*',
    '/api/image/:path*',
  ],
}; 