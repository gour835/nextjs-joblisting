'use client'
import { googleLogin } from "@/app/action/auth"
import { signIn } from "@/auth"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
       await googleLogin()
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 