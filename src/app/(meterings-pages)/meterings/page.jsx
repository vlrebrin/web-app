import { Suspense } from 'react'
import { auth } from "@/auth"
import { Spinner } from "@heroui/react"
import {MeteringHome} from "./metering-home"

export default function page() {
  const session = auth()
  return (
      <>
         {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Suspense fallback={<Spinner label="...Загрузка" className='flex mt-5 justify-center'/>}>
          {/* <Spinner label="...Загрузка" variant='spinner'className='flex mt-5 justify-center' /> */}
          <MeteringHome session={ session } /> 
        </Suspense>
      </>
  )
}