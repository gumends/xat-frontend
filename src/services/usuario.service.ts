export interface IUsuarioService {
    nome: string;
    email: string;
    id: string;
    avatar?: string;
}

export interface iCriarUsuarioService {
    nome: string;
    email: string;
    password: string;
}

const apiUlr = process.env.API_URL;

async function criar(data: iCriarUsuarioService) {
    const response = await fetch('http://localhost:3001/usuario/criar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...data
        }),
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function buscar(id: string) {
    const response = await fetch(`http://localhost:3001/usuario/criar/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function atualizar(id: string, data: iCriarUsuarioService) {
    const response = await fetch(`http://localhost:3001/usuario/atualizar/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...data
        }),
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function ativar_desativar(id: string) {
    const response = await fetch(`http://localhost:3001/usuario/ativar_desativar/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function contato(email: string) {
    const response = await fetch(`http://localhost:3001/usuario/contato/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function atualizar_senha(id: string) {
    const response = await fetch(`http://localhost:3001/usuario/atualizar_senha/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function apagar(id: string) {
    const response = await fetch(`http://localhost:3001/usuario/apagar/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

async function buscarTodos(busca?: string) {
    const response = await fetch(`http://localhost:3001/usuario/listar?busca=${busca}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export {
    criar,
    buscar,
    atualizar,
    ativar_desativar,
    contato,
    atualizar_senha,
    apagar,
    buscarTodos
}