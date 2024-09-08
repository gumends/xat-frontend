import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import Logout from "@/app/components/Logout";
import { Box, Card, IconButton } from "@mui/joy";
import { getServerSession } from "next-auth"

export default async function Home() {

    const session = await getServerSession(nextAuthOptions)

    console.log(session?.name);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ width: 500, textAlign: 'center' }}>
                <h1>Bem vindo {session?.name}</h1>
                <Logout />
            </Card>
        </Box>
    )
}