// app/api/auth/status/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import { PrismaClient } from '@prisma/client'; // Import PrismaClient

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Ensure you have a secret key

export async function GET(request: NextRequest) {
    // Extract cookies from the request
    const cookies = request.headers.get('cookie');
    const parsedCookies = cookies ? parse(cookies) : {};
    
    const token = parsedCookies.token; // Adjust the cookie name as needed

    if (!token) {
      return NextResponse.json({ isAuthenticated: false });
    }

    // Decode and verify the token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, JWT_SECRET) as { id: string; email: string; isAdmin: boolean };
    } catch (error) {
      return NextResponse.json({ isAuthenticated: false });
    }

    // Validate the decoded token's user information against the database
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });

    if (user && user.email === decodedToken.email && user.isAdmin === decodedToken.isAdmin) {
      return NextResponse.json({ isAuthenticated: true });
    } else {
      return NextResponse.json({ isAuthenticated: false });
    }
}
