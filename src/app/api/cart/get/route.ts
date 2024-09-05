import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET!; // Ensure this is set in your environment variables

export async function GET(req: NextRequest) {
  try {
    // Extract the token from the request headers
    const authHeader = req.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Handle non-logged-in users by returning an empty cart or a specific message
      return NextResponse.json({ items: [] }); // or { message: 'Unauthorized', items: [] } if you prefer
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the header

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const userId = decoded.id;

    // Fetch cart from the database
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    // Return cart items or empty array if no cart found
    return NextResponse.json({ items: cart ? cart.items : [] });
  } catch (error) {
    console.error('Error retrieving cart:', error);
    return NextResponse.json({ message: 'Error retrieving cart' }, { status: 500 });
  }
}
