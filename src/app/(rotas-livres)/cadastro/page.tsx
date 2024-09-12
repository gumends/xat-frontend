"use client";

import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
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
import ModeToggle from '@/app/components/ModeToggle';
import * as criar from '@/services/usuario.service';
import { iCriarUsuarioService } from '@/services/usuario.service';


export default function LoginFinal() {

  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [nome, setNome] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    criar.criar({
      nome: nome,
      email,
      password: senha
    }).then((r) => {
      if (r) {
        router.replace('/login')
      }
    })
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', bgcolor: 'background.level1' }}>
      <Sheet
        sx={{
          width: 500,
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
            <b>Cadastro</b>
          </Typography>
          <Typography level="body-sm">Preencha todos os campos abaixo.</Typography>
        </div>
        <form onSubmit={handleSubmit} method='post'>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ width: '50%' }}>
                <FormLabel>Nome</FormLabel>
                <Input
                  name="nome"
                  type="text"
                  placeholder="Digite seu Nome"
                  onChange={(event) => setNome(event.target.value)}
                  value={nome}
                />
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ width: '50%' }}>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="SeuEmail@email.com"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
              </FormControl>
              <FormControl sx={{ width: '50%' }}>
                <FormLabel>Senha</FormLabel>
                <Input
                  name="senha"
                  type="password"
                  placeholder="Senha"
                  onChange={(event) => setSenha(event.target.value)}
                  value={senha}
                />
              </FormControl>
            </Box>
            <Button type="submit">Cadastrar</Button>
          </Box>
        </form>
      </Sheet>
    </Box>
  );
}