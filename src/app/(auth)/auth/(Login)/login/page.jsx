import LoginFoform from './login-form'
import { Suspense } from 'react'
import { auth } from "@/auth"

export default function Page() {
  const session= auth()
    return (
    <>
     <Suspense fallback={<div>Loading...</div>}>
       <LoginFoform session={ session } />
    </Suspense>
    </>
  )
}