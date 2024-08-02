// app/api/products/route.ts
import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma'; // Adjust the path as needed
import { getServerSession } from 'next-auth/next';
import authOptions from '@/lib/authOptions'; // Ensure this file is exporting your NextAuth configuration

export async function GET() {
  try {
    const products = await prisma.products.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { name, details, price, img, quantity, isActive } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
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
        authorId: session.user.id,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { id, updateData } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!id || !updateData) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const updatedProduct = await prisma.products.update({
      where: { id },
      data: {
        ...updateData,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { productId } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
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
