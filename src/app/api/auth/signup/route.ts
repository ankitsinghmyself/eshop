import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password } = await req.json();

  try {
    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // If user already exists, return a conflict response
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 } // Conflict status code
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    // Auto-login: Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin || false,
        isSuperAdmin: user.isSuperAdmin || false,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({ message: "Account created successfully!" }, { status: 201 });
    
    // Set the token in cookies
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
      path: "/",
      maxAge: 3600, // 1 hour
    });

    return response;
  } catch (error) {
    console.error('Error during user creation:', error);
    return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
  }
}
