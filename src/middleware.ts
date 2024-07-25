// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Extract the pathname of the request
  const { pathname } = req.nextUrl;

  // Skip middleware for certain paths (e.g., public pages)
  if (pathname.startsWith('/api') || pathname.startsWith('/signin')) {
    return NextResponse.next();
  }

  // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token and the request is for a protected page, redirect to the sign-in page
  if (!token && pathname === '/dashboard') {
    const url = req.nextUrl.clone();
    url.pathname = '/signin';
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // If token exists or the request is for public pages, allow the request to proceed
  return NextResponse.next();
}
