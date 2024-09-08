import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ModeToggle from "../components/ModeToggle";
import { CssVarsProvider } from "@mui/joy";

export default async function Privatelayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(nextAuthOptions);
    if (session) { redirect("/chat") };
    return <>
        <CssVarsProvider>
            <ModeToggle />
        </CssVarsProvider>
        {children}
    </>;
}