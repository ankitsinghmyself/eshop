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
  // If no token and the request is for the /admin page, redirect to the sign-in page
  if (!token && pathname === '/admin') {
    const url = req.nextUrl.clone();
    url.pathname = '/signin';
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Check if the token contains isAdmin field and if it's true for /admin page
  if (pathname === '/admin') {
    if (token && token.isAdmin) {
      // Allow the request to proceed if the user is an admin
      return NextResponse.next();
    } else {
      // Redirect to an access denied page if the user is not an admin
      const url = req.nextUrl.clone();
      url.pathname = '/access-denied'; // or any page you want to redirect non-admins to
      return NextResponse.redirect(url);
    }
  }

  // Allow the request to proceed for other public pages
  return NextResponse.next();
}
