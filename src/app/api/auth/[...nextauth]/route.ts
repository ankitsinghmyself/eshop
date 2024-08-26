import NextAuth, { NextAuthOptions, User } from 'next-auth';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

interface CustomUser extends User {
  id: string;
  isAdmin: boolean;
}

interface CustomToken {
  id?: string;
  isAdmin?: boolean;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user && credentials?.password) {
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (isValidPassword) {
            return user as PrismaUser;
          }
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as PrismaUser).id;
        token.isAdmin = (user as PrismaUser).isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      const typedToken = token as CustomToken;
      if (typedToken && typeof typedToken.id === 'string') {
        (session.user as CustomUser).id = typedToken.id;
      }
      (session.user as CustomUser).isAdmin = typedToken.isAdmin ?? false;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function GET(req: NextRequest) {
  const response = await NextAuth(authOptions);
  return response;
}

export async function POST(req: NextRequest) {
  const response = await NextAuth(authOptions);
  return response;
}
