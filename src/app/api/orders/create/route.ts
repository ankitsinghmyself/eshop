// app/api/orders/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import authOptions from '@/lib/authOptions';
import { OrderPayload } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { items, address }: OrderPayload = await req.json();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.user.id;

    // Create a new order
    const order = await prisma.order.create({
      data: {
        userId,
        items,
        address,
      },
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
