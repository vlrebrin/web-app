'use client'
import { Card, CardHeader, CardBody, Spinner, Spacer, Button, Input, Link } from "@heroui/react"
import { Listbox, ListboxItem } from "@heroui/react"
import { ListboxWrapper } from "@/components/ListboxWrapper"
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { useMemo } from "react"
import { checkClose, checkDelete } from "@/lib/server-actions"
import { getChecks } from "@/lib/fetchers"
import { MaterialSymbolsLightDeleteOutline } from "@/icons/MaterialSymbolsLightDeleteOutline"
import { useState } from 'react'
import { formatedate } from '@/lib/clientHelpers'


export default function Page() {
  const skip = 0
  const take = 13
  const [swrKey, setKey] = useState(`/api/checks?skip=${skip}&take=${take}`)
  const { data, mutate, error, isLoading, isValidating } = useSWR(swrKey, getChecks, {
    revalidateOnFocus: false
  })
  const router = useRouter()

  const listComponent = useMemo(() => {
    if (isValidating) return (<Spinner size="lg" className='block mx-auto mt-48' />)
    if (error) return (
      <> <p className='h-12 mx-auto'> {error.message}</p> </>
    )

    return (
      <>
        <div className="flex justify-between gap-3 items-end my-4">
          {(data?.checks[0]?.closed || !data?.checks.length) ?
            <Button
              color="primary"
              fullWidth
              size="sm"
              isDisabled={isLoading}
              onClick={() => router.push('/checks/new')}
            > Новый счет </Button>
            :
            <Button
              color="primary"
              fullWidth
              size="sm"
              isDisabled={isLoading}
              onClick={async () => {
                await checkClose(data.checks[0])
                mutate({ ...data, closed: true })
              }}
            >Закрыть счет</Button>
          }

          <Button
            color="primary"
            fullWidth
            size="sm"
            isDisabled={isLoading}
            onClick={() => router.push('/')}
          > Назад </Button>
        </div>

        < ListboxWrapper >
          {data?.checks.length ?
            <Listbox
              className="p-0 gap-0 bg-content1 overflow-visible shadow-small rounded-medium"
              items={data.checks}
              onAction={(key) => alert(key)}
            >
              {(item) => (CheckItem(item, swrKey, mutate))}
            </Listbox>
            : <p className="text-center mt-14">В системе нет ни одного счета </p>
          }
        </ListboxWrapper >
      </>
    )
  }, [isLoading, isValidating, data])

  return (
    <Card className="modal">
      <CardHeader className="flex justify-center">
        <p className="pt-4 text-xl font-bold"> Счета </p>
      </CardHeader>
      <CardBody>
        {listComponent}
      </CardBody>
    </Card>
  )
}

function CheckItem(item, key, mutate) {

  return (
    (!item.closed) ?
      (
        <ListboxItem
          key={item.id}
          className="bg-danger"
          endContent={<Button
            onClick={async () => {
              const result = await checkDelete(item.id)
              mutate(key)
              //mutate("/api/checks") тоже работает!
            }}
            isIconOnly
            size="sm"
          > <MaterialSymbolsLightDeleteOutline width={20} height={20} />
          </Button>}>
          <ItemContent item={item} />
        </ListboxItem>
      ) :
      (
        <ListboxItem>
          < ItemContent item={item} />
        </ListboxItem>
      )
  )
}

function ItemContent({ item }) {
  let { date, intake, summa } = item
  return (
    <div className="flex flex-row">
      <div className='basis-1/4'> {formatedate(new Date(date))}</div>
      <div className='basis-1/4'> {new Intl.NumberFormat("ru").format(intake) + " кВт·ч"} </div>
      <div className='basis-1/4'> {new Intl.NumberFormat("ru", { style: "currency", currency: "RUB" }).format(summa)} </div>
      <div className='basis-1/4'> {new Intl.NumberFormat("ru", { style: "decimal", maximumFractionDigits: 1 },).format(summa / intake) + " р/кВт·ч"}</div>
    </div>
  )
}
