'use client'
//import { TelegramProvider } from './telegram.provider'
//import { TelegramProvider } from '@/telegram/provider'
//import { HeroUIProvider } from "@heroui/react"
//import { HeroUIProvider } from '@heroui/react'
import { HeroUIProvider } from "@heroui/system";
import { SessionProvider } from "next-auth/react";
//import type { AppProps } from "next/app"
//import type { Session } from "next-auth"

// type Props = {
//   children?: React.ReactNode,
//   pageProp: { session, ...pageProp },
// };


export default function Providers(
  {
    //children,
    Component,
    pageProps: { session, ...pageProps }

  } // { children: React.ReactNode, pageProp: AppProps },

)
{
  return (
    
    <HeroUIProvider>
      <SessionProvider session={session}>
      {/* <NextAuthProvider> */}
      {/* <TelegramProvider> */}
        {/* {children} */}
        <Component {...pageProps}/>
      {/* </TelegramProvider > */}
      {/* </NextAuthProvider> */}
      </SessionProvider>  
    </HeroUIProvider>
    

  )
}


//const  NextAuthProvider = ({ children }: Props) => {
// const HeroUIProvider=({children}:Props)=>{
// return <SessionProvider>{children}</SessionProvider>;
// };



