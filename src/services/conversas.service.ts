export interface IConversaService {
    id: string;
    texto: string;
    usuario_id: string;
    sessao_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface ICriarConversaService {
    texto: string;
    usuario_id: string;
    sessao_id: string;
}

export interface IAtualizarSessaoService extends ICriarConversaService {}

async function criar(data: ICriarConversaService) {
    const response = await fetch('http://localhost:3001/conversas/criar', {
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
    const response = await fetch(`http://localhost:3001/conversas/buscar/${id}`, {
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
async function apagar(id1: string, id2: string) {
    const response = await fetch(`http://localhost:3001/conversas/apagar/${id1}/${id2}`, {
        method: 'POST',
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
    apagar
}