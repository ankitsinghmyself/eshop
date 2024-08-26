import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import authOptions from '@/lib/authOptions';
import { OrderPayload } from '@/types';

// Define the CartItem type based on your schema
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const { items, address }: OrderPayload = await req.json();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.user.id;

    // Convert the items array to a JSON string
    const itemsJson = JSON.stringify(items);

    // Create a new order
    const order = await prisma.order.create({
      data: {
        userId,
        items: itemsJson,  // Store the JSON string in the database
        address,
      },
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
