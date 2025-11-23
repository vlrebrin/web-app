'use client'
import { auth } from "@/auth"
//import { useSession } from "next-auth/react"
import { getCheck } from "@/lib/server-actions"
import { useEffect, useState } from "react";

const fetcher = async (url) => {
  //const response = await fetch(url);
  const check = await getCheck(1)
  const a=check
  return check
};



export default function Page() {
  //const[c,setC]=useState()
  const ff = fetcher()
  const [ch, setCh]=useState(null)
  
  // useEffect(() => {
  //   //const ff = fetcher()
  //   let a = 'ff'
  //   setCh(a)
  // },[])



  return (
    <div>
     <pre>WWWWWW</pre>
      {/*<pre>{JSON.stringify(user.name)}</pre> */}
    </div>
  )
  // const session = await auth()
  // if (!session) return <div>Not authenticated</div>

  // return (
  //   <div>
  //     <pre>{JSON.stringify(session, null, 2)}</pre>
  //   </div>
  // )
}