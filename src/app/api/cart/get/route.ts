import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET!; // Ensure this is set in your environment variables

export async function GET(req: NextRequest) {
  // Extract the token from the request headers
  const cookies = parse(req.headers.get('cookie') || '');

  // Get token from parsed cookies
  const token = cookies.token;

  // Check if the token exists
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify the token
  const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
  const userId = decoded.id;

  // Fetch cart from the database
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  // Return cart items or empty array if no cart found
  return NextResponse.json({ items: cart ? cart.items : [] });
}
