import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

interface JwtPayload {
  id: string;
  email: string;
  isAdmin: boolean;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for certain paths
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname === "/" ||
    pathname === "/cart" ||
    pathname.startsWith('/_next/static/')
  ) {
    return NextResponse.next();
  }

  // Extract the token from the Authorization header
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Redirect to sign-in page if no token is provided
    const url = req.nextUrl.clone();
    url.pathname = "/signin";
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' from the start

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    // Attach user information to the request for further use
    (req as any).user = decoded;

    // Redirect non-admin users away from admin pages
    if (pathname.startsWith("/admin")) {
      if (decoded.isAdmin) {
        return NextResponse.next();
      } else {
        const url = req.nextUrl.clone();
        url.pathname = "/access-denied"; // or any page you want to redirect non-admins to
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    // Handle token verification errors (e.g., expired token)
    console.error("Token verification failed:", error);
    const url = req.nextUrl.clone();
    url.pathname = "/signin";
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
}
