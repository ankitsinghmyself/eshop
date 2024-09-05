import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the header

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const userId = decoded.id;

    // Fetch user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true }, // Adjust as needed for your logic
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ address: user.email }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user address:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
