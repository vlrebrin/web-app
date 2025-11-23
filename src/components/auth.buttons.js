"use client";
import { Button } from "@heroui/react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useFormStatus } from "react-dom"

export const LoginButton = () => {
  return (
    <Button
     // onClick={() => signIn()}
      type="submit" color="primary"
      fullWidth
      size="lg"
     >
      Login
    </Button>
  );
};

export const RegisterButton = () => {
  const router = useRouter()
  return (
    <Button onClick={() => router.push('/register')}
      type="submit" color="primary"
      fullWidth
      size="lg"
    >
      Register
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button onClick={() => signOut()}
      type="submit" color="primary"
      fullWidth
      size="lg"
      >
      Logout
    </Button>
  );
};

export const ProfileButton = () => {
  const router = useRouter()
  return (
    <Button onClick={() => router.push('/profile')}
      type="submit" color="primary"
      fullWidth
      size="lg"
    >
      Profile
    </Button>
  );
};

export function PendingButton(props) {
  const { pending } = useFormStatus()
  //isLoading = {"true"} 
  //props.color = "danger"
  return (
    <Button
      isLoading={pending}
      {...props}  ></Button>
  )
}
