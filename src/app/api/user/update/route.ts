import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import authOptions from '@/lib/authOptions';

export async function POST(req: NextRequest) {
  try {
    const { address }: { address: string } = await req.json();

    // Get the session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.user.id;

    // Update user address in the database
    await prisma.user.update({
      where: { id: userId },
      data: { email: address }, //fix here
    });

    return NextResponse.json({ message: 'Address updated' }, { status: 200 });
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
