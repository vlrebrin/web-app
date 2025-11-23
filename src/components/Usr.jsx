import { User } from "@heroui/react";
import { use } from 'react'

function Usr({ session }) {
  const Session = use(session)
  return (
    <User Session={Session}
      //src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
      name={Session?.user?.name}
      description={Session?.user?.phone}
    />
  )
}
