import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

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
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid password or email" },
        { status: 401 }
      );
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
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({ message: "Sign in successful!" }, { status: 200 });
    
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
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
