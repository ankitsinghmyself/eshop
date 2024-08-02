import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma'; // Adjust the path as needed
import { getServerSession } from 'next-auth/next';
import authOptions from '@/lib/authOptions'; // Ensure this file is exporting your NextAuth configuration
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { name, username, email, password, isAdmin } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!name || !username || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        isAdmin,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { id, name, username, email, password, isAdmin } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // Hash the password if provided
    const data: any = { name, username, email, isAdmin };
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      if (!id) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
      }
  
      await prisma.user.delete({
        where: { id },
      });
  
      // Send a response with no content
      return new NextResponse(null, { status: 204 });
    } catch (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }