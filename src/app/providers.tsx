//'use client' NextJS 15
import { HeroUIProvider } from "@heroui/system";
import { SessionProvider } from "next-auth/react";

export default async function Providers({ children }: {
  children: React.ReactNode,
})
{
   return (
    <HeroUIProvider>
       {/* <SessionProvider */}
        {/* // refetchInterval={5} */}
       {/* > */}
        {children}
      {/* </SessionProvider> */}
    </HeroUIProvider>
  )
}



