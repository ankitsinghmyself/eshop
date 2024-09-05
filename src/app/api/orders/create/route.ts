import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!; // Ensure this is set in your environment variables

// Define the CartItem type based on your schema
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderPayload {
  items: CartItem[];
  address: string;
}

export async function POST(req: NextRequest) {
  try {
    const { items, address }: OrderPayload = await req.json();

    // Extract the token from the request headers
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the header

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const userId = decoded.id;

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
