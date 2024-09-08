export interface IUsuarioService {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface iCriarUsuarioService {
    firstName: string;
    lastName: string;
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

export {
    criar
}