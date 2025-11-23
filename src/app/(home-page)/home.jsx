'use client'
//import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { Card, CardHeader, CardBody } from "@heroui/card";
//import { Spinner } from "@heroui/spinner"
import { Spacer } from "@heroui/spacer"
import { Button } from '@heroui/button'
//import useSWR from 'swr'
import React from 'react';
//import { SessionAvatar } from "@/components/avatar"
//import { getChecks } from "@/lib/fetchers"


import { use } from 'react'
import { Avt } from '@/components/avt'

export function Home({session}) {
  const Session=use(session)
  const router = useRouter()
  const content = useMemo(() => {
    return (
      <div>
        <Spacer y={6} />
        <Button
          type="submit" color="primary"
          fullWidth
          size="sm"
          onPress={() => router.push('/checks')}
        > Счета </Button>

        <Spacer y={6} />
        <Button
          type="submit" color="primary"
          fullWidth
          size="sm"
          onPress={() => router.push('/meterings')}
        > Показания </Button>
      </div>
    )
  })

  return (
    <>
      <Card className='modal'>
        <CardHeader className="flex justify-center">
          <p className="pt-4 text-xl font-bold"> Главная </p>
        </CardHeader>
        <CardBody>
          <Button
            className='justify-center bg-inherit hover:bg-fuchsia-600 w-fit mx-auto'
            onPress={() => router.push('/auth/login')}
          >
            {/* <SessionAvatar /> */}
            <Avt session={Session}/>
          </Button>
          {content}
        </CardBody>
      </Card>
    </>
  )
}
