import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the path as needed
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export async function GET() {
  try {
    const products = await prisma.products.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { name, details, price, img, quantity, isActive } = await request.json();
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the header

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const authorId = decoded.id;

    if (!name || !price || !img || !quantity) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newProduct = await prisma.products.create({
      data: {
        name,
        details,
        price,
        img,
        quantity,
        isActive,
        authorId, // Corrected this line
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { id, updateData } = await request.json();
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the header

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const authorId = decoded.id;

    if (!id || !updateData) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const updatedProduct = await prisma.products.update({
      where: { id },
      data: {
        ...updateData,
        authorId, // Corrected this line
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { productId } = await request.json();
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the header

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

    if (!productId) {
      return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
    }

    await prisma.products.delete({
      where: { id: productId },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
