import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!); // Ensure your secret key is a Uint8Array

interface JwtPayload {
  id: string;
  email: string;
  isAdmin: boolean; // Ensure this matches the payload structure
}

// Type guard to verify JwtPayload structure
function isJwtPayload(payload: any): payload is JwtPayload {
  return payload &&
         typeof payload.id === 'string' &&
         typeof payload.email === 'string' &&
         typeof payload.isAdmin === 'boolean';
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('token')?.value; // Access token from cookies and ensure it's a string

  // Skip middleware for certain paths
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/signup') ||
    pathname === '/' ||
    pathname === '/cart' ||
    pathname.startsWith('/_next/static/')
  ) {
    return NextResponse.next();
  }

  if (!token) {
    // Token is missing, redirect to sign-in page
    const url = req.nextUrl.clone();
    url.pathname = '/signin';
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  try {
    // Verify and decode the token
    const { payload } = await jwtVerify(token, SECRET_KEY);

    if (!isJwtPayload(payload)) {
      throw new Error('Invalid token payload');
    }

    // Redirect non-admin users away from admin pages
    if (pathname.startsWith('/admin')) {
      if (payload.isAdmin) {
        return NextResponse.next();
      } else {
        const url = req.nextUrl.clone();
        url.pathname = '/access-denied'; // Redirect non-admins
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    // Handle token verification errors
    console.error('Token verification failed:', error);
    const url = req.nextUrl.clone();
    url.pathname = '/signin';
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
}
