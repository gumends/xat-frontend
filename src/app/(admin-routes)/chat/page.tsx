"use client";

import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { FormLabel, Input, Textarea, Typography as TypographyJoy } from '@mui/joy';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { IconButton as IconButtonJoy } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import logo from '@/assets/logo-icone.png';
import { Avatar, Button, Sheet, Snackbar, Stack } from '@mui/joy';
import loves from '@/assets/loves.jpg';
import CardMenssagem from '@/app/components/CardMenssagem';
import Logout from '@/app/components/Logout';
import { useState } from 'react';
import Menssagem from '@/app/components/Menssagem';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

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

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState<string>('');
    const [busca, setBusca] = useState<string>('');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                    px: '20px'
                }}
            >
                <Logout />
                <img src={logo.src} alt="logo xat" style={{ height: '30px', width: '30px' }} />
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
                            <Avatar src={loves.src} sx={{ height: '30px', width: '30px' }} />
                            <Typography sx={{ marginLeft: '10px' }}>Loves</Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={{ zIndex: 1 }} >
                    <DrawerHeader sx={{ bgcolor: '#424242', mt: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }} ><ChatRoundedIcon />  Chates</Typography>
                        <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon  /> : <MenuOpenRoundedIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider sx={{ bgcolor: 'white' }} />
                    <Box sx={{ bgcolor: '#536dfe', width: '100%', height: '100%', overflow: 'auto', p: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {
                            open &&
                            <Box>
                                <Input 
                                sx={{ bgcolor: '#424242', width: '100%', color: 'white' }} 
                                value={busca} 
                                onChange={(e) => setBusca(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && console.log(busca)}
                                startDecorator={<IconButton > <SearchRoundedIcon sx={{ color: 'white' }} /> </ IconButton>}
                                />
                            </Box>
                        }

                        <CardMenssagem nome="Loves" mensagem='Olá, eu gosto muito de voce' imagem={loves} />
                        <CardMenssagem nome="Loves" mensagem='Olá, eu gosto muito de voce' imagem={loves} />
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, mt: '102px', width: '100%' }}>
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Menssagem texto="Olá, eu gosto muito de voce" horario='03:19' lado={false} />
                        <Menssagem texto="Também gosto muito de voce" horario='03:25' lado={true} />
                    </Box>
                </Box>
                <Box sx={{ pr: open ? 34.5 : 12, position: 'fixed', bottom: 20, width: '100%', left: open ? 260 : 80, transition: 'all 0.2s ease-in-out' }}>
                    <Input
                        placeholder="Digite aqui"
                        value={text}
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
                        <Button>Enviar</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}