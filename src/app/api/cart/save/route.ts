import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { CartItem } from "@/types";

const SECRET_KEY = process.env.JWT_SECRET!;

// Type guard to check if a value is an array of CartItem
function isCartItemArray(value: any): value is CartItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item: any) =>
        item &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        typeof item.img === "string" &&
        typeof item.quantity === "number"
    )
  );
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { items }: { items: any[] } = await req.json();

    const cookies = parse(req.headers.get("cookie") || "");
    const token = cookies.token;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const userId = decoded.id;

    // Fetch existing cart
    const existingCart = await prisma.cart.findUnique({
      where: { userId },
    });

    // Initialize existing items if not present
    const existingItems = (existingCart?.items as any[]) || [];

    // Ensure existingItems is an array of CartItem
    if (!isCartItemArray(existingItems)) {
      return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
    }

    // Create a map to track item quantities
    const itemMap = new Map<string, any>();

    // Add existing items to the map
    existingItems.forEach((item: any) => itemMap.set(item.id, item));

    // Add new items to the map, updating quantities if the item already exists
    items.forEach((item: any) => {
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
    const updatedItems: any[] = Array.from(itemMap.values());

    // Upsert the cart with JSON items
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: { items: updatedItems },
      create: {
        userId,
        items: updatedItems,
      },
    });

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error saving cart items:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
