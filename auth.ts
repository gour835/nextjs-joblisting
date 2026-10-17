import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import Users from "./models/user.model"
import MongoDB from "./config/mongoDB.config"
import bcrypt from "bcryptjs"

MongoDB()

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
      const user = await Users.findOne({ email: credentials.email })
      if (!user) return null

      const validate = await bcrypt.compare(credentials.password as string, user.password);
      if (!validate) return null

      return {
        id: user._id,
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
          const existing_user = await Users.findOne({ email: user.email });
          if (!existing_user) {
            const hashedPassword = await bcrypt.hash('google_password', 10);
            await Users.create({
              email: user.email,
              password: hashedPassword,
              image: user.image
            })
            // await Users.create({
            //   email: user.email,
            //   password: hashedPassword,
            //   image: user.image,
            //   username: user.email?.split('@')[0] || "user",
            //   category: "general" // <-- Provide a default category so it doesn't fail!
            // });
          } else if (!existing_user.image && user.image) {
            existing_user.image = user.image;
            await existing_user.save()
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
        const dbUser = await Users.findOne({ email: session.user.email }).select('category username');
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