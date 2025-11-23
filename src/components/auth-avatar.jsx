

import { User, Spinner } from "@heroui/react";
import { auth } from "@/auth"
import { Suspense } from 'react'
import { Avatar } from "@heroui/react";

// async function getSession() {
//   return await auth()
// }

export  function AuthAvatar() {
  //const {session, status}=props
  
  const session = auth()

   return (
    <Suspense fallback={<Spinner/>}>
     
       <User session={session}
         //src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
         //const Sess=use(session)
      name={session?.user?.name}
      description={session?.user?.phone}
       />
     </Suspense>
  )

}
