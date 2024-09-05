import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  // Extract the token from the Authorization header
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the header

  // Verify the token
  jwt.verify(token, SECRET_KEY);

  return NextResponse.json({ message: 'Authenticated' });
}
