import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
    try {
      const products = await prisma.products.findMany();
      return NextResponse.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
