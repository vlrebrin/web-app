
'use client'
import { useRouter } from 'next/navigation'
//import { Button } from "@heroui/react"
import { Head, Button, Card, CardHeader, CardBody, Spacer, Spinner, Input, Link } from "@heroui/react"
import { useEffect, useState, useMemo, use } from 'react'
import { useSession, SessionProvider, signIn, signOut } from "next-auth/react"
import { formatedate } from '@/lib/clientHelpers'
//import { Session } from "@/components/session"
import { Select, SelectItem } from "@heroui/react"
import { Listbox, ListboxItem } from "@heroui/react"
import { ListboxWrapper } from "@/components/ListboxWrapper"
import useSWR from 'swr'
import { getUsers, getChecks, getMeterings } from "@/lib/fetchers"
import { set } from 'react-hook-form'

function makeUrl(u, c) {
  let url
  console.log(u,c)
  if (u && c) url = `?userId=${u}`
  //if (u && c) url = `?userId=${u}&checkId=${c}`
  else if (u && !c) url = `?userId=${u}`
  else if (!u && c) url = `?checkId=${c}`
  else url = ''
  return '/api/meterings' + url
}

export default function Page() {

  const { data: session, status } = useSession()
  const [user,setUser]=useState(null)
  const [userId, setUserId] = useState('');
  const [checkId, setCheckId] = useState('');
  const [error, setError] = useState(null)
  const [swrKey, setKey] = useState(makeUrl(userId, checkId))

  useEffect(() => {
    setKey(makeUrl(userId, checkId))
    console.log('u', userId, 'c', checkId)
  }, [userId, checkId])

  if (!session?.user)
    return (<Spinner size="lg" className='block mx-auto mt-48' />)
  
  return (
    <>
      <Card className="modal" >
        <CardHeader className="flex justify-center ">
          <p className="pt-4 text-xl font-bold"> Показания </p>
        </CardHeader>
        <CardBody className='flex-row  gap-2'>

          <Users className='basis-1/2'
            onUserChanged={(value) => {
              setUserId(value)
            }}
            onError={(value) => { setError(value) }}
            currentUser={session.user}
          />

          <Checks className='basis-1/2'
            onCheckChanged={(value) => { setCheckId(value) }}
            onError={(value) => { setError(value) }}
          />
        </CardBody>

        <CardBody>
          <Meterings className='mt-2'
            swrKey={swrKey}
            onError={(value) => { setError(value) }}
          />
        </CardBody>
      </Card >
    </>
  )
}


function Meterings({ swrKey, onError }) {

  const { data, mutate, error, isLoading, isValidating } = useSWR(swrKey, getMeterings, {
    revalidateOnFocus: false
  })
  if (!data) return (<Spinner size="lg" className='block mx-auto mt-48' />)
  return (
    <>
      <ListboxWrapper>
        {/* {error ? <div className="text-center mt-14"> {` ${error.status} `} </div> : */}
        <Listbox
          className="p-0 gap-0 bg-content1 overflow-visible shadow-small rounded-medium"
          items={data.meterings}
          onAction={(key) => alert(key)}
        >
          {(item) => (
            <ListboxItem key={item.id}>
              <div className="flex flex-row">
                <div className='basis-1/4'> {formatedate(new Date(item.Check.date))}</div>
                <div className='basis-1/4'> {item.Counter.num}</div>
                <div className='basis-1/4'> {item.Counter.User.name}</div>
              </div>
            </ListboxItem>
          )}
        </Listbox>
        {/* : <p className="text-center mt-14"> В системе нет ни одного показания </p> */}
      </ListboxWrapper>
    </>
  )
}

function Users({ onUserChanged, onError, currentUser }) {
  //const { data: session, status } = useSession()
  const { data, mutate, error, isLoading, isValidating } = useSWR(`/api/users`, getUsers, {
    revalidateOnFocus: false
  })
  
  const [value, setValue] = useState(currentUser.id)
  useEffect(() => { onUserChanged(currentUser.id) }, [])

  const handleSelectionChange = (e) => {
    setValue(e.target.value)
    onUserChanged(e.target.value)
  }

  if (isValidating)// || !session?.user)
    return (<Spinner size="lg" className='block mx-auto mt-48' />)
  return (
    <>
      <Select
        label="Участник"
        placeholder="Выбери участника"
        className="max-w-xs"
        selectedKeys={[value]}
        onChange={handleSelectionChange}
        disabled={true}
      >
        {data?.users.map((user) => (
          <SelectItem key={user.id}>
            {`${user.name}`}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}

function Checks({ onCheckChanged, onError }) {
  const skip = 0
  const take = 13
  const [swrKey, setKey] = useState(`/api/checks?skip=${skip}&take=${take}`)
  const { data, mutate, error, isLoading, isValidating } = useSWR(swrKey, getChecks, {
    revalidateOnFocus: false
  })
  
  const [value, setValue] = useState('')
  const handleSelectionChange = (e) => {
    setValue(e.target.value)
    onCheckChanged(e.target.value)
  }

  useEffect(() => {
    if (data?.checks) {
      const id = `${data.checks[0].id}`
      setValue(id)
      onCheckChanged(id)
    }
  }, [isValidating])

  return (
    <>{isValidating ? (<Spinner size="lg" className='block mx-auto mt-48' />) :
      <Select
        label="Счет"
        placeholder="Выбери счет"
        className="max-w-xs"
        selectedKeys={[value]}
        onChange={handleSelectionChange}
      >
        {data?.checks.map((check) => (
          <SelectItem key={check.id}>
            {formatedate(new Date(check.date))}
          </SelectItem>
        ))}
      </Select>}
    </>
  )
}
