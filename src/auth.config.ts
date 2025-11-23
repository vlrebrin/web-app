import { request } from 'http';
//import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import { NextResponse, NextRequest } from "next/server";
import type { User } from 'next-auth';
import { json } from 'stream/consumers';
import {redirect } from 'next/navigation'

// type User = {
//   id: Number,
//   name: String,
//   phone: String
// }

export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/logout'
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    //updateAge:1
  },

  callbacks: {
    
    // authorized({ auth, request }) {
    //   //async authorized({ auth, request:{nextUrl} }) {
    //   const isLoggedIn = !!auth?.user;
    
    //   const url = request.nextUrl
      
    //   if (url.pathname === '/login') {
    //     const r=1
    //   }
     
    //   if (request.method === "POST") {
    //     // const  {authToken}  = (await request.json()) ?? {}
    //     //const bd =request.formData
    //     const session =auth
    //     // If the request has a valid auth token, it is authorized
    //     //const valid = await authToken.validateAuthToken(authToken)
    //     const valid=true
    //     if (valid) return true
    //     return NextResponse.json("Invalid auth token", { status: 401 })
    //   }
        
    //     //redirect('/')
    //     //return true
    //   //return NextResponse.redirect('/checks')// json(session)
    //   return true  //isLoggedIn
    //  },
        


      // const pathname = url.pathname
      // const isOnLogin = url.pathname.startsWith('/login');
      // if (isLoggedIn){ // && isOnLogin) {
      //   console.log(' redirect to   /logout')
      //   //return Response.redirect(new URL('/', nextUrl))
      // }
      // console.log('isLoggedIn = ', isLoggedIn)
      // console.log('isOnLogin = ', isOnLogin)

            
       //return isLoggedIn
    //},

    jwt({ token, user }) {
      
      if (user) { // User is available during sign-in
        token.id = user.id,
        token.name = user.name,
        token.phone=user.phone // user.phone ||null 
      }
      return token
    },

    session({ session, token }) {
      session.user.name = token.name
      session.user.phone = token.phone
      //console.log(session.user.name)
      return session
    },
  
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;