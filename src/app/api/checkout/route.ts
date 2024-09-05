import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!; // Ensure this is set in your environment variables

export async function POST(req: NextRequest) {
  try {
    const { address }: { address: string } = await req.json();

    // Extract the token from the request headers
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the header

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const userId = decoded.id;

    // Store the order and address in the database
    await prisma.order.create({
      data: {
        userId,
        address,
        items: JSON.stringify([]), // Assuming items will be cleared after checkout
      },
    });

    return NextResponse.json({ message: 'Checkout successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during checkout:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
