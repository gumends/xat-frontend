export interface ISessaoService {
    id: string;
    usuario_id_I: string;
    usuario_id_II: string;
}

export interface ICriarSessaoService {
    usuario_id_I: string;
    usuario_id_II: string;
}

export interface IUsuario {
    email: string;
    id: string;
    nome: string;
    sobreNome: string;
}

export interface IExtendedSessaoService extends ICardsSessaoService {
    sessao_id: string;
    usuario: IUsuario; // Change the type back to IUsuario
}

export interface ICardsSessaoService {
    sessao_id: string;
    usuario: IUsuario;
    usuario_id_I: string;
}

export interface IAtualizarSessaoService extends ICriarSessaoService {}

async function criar(data: ICriarSessaoService) {
    const response = await fetch('http://localhost:3001/sessoes/criar', {
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

async function buscar(id: string): Promise<ISessaoService> {
    const response = await fetch(`http://localhost:3001/sessoes/buscar/${id}`, {
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
    buscar
}