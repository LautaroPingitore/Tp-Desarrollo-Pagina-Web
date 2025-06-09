import './Filtros.css'
import { Card, InputLabel, TextField, IconButton } from '@mui/material';

const Filtros = () => {
    return(
        <Card className='filtros-card'>
            <div className='filtro'>
                <InputLabel>Lugar</InputLabel>
                <TextField placeholder="Explorar destinos" variant="standard" fullWidth />
            </div>
            <div className='filtro'>
                <InputLabel>Fecha</InputLabel>
                <TextField placeholder="¿Cuándo?" variant="standard" fullWidth />
            </div>
            <div className='filtro'>
                <InputLabel>Viajeros</InputLabel>
                <TextField placeholder="¿Cuántos?" variant="standard" fullWidth />
            </div>
            <div className='buscar-boton'>
                <IconButton sx={{ backgroundColor: '#ff385c', color: 'white' }}>
                </IconButton>
            </div>
        </Card>
    );
}

export default Filtros