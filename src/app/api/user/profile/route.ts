import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'; // For handling cookies in Edge API routes

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {

    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as any;
    const userId = decoded.id;

    // Fetch user data from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true }, // Customize as needed
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
 
}
