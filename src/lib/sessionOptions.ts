// lib/sessionOptions.ts

import { NextAuthOptions } from 'next-auth';
import authOptions from './authOptions'; // Adjust the path if necessary

export const sessionOptions: NextAuthOptions = {
  providers: authOptions.providers,
  adapter: authOptions.adapter,
  session: authOptions.session,
  callbacks: authOptions.callbacks,
  secret: authOptions.secret,
};
