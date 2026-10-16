import { DefaultSession } from "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      category?: string | null
      username?: string | null
    } & DefaultSession["user"]
  }

  interface User {
    category?: string | null
    username?: string | null
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    category?: string | null
    username?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    category?: string | null
    username?: string | null
  }
}