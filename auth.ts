import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "./src/prisma/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET
  }), Credentials({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials) {
      const user = await db.orm.public.User.where({ email: credentials.email as string }).first()
      if (!user) return null

      const validate = await bcrypt.compare(credentials.password as string, user.password);
      if (!validate) return null

      return {
        id: user.id,
        email: user.email,
        password: user.password,
        image: user.image || null
      }
    }
  })],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const existing_user = await db.orm.public.User.where({ email: user.email as string }).first();
          if (!existing_user) {
            const hashedPassword = await bcrypt.hash('google_password', 10);
            await db.orm.public.User.create({
              email: user.email || '',
              password: hashedPassword,
              image: user.image || ''
            })

          } else if (!existing_user.image && user.image) {
            await db.orm.public.User.where({ email: user.email as string }).update({
              image: user.image
            });
          }
        } catch (error) {
          console.log('Error in signIn Auth ./', error)
          return false
        }
      }
      return true
    },
    async session({ session, token }) {
      if (session.user) {
        // category and username
        const dbUser = await db.orm.public.User.where({ email: session.user.email }).select("category", "username").first();
        if (dbUser) {
          session.user.category = dbUser.category;
          session.user.username = dbUser.username;
        }
        // image
        session.user.image = (token.picture as string) || session.user.image;
      }
      return session;
    },
  },
})