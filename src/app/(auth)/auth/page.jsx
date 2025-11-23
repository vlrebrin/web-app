'use client'
import { CardHeader,Card, CardBody, Spacer} from "@heroui/react";
import { useSession } from "next-auth/react"
import {Avatar, SessionAvatar} from"@/components/avatar"
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/auth.buttons"

export default  function Home() {
  //const session  = useSession()
    
   return (
     <>
       <Card className="modal">
         <CardHeader className="flex-col justify-center">
           <p className="pt-4 text-xl font-bold"> Control </p>
           <Spacer yt={8}/>
           <SessionAvatar />
         </CardHeader>
         {/* <Avatar session={session} /> */}
         <CardBody >
           <Spacer y={6} />
           <LoginButton />
           <Spacer y={6} />
           <RegisterButton />
           <Spacer y={6} />
           <LogoutButton />
           <Spacer y={6} />
           <ProfileButton />
         </CardBody>
       </Card>
     </>
   )
}
