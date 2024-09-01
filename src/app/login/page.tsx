"use client";

import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Box } from '@mui/joy';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Select
      variant="soft"
      value={mode}
      onChange={(event, newMode) => {
        setMode(newMode);
      }}
      sx={{ width: 'max-content', position: 'fixed', top: '2rem', right: '2rem' }}
    >
      <Option value="system">Sitema</Option>
      <Option value="light">Claro</Option>
      <Option value="dark">Escuro</Option>
    </Select>
  );
}

export default function LoginFinal() {

  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [mostraSenha, setMostraSenha] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    alert('Bem-vindo!');
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', bgcolor: 'background.level1' }}>
      <CssVarsProvider>
        <ModeToggle />
      </CssVarsProvider>
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Olá</b>
          </Typography>
          <Typography level="body-sm">Efetue o login para continuar.</Typography>
        </div>
        <form onSubmit={handleSubmit} method='post'>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="SeuEmail@email.com"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Senha</FormLabel>
              <Input
                name="senha"
                type="senha"
                placeholder="Senha"
                onChange={(event) => setSenha(event.target.value)}
                value={senha}
              />
            </FormControl>
            <Button type="submit">Entrar</Button>
          </Box>
        </form>
        <Typography
          endDecorator={<Link href="/sign-up">Cadastrar-se</Link>}
          sx={{ fontSize: 'sm', alignSelf: 'center' }}
        >
          Ainda não possui uma conta?
        </Typography>
      </Sheet>
    </Box>
  );
}