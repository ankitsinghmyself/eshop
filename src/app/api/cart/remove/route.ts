import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { CartItem } from "@/types/types";

const SECRET_KEY = process.env.JWT_SECRET!;

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get('itemId');
    
    if (!itemId) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

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

    if (!existingCart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Type the items correctly
    const items: CartItem[] = existingCart.items as CartItem[];

    // Filter out the item to remove
    const updatedItems = items.filter((item: CartItem) => item.id !== itemId);

    // Update the cart with the new items array
    const cart = await prisma.cart.update({
      where: { userId },
      data: { items: updatedItems }, // Ensure this is still an array
    });

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
