import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import Logout from "@/app/components/Logout";
import { Box, Card, IconButton } from "@mui/joy";
import { getServerSession } from "next-auth"
import MiniDrawer from "./[id]/page";

export default async function Home() {
    const session = await getServerSession(nextAuthOptions)
    return (
        <>
            {
                session ?
                    <MiniDrawer nome={session?.name} email={session?.email} avatar={session?.avatar} id={session?.sub} />
                    :
                    <Logout />
            }
        </>
    )
}