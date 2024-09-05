import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!; // Ensure this is set in your environment variables

export async function GET(req: NextRequest) {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the header

    // Verify the token
    try {
      jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Authenticated' });
  } catch (error) {
    console.error('Error checking authentication:', error);
    return NextResponse.json({ message: 'Error checking authentication' }, { status: 500 });
  }
}
