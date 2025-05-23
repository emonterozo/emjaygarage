import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = [
  '/admin/home',
  '/admin/dashboard',
  '/admin/add',
  '/admin/products',
  '/admin/edit',
];

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth_user_id');

  const isProtectedRoute = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtectedRoute && !authCookie) {
    // Redirect to login if no auth cookie found
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}
