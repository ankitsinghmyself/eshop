import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure this points to your Prisma client instance
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!; // Ensure this is set in your environment variables

export async function POST(req: NextRequest) {
  try {
    // Get the token from the request headers
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the header

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const userId = decoded.id;

    // Clear the cart
    await prisma.cart.update({
      where: { userId },
      data: { items: [] }, // Clear items
    });

    return NextResponse.json({ message: 'Cart cleared' }, { status: 200 });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
