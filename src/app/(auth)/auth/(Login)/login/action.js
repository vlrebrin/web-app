'use server'
import { signIn, auth } from "@/auth"
import { AuthError } from "next-auth"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect, permanentRedirect } from 'next/navigation'

export async function login(state, formData) {  
  try {
    const data = { phone: formData.get("phone") }
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return ('Invalid credentials.')
        default: return "Went wrong";
      }
    }
  }
  redirect('/')
  //permanentRedirect('/')
  }
  