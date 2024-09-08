"use client";

import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { Box } from '@mui/joy';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import logo from '@/assets/logo-inicial.png';

export default function LoginFinal() {

  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    
    const result = await signIn('credentials', {
      email,
      password: senha,
      redirect: false
    });

    if (result?.error) {
      alert("Erro ao efetuar login");
      return;
    }

    router.replace('/chat');
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', bgcolor: 'background.level1' }}>
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
          <img src={logo.src} alt="" />
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
                type="password"
                placeholder="Senha"
                onChange={(event) => setSenha(event.target.value)}
                value={senha}
              />
            </FormControl>
            <Button type="submit">Entrar</Button>
          </Box>
        </form>
        <Typography
          endDecorator={<Link href="/cadastro">Cadastrar-se</Link>}
          sx={{ fontSize: 'sm', alignSelf: 'center' }}
        >
          Ainda não possui uma conta?
        </Typography>
      </Sheet>
    </Box>
  );
}