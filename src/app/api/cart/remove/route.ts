// app/api/cart/remove/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import authOptions from '@/lib/authOptions';

// Define the CartItem type based on your schema
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { itemId }: { itemId: number } = await req.json();

    // Get the session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.user.id;

    // Retrieve the current cart items for the user
    const cart = await prisma.cart.findUnique({
      where: { userId },
      select: { items: true },
    });

    // Ensure cart and items are defined
    if (!cart || !cart.items) {
      return NextResponse.json({ error: 'Cart not found or empty' }, { status: 404 });
    }

    // Assert items as an array of CartItem
    const items: CartItem[] = Array.isArray(cart.items) ? cart.items : JSON.parse(cart.items as string);

    const itemIndex = items.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
    }

    const item = items[itemIndex];

    // Update cart based on item quantity
    let updatedItems: CartItem[];
    if (item.quantity > 1) {
      updatedItems = items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      );
    } else {
      updatedItems = items.filter((item) => item.id !== itemId);
    }

    // Update the cart in the database
    await prisma.cart.update({
      where: { userId },
      data: { items: JSON.stringify(updatedItems) }, 
    });

    return NextResponse.json({ message: 'Item updated' }, { status: 200 });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
