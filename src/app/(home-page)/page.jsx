import { Suspense } from 'react'
import { auth } from "@/auth"
import {Home} from "./home"

export default function page() {
  const session = auth()
  return (
      <>
         <Suspense fallback={<div>Loading...</div>}>
            <Home session={ session } />
        </Suspense>
      </>
  )
}


