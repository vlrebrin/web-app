"use client"
import { useSession } from "next-auth/react";
import {useState} from "react"
import { Head, Card, CardHeader, CardBody, Spacer, Button, Input, Link } from "@heroui/react";
import { Spinner } from "@heroui/spinner";
import { auth } from "@/auth";

//export default function  User() {
export const UseSession=()=>{  
  //[sess, setSess] = useState()
  const { data: session, status } = useSession()
  if (status === "loading") {
   
    return (
      <div className='flex justify-center  h-screen relative'>
        {/* <strong >Загрузка...</strong> */}
        <Spinner label="Загрузка сессии..." />
      </div>
    )
  }
  // return <div>{ session }</div>
  // setSess(session)
  // return <div>{session}</div>
  // <div></div>
    return <>
      <h1>Client Session</h1>
      <pre>{JSON.stringify(session)}</pre>
    </>
  
  }