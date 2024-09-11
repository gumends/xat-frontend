import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviders from "@/providers/sessionProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XAT",
  description: "Sistema de chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <SessionProviders>
          {children}
        </SessionProviders>
      </body>
    </html>
  );
}
