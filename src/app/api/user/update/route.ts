import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { address }: { address: string } = await req.json();

    // Extract the token from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the header

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const userId = decoded.id;

    // Update user address in the database
    await prisma.user.update({
      where: { id: userId },
      data: { email: address }, // Update the user's email address
    });

    return NextResponse.json({ message: 'Address updated' }, { status: 200 });
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
