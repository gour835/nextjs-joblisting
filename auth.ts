import MongoDB from "@/config/mongoDB.config";
import Google from 'next-auth/providers/google'
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Users from "@/models/user.model";
import bcrypt from "bcryptjs";

MongoDB()

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        }),
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {

                const user = await Users.findOne({ email: credentials.email })

                if (!user || !user.password) return null;

                const isValid = await bcrypt.compare(credentials.password as string, user.password);
                if (!isValid) return null;

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image || null
                }

            }
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider == 'google') {
                try {

                    const existing_user = await Users.findOne({ email: user.email })

                    if (!existing_user) {
                        const hashed_password = await bcrypt.hash('google_login', 10);

                        await Users.create({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            password: hashed_password
                        })
                    } else if (!existing_user.image && user.image) {
                        existing_user.image = user.image
                        await existing_user.save()
                    }
                    return true;
                } catch (error) {
                    console.error("Mongoose error during Google sign-in:", error);
                    // If there's an error connecting to DB, return true anyway so NextAuth can issue the session, 
                    // or return false/redirect to an error page.
                    return true;
                }
            }
            return true
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.image = (token.picture as string) || session.user.image;
            }
            return session;
        },
    }
})