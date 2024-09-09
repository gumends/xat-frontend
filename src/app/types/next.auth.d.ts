import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface Session {
        sub: string
        email: string
        name: string
        iat: number
        exp: number
        token: string
        avatar: string
    }
}