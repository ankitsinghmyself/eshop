import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function POST(request: NextRequest) {
  try {
    // Extract cookies from the request
    const cookies = request.headers.get('cookie');
    const parsedCookies = cookies ? parse(cookies) : {};
    const token = parsedCookies.token;

    // If there is a token, proceed to remove it
    if (token) {
      const response = NextResponse.json({ message: 'Logged out successfully' });
      
      // Clear the token from cookies
      response.cookies.set('token', '', {
        expires: new Date(0), // Set expiration date to a past date to delete it
        path: '/',            // Ensure the path matches the path where the cookie was set
      });
      
      return response;
    } else {
      return NextResponse.json({ message: 'No token found' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
