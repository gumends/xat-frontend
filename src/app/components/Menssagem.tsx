import { Box, Typography } from "@mui/joy"
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
interface MenssagemProps {
    texto?: string
    imagem?: string
    horario: string
    lado: boolean
}

export default function Menssagem(props: MenssagemProps) {
    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: props.lado ? 'end' : 'start', alignItems: 'center' }}>
            <Box sx={{
                maxWidth: "25%",
                bgcolor: props.lado ? '#7c4dff' : '#651fff',
                p: 2,
                borderTopRightRadius: props.lado ? '0px' : '10px',
                borderTopLeftRadius: props.lado ? '10px' : '0px',
                borderBottomRightRadius: '10px',
                borderBottomLeftRadius: '10px',
            }}>
                <Box>
                    <Typography sx={{ color: 'white' }} level="body-lg">{props.texto}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, alignItems: 'center', gap: 2,flexDirection: props.lado ? 'row-reverse' : 'row',}}>
                    <Typography sx={{ color: 'white' }} level="body-xs">{props.horario}</Typography>
                    <DoneAllRoundedIcon sx={{ color: '#00e676' }} />
                </Box>
            </Box>
        </Box>
    )
}