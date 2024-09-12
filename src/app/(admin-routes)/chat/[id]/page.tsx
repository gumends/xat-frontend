"use client";

import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { DialogContent, DialogTitle, FormControl, FormLabel, Input, List, ListItem, ListItemButton, Modal, ModalDialog, Stack } from '@mui/joy';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import logo from '@/assets/logo-icone.png';
import { Avatar, Button } from '@mui/joy';
import loves from '@/assets/loves.jpg';
import CardMenssagem from '@/app/components/CardMenssagem';
import { useState, useEffect } from 'react';
import Menssagem from '@/app/components/Menssagem';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuPerfil from '@/app/components/MenuPerfil';
import * as usuarioService from '@/services/usuario.service';
import * as sessaoService from '@/services/sessoes.service';
import * as conversaService from '@/services/conversas.service';
import { ICardsSessaoService } from '@/services/sessoes.service';
import { IConversaService, ICriarConversaService } from '@/services/conversas.service';
import { io } from 'socket.io-client';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { IUsuarioService } from '@/services/usuario.service';
import ChatIcon from '@mui/icons-material/Chat';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

interface IPageChat {
    nome: string;
    email: string;
    avatar?: string;
    id: string;
}

export default function MiniDrawer(props: IPageChat) {

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState<string>('');
    const [busca, setBusca] = useState<string>('');
    const [idSessao, setIdSessao] = useState<string>('');
    const [sessoes, setSessoes] = useState<ICardsSessaoService | undefined>(undefined);
    const [conversas, setConversas] = useState<IConversaService[]>([]);
    const [nomeSessao, setNomeSessao] = useState<string>('');
    const [avatarSessao, setAvatarSessao] = useState<string>('');
    const [openBusca, setOpenBusca] = useState<boolean>(false);
    const [buscaContatos, setBuscaContatos] = useState<IUsuarioService[]>([]);

    const buscarConversas = async (id: string) => {
        await conversaService.buscar(id)
            .then((response) => {
                setConversas(response);
            })
    };

    const buscaContatoEmail = async (email: string) => {
        const response = await usuarioService.contato(email);
        console.log(response);
    };
    const buscaSessoes = async () => {
        await sessaoService.buscar(props.id).
            then((r: sessaoService.ISessaoService) => {
                setSessoes(r as unknown as sessaoService.IExtendedSessaoService);
            });
    };

    const buscaContato = async (busca: string) => {
        usuarioService.buscarTodos(busca)
            .then((response) => {
                setBuscaContatos(response);
            })
    }

    React.useEffect(() => {
        buscaSessoes();
    }, []);

    React.useEffect(() => {
        sessaoService.buscar(props.id);
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const socket = io('http://localhost:3001');

    useEffect(() => {
        socket.on('message', (data) => {
            setConversas([...conversas, data]);
        })
    }, [conversas]);


    const enviarMensagem = () => {
        const message: ICriarConversaService = {
            texto: text,
            usuario_id: props.id,
            sessao_id: idSessao
        }
        setText('');
        socket.emit('message', message);
    }

    return (
        <Box sx={{ width: '100vw', height: '100vh' }}>
            <Box
                position={'fixed'}
                sx={{
                    display: 'flex',
                    zIndex: 1000,
                    height: '40px',
                    width: '100%',
                    bgcolor: '#536dfe',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: '20px',
                    gap: 1
                }}
            >
                <Avatar sx={{ height: '29px', width: '30px' }}>
                    <img src={logo.src} alt="logo xat" style={{ height: '30px', width: '30px' }} />
                </Avatar>
                <Box>
                    <MenuPerfil {...props} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', zIndex: 1 }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ bgcolor: '#424242', mt: '40px', zIndex: 100 }} open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[
                                {
                                    marginRight: 5,
                                },
                                open && { display: 'none' },
                            ]}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', textAlign: 'center' }}>
                            {idSessao !== "" &&
                                <>
                                    <Avatar src={avatarSessao} sx={{ height: '30px', width: '30px' }} />
                                    <Typography sx={{ marginLeft: '10px' }}>{nomeSessao}</Typography>
                                </>
                            }

                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={{ zIndex: 1 }} >
                    <DrawerHeader sx={{ bgcolor: '#424242', mt: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <IconButton onClick={() => setOpenBusca(true)} >
                            <GroupAddIcon sx={{ color: 'white' }} />
                        </IconButton>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}  >
                            Chats
                        </Typography>
                        <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <MenuOpenRoundedIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider sx={{ bgcolor: 'white' }} />
                    <Box sx={{ bgcolor: '#536dfe', width: '100%', height: '100%', overflow: 'auto', p: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {
                            open &&
                            <Box>
                                <Input
                                    sx={{ bgcolor: '#424242', width: '100%', color: 'white', boxShadow: '3px 3px 5px rgba(33, 33, 33, 0.5)', border: 'none' }}
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && console.log(busca)}
                                    startDecorator={<SearchRoundedIcon sx={{ color: 'white' }} />}
                                />
                            </Box>
                        }
                        {
                            Array.isArray(sessoes) && Array.isArray(sessoes) && sessoes.map((sessao, kay) => (
                                <CardMenssagem
                                    key={kay}
                                    nome={sessao.usuario.nome}
                                    mensagem=''
                                    onClick={() => {
                                        setIdSessao(sessao.sessao_id);
                                        setNomeSessao(sessao.usuario.nome);
                                        setAvatarSessao(sessao.avatar);
                                        buscarConversas(sessao.sessao_id)
                                    }}
                                />
                            ))
                        }
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, mt: '102px', width: '100%' }}>
                    {idSessao !== "" ?
                        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1, mb: 18, width: '100%' }}>
                            {
                                conversas.map((conversa) => (
                                    <Menssagem texto={conversa.texto} horario={conversa.created_at} lado={conversa.usuario_id === props.id ? true : false} key={conversa.id} />
                                ))
                            }
                        </Box>
                        :
                        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1, width: '100%', justifyContent: 'center', alignItems: 'center', mt: 10 }}>
                            <Typography variant='h4'>Muito bom ver você por aqui</Typography>
                            <Typography variant='h6'>Escolha uma conversa para começar</Typography>
                        </Box>
                    }

                </Box>
                {idSessao !== "" ?
                    <Box sx={{ pr: open ? 34.5 : 12, position: 'fixed', bottom: 20, width: '100%', left: open ? 260 : 80, transition: 'all 0.2s ease-in-out' }}>
                        <Input
                            placeholder="Digite aqui"
                            value={text}
                            onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()}
                            onChange={(event) => setText(event.target.value)}
                            sx={{ flexGrow: 1, width: '100%', height: '50px', bgcolor: '#f5f5f5', borderEndEndRadius: 0, borderEndStartRadius: 0, border: '1px solid #e0e0e0' }}
                        />
                        <Box sx={{
                            width: '100%',
                            height: '50px',
                            bgcolor: '#f5f5f5',
                            px: 1,
                            py: 0.5,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            border: '1px solid #e0e0e0',
                            borderEndStartRadius: 5,
                            borderEndEndRadius: 5
                        }}>
                            <Button onClick={() => enviarMensagem()}>Enviar</Button>
                        </Box>
                    </Box>
                    : null}
            </Box>
            <React.Fragment>
                <Modal open={openBusca} onClose={() => setOpenBusca(false)}>
                    <ModalDialog>
                        <DialogTitle>Buscar contato</DialogTitle>
                        <DialogContent>Busque por um contato para iniciar uma conversa</DialogContent>
                        <form
                            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                buscaContato(busca);
                            }}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Nome Ou E-mail</FormLabel>
                                    <Input autoFocus required value={busca} onChange={(e) => setBusca(e.target.value)} />
                                </FormControl>
                                <Button type="submit">Buscar</Button>
                            </Stack>
                        </form>
                        <List>
                            {buscaContatos.length > 0 && buscaContatos ? buscaContatos.map((contato) => (
                                <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                        <Avatar src={contato.avatar}></Avatar>
                                        <Typography>{contato.nome}</Typography>
                                    </Box>
                                    <Box>
                                        <IconButton onClick={() => { }} color='primary'><ChatIcon /></IconButton>
                                    </Box>
                                </ListItem>
                            )) : null}
                        </List>
                    </ModalDialog>
                </Modal>
            </React.Fragment>
        </Box>
    );
}