"use client"
import { Spinner } from "@heroui/spinner";
import { useSession } from "next-auth/react"

export function Session(props) {
  
   if (props.status === "loading") {
    return (
      <div className='flex justify-center  h-auto relative'>
        <Spinner label="Загрузка сессии..." />
      </div>
    )
  }
  return <>
    <h1>Client Session</h1>
    {/* <pre>{JSON.stringify(props.session?.user.role)}</pre> */}
    <pre>{JSON.stringify(props.session?.user.name)}</pre>

  </>
}

export function Selfsession(props) {
  //const session = useSession()
  if (!props.session.data) {
    //return <p>Загрузка...</p>
    return "Загрузка..."
  }
  //return <p>{session.data.user.name}</p>
  return "session.data.user.name"
}
export const SessString =(props)=> {
  //const session = useSession()
  if (!props.session.data) {
    return 'Загрузка...'
  }
  //return <p>{JSON.stringify( session?.user.role, null,2 )}</p>
  return `${props.session.data.user.name}`
}