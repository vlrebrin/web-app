'use client'

import useSWR from 'swr'
import useSWRImmutable from "swr/immutable"
import { Card, CardHeader, CardBody, Spacer, Button, Input, Spinner, Link } from "@heroui/react";
import { useRouter } from 'next/navigation'
import { useForm, Controller } from "react-hook-form"
import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect, useMemo, } from 'react'
import { getChecks } from "@/lib/fetchers"
import { createCheck } from "./action"
import Intake from "./intake"
import Summa from "./summa"

function Spin() {
  return (<Spinner size="lg" className='block mx-auto mt-52' />)
}

function Actinstatus(state) {
  const router = useRouter()
  if (state.status === 'fault')
    return (
      <div className='flex-col justify-items-center my-5'>
        <p className='mb-5 font-bold'> ОШИБКА ПЕРЕДАЧИ ДАННЫХ</p>
        <p>{state.message}</p>
        <Button className='my-5'
          onClick={() => { router.push('/checks') }}>
          Ok
        </Button>
      </div>
    )
  if (state.status === 'success') router.push('/checks')
}

export default function Page() {

  const skip = 0
  const take = 2
  const { data, error, mutate, isLoading, isValidating } = useSWR(`/api/checks?skip=${skip}&take=${take}`, getChecks, {})
  const router = useRouter()
  const [state, formAction] = useFormState(createCheck, { message: null })
  const { pending } = useFormStatus()

  const {
    control, trigger, formState: { errors, isValid },
  } = useForm({
    mode: 'onChange'
  })

  useEffect(() => {
    trigger('intake')
    trigger('summa')
  }, [])


  const content = useMemo(() => {
    if (state.status) return Actinstatus(state)
    if (isValidating) return Spin()

    const check = data.checks[0]
    return (
      <div>
        < form
          action={formAction}
        >
          <Spacer yt={4} />
          <Intake
            name={"intake"}
            control={control}
            lastIntake={check?.intake}
          />
          <Spacer y={6} />
          <Summa
            name={"summa"}
            control={control}
            lastSumma={check?.summa}
          />

          <Spacer y={6} />
          <Button
            type="submit" color="primary"
            fullWidth
            isDisabled={!isValid}
            size="sm"
          > {pending ? "Загрузка..." : "Передать"} </Button>
        </form>
        <Spacer y={6} />
        <Button
          color="primary"
          fullWidth
          size="sm"
          onClick={() => router.back()}
        > Отменить </Button>
      </div>
    )
  }, [isValidating, isValid, state.status])

  return (
    <Card className="modal">
      <CardHeader className="flex justify-center">
        <p className="pt-4 text-xl font-bold"> Новый счет </p>
      </CardHeader>
      <CardBody >
        {content}
      </CardBody>
    </Card>
  )
}