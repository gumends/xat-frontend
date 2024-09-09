import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials, req) {
                const response = await fetch("http://localhost:3001/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials),
                })
                const user = await response.json()
                
                if (user && response.ok) {
                    return user
                }

                return null
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user);
            return token;
          },

        async session({ session, token }) {
            session = token.user as any
            return jwtDecode(session?.token)
        }
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }