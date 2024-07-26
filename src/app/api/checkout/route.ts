import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import authOptions from '@/lib/authOptions';

export async function POST(req: NextRequest) {
  try {
    const { address }: { address: string } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.user.id;

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
