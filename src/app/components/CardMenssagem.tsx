import { Avatar, Box, Typography } from "@mui/joy";
import { StaticImageData } from "next/image";

interface CardMenssagemProps {
    nome: string;
    mensagem: string;
    imagem: StaticImageData;
    onClick?: () => void;
    sessao?: string;
}

export default function CardMenssagem( props: CardMenssagemProps ) {
    return (
        <Box sx={{
            cursor: 'pointer',
            bgcolor: "#616161",
            width: '100%',
            height: '50px',
            borderRadius: '10px',
            boxShadow: '-1px -1px 3px rgba(158, 158, 158, 0.9), 3px 3px 3px rgba(33, 33, 33, 0.5)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
        }}
            onClick={props.onClick}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', width: '100%', pl: 0.5, color: 'white' }}>
                <Avatar src={props.imagem.src}></Avatar>
                <Box>
                    <Typography noWrap level="body-md" sx={{ marginLeft: '10px', color: 'white' }}>{props.nome}</Typography>
                    <Typography noWrap level="body-xs" sx={{ marginLeft: '10px', color: 'white' }}>{props.mensagem.length > 20 ? props.mensagem.slice(0, 25) + '...' : props.mensagem}</Typography>
                </Box>
            </Box>
        </Box>
    )
}