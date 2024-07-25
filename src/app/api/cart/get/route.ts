// app/api/cart/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { sessionOptions } from '@/lib/sessionOptions'; // Adjust according to your file structure

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Retrieve session
    const session = await getServerSession(sessionOptions);

    // Check if session and user exist
    if (!session || !session.user) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    // Fetch cart from database
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    // Return cart items or empty array if no cart found
    return NextResponse.json({ items: cart ? cart.items : [] });
  } catch (error) {
    console.error('Error retrieving cart:', error);
    return NextResponse.json({ message: 'Error retrieving cart' }, { status: 500 });
  }
}
