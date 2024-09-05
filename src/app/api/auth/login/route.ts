import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET!;

interface UserWithAdmin {
  id: string;
  email: string;
  password: string;
  isAdmin: boolean; 
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ status: 404, message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json({ status: 401, message: 'Invalid password or email' });
    }

    // Type assertion for user to ensure isAdmin exists
    const typedUser = user as UserWithAdmin;

    const token = jwt.sign(
      {
        id: typedUser.id,
        email: typedUser.email,
        isAdmin: typedUser.isAdmin, 
      },
      SECRET_KEY,
      { expiresIn: '1h' } 
    );

    return NextResponse.json({ token, message: 'Login successful' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
