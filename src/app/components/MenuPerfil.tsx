import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import { Avatar, Box, Typography } from '@mui/joy';
import LogoutIcon from '@mui/icons-material/Logout';
import { Snackbar } from '@mui/joy';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';

interface iMenu {
    nome: string
    email: string
    avatar?: string
}
export default function MenuPerfil(props: iMenu) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    async function logout() {
        await signOut({
            redirect: false
        })
        router.replace('/login')
        setOpen(false)
    }

    return (
        <>
            <React.Fragment>
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <ModalDialog>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar src={props.avatar} sx={{ width: 100, height: 100 }} />
                            <DialogTitle>{props.nome}</DialogTitle>
                            <DialogContent>{props.email}</DialogContent>
                        </Box>
                        <form
                            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                setOpenModal(false);
                            }}
                        >
                            <Stack spacing={2}>

                                <FormControl>
                                    <FormLabel>Nome</FormLabel>
                                    <Input autoFocus required />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>E-mail</FormLabel>
                                    <Input required />
                                </FormControl>
                                <Button type="submit">Submit</Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
            </React.Fragment>
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
                <Box>
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
                </Box>
            </Snackbar>
            <Dropdown sx={{ p: 1 }}>
                <MenuButton
                    slots={{ root: IconButton }}
                >
                    <Avatar></Avatar>
                </MenuButton>
                <Menu placement="bottom-end" sx={{ width: 200 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', p: 1, textAlign: 'center' }}>
                        <Typography level="body-sm">{props.nome}</Typography>
                        <Typography level="body-sm">{props.email}</Typography>
                    </Box>
                    <ListDivider />
                    <MenuItem onClick={() => setOpenModal(true)}>
                        Conta
                    </MenuItem>
                    <ListDivider />
                    <IconButton variant="plain" color="danger" sx={{ width: "20px", height: "20px", '&:hover': { bgcolor: 'transparent' } }} onClick={() => setOpen(true)}>
                        <LogoutIcon sx={{ width: "60%" }} />
                    </IconButton>
                </Menu>
            </Dropdown>
        </>
    );
}