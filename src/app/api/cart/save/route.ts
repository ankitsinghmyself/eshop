import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import authOptions from '@/lib/authOptions';
import { CartItem } from '@/types';

// Type guard to check if a value is an array of CartItem
function isCartItemArray(value: any): value is CartItem[] {
  return Array.isArray(value) && value.every(
    (item: any) => item &&
    typeof item.id === 'number' &&
    typeof item.name === 'string' &&
    typeof item.price === 'number' &&
    typeof item.quantity === 'number'
  );
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { items }: { items: CartItem[] } = await req.json();

    // Get the session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch existing cart
    const existingCart = await prisma.cart.findUnique({
      where: { userId },
    });

    // Initialize existing items if not present
    const existingItems = existingCart?.items || [];

    // Ensure existingItems is an array
    if (!isCartItemArray(existingItems)) {
      return NextResponse.json({ error: 'Invalid cart data' }, { status: 400 });
    }

    // Create a map to track item quantities
    const itemMap = new Map<number, CartItem>();

    // Add existing items to the map
    existingItems.forEach(item => itemMap.set(item.id, item));

    // Add new items to the map, updating quantities if the item already exists
    items.forEach(item => {
      if (itemMap.has(item.id)) {
        const existingItem = itemMap.get(item.id)!;
        itemMap.set(item.id, {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity,
        });
      } else {
        itemMap.set(item.id, item);
      }
    });

    // Convert map to array
    const updatedItems = Array.from(itemMap.values());

    // Upsert the cart
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: { items: updatedItems },
      create: { userId, items: updatedItems },
    });

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error('Error saving cart items:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
