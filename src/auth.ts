import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
//import { z } from 'zod';

import { getUserByPhone } from "@/lib/server-actions"

// interface User extends NsxtAuth.User {
//   //id: Number,
//   //name: String,
//   phone: String
// }

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  
  providers: [
    Credentials({
   
      credentials: {
        phone: { label: 'phone', type: 'text' },
        //password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
       let { phone } = credentials
          phone = (credentials.phone as String).replace(/[^\d|\+]/g, '')
        const user = await getUserByPhone(phone) as object | null 
        if (!user) throw new Error("Invalid credentials.")
        console.log(" b ", user)
        return user 
       },
    }),
  ],
});