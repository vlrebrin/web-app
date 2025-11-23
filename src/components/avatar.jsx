
 'use client'
import { User, Spinner, Button } from "@heroui/react";
import { auth } from "@/auth"
import { Avatar } from "@heroui/react";

import { useSession } from "next-auth/react"
import { useEffect,useState } from "react";

// export function Avatar (props){
//   return (
//     <User
//      //src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
//       name={props.session?.user?.name}
//       description={props.session?.user?.phone}
//     />
//   )
// }


export function SessionAvatar() {
  //const {session, status}=props
  const { data: session, status } = useSession()
 
  if (status === "loading")
    return (<Spinner size="sm" />)
  
  //return (
        // <Avatar
        // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        // name={session?.user?.name}
        // description={session?.user?.phone}
        // />
  // <div> { session?.user.name} </div>
//)
  
          return (
            <User
             //src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              name={session?.user?.name}
              description={session?.user?.phone}
            />
          )
  
}
