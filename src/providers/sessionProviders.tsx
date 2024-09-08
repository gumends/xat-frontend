"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface NextAuthOptions {
    children: ReactNode
}

export default function SessionProviders({ children }: NextAuthOptions) {
    return <SessionProvider>{children}</SessionProvider>;
}