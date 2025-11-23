'use client'

import { use, useState, useActionState } from 'react'
import { PendingButton } from "@/components/auth.buttons"
import { Card, CardHeader, CardBody, Form } from "@heroui/react";
import { login } from "./action"
import Phone from './phone'

export default function LoginForm({ session }) {
  const Session=use(session)
  const [state, formAction, isPending] = useActionState(login, {});
  const [phoneValid, setPhoneValid] = useState(null)
 
  return (
    <>
      <Card className="modal">
        <CardHeader className="flex-col justify-center">
          <p className="pt-4 text-xl font-bold"> Вход </p>
          {/* <div className="border-none bg-transparent mt-6 h-20">
            <Avt session={Session}/>
          </div> */}
        </CardHeader>
        <CardBody >
          <Form className="w-full max-w-xs flex flex-col"
            action={formAction}
           >
            <Phone 
              name="phone"
              onValid={(message) => {
                setPhoneValid(message == '')
              }}
             />
            <PendingButton className="mt-2"
              type="submit" color="primary"
              fullWidth
              size="sm"
              isDisabled={!phoneValid}
            >Отправить</PendingButton>
          </Form>
          {/* <p>{ isPending ? "Loading..." : JSON.stringify(state)}</p> */}
          {/* <p>{ Session.user?.name }</p> */}
        </CardBody>
      </Card>
    </>
  )
}