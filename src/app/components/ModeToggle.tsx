"use client";

import { Option, Select, useColorScheme } from "@mui/joy";

export default function ModeToggle() {
    const { mode, setMode } = useColorScheme();
  
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