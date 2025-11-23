'use client'
import { User } from "@heroui/react";

export function Avt({session}) {
  return (
    <User session={session}
      name = { session?.user?.name }
      description = { session?.user?.phone }
    />
  )}



