import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
    const products = await prisma.products.findMany();
    return NextResponse.json({ products });
}
