"use client";
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button, IconButton, Snackbar, Stack, Typography } from '@mui/joy';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function Logout() {

    const router = useRouter();
    const [open, setOpen] = useState(false);

    async function logout() {
        await signOut({
            redirect: false
        })
        router.replace('/login')
        setOpen(false)
    }

    return (
        <>
            <Snackbar
                autoHideDuration={5000}
                variant="solid"
                color="warning"
                size="lg"
                invertedColors
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={(theme) => ({
                    background: `linear-gradient(45deg, ${theme.palette.primary[600]} 30%, ${theme.palette.primary[500]} 90%})`,
                    maxWidth: 360,
                    zIndex: 9999
                })}
            >
                <div>
                    <Typography>Saindo!</Typography>
                    <Typography sx={{ mt: 1, mb: 2 }}>
                        Voce tem certeza que deseja sair?
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Button variant="solid" color="primary" onClick={() => logout()}>
                            Confirmar
                        </Button>
                        <Button
                            variant="outlined"
                            color="danger"
                            onClick={() => setOpen(false)}
                        >
                            Cancelar
                        </Button>
                    </Stack>
                </div>
            </Snackbar>
            <IconButton variant="soft" color="danger" sx={{ width: "20px", height: "20px" }} onClick={() => setOpen(true)}>
                <LogoutIcon sx={{ width: "60%" }} />
            </IconButton>
        </>

    )
}