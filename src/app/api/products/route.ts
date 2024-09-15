import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust the path as needed
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret"; // Ensure a fallback

// Get a specific product by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("id");

  if (!productId) {
    return NextResponse.json(
      { message: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Create a new product
export async function POST(request: NextRequest) {
  try {
    const { name, details, price, img, quantity, isActive } =
      await request.json();

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const authorId = decoded.id;

    if (!name || !price || !img || !quantity) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProduct = await prisma.products.create({
      data: {
        name,
        details,
        price,
        img,
        quantity,
        isActive,
        authorId,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update an existing product
export async function PUT(request: NextRequest) {
  try {
    const { id, updateData } = await request.json();

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const authorId = decoded.id;

    if (!id || !updateData) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.products.update({
      where: { id },
      data: {
        ...updateData,
        authorId,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete a product
export async function DELETE(request: NextRequest) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    await prisma.products.delete({
      where: { id: productId },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
