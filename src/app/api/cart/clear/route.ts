import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next'; // Use getServerSession for NextAuth
import prisma from '@/lib/prisma';
import authOptions from '@/lib/authOptions'; // Import authOptions correctly

export async function POST(req: NextRequest) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.user.id; // Ensure 'id' is correct as per your schema

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
