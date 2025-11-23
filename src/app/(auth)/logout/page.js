'use client'

//import { signOut } from "@/auth";
import { logOut } from "./logout-button";
import { useRouter, refresh } from 'next/navigation'
import { Card, CardHeader, CardBody, Button } from "@heroui/react";
import { Avatar, SessionAvatar } from "@/components/avatar"
import { useSession } from "next-auth/react"
import { useEffect } from "react";

export default function Page() {
  // const { data: session, status } = useSession()
  // useEffect(() => {
  //   const s = session
  //   console.log(status)
  // },[status])

  const router=useRouter()
  useEffect(() => {
     console.log('refresh')
   }) 
  return (<>
    <Card className="modal">
      <CardHeader className="flex-col justify-center">
        <p className="pt-4 text-xl font-bold"> Выход </p>
        {/* <Spacer yt={8} /> */}
        <div className="border-none bg-transparent mt-6 h-20">
            <SessionAvatar/>
        </div>
      </CardHeader> 
      <CardBody >
        <Button
           
          onPress={() => {
            logOut()
           }}
          //type="submit"
           color="primary"
           fullWidth
           size="lg" >
             Logout
            </Button>
      </CardBody>
    </Card>
  </>);
}