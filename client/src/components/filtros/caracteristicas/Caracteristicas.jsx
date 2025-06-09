import './Caracteristicas.css';
import { caracteristicas } from '../../../mock/caracteristicas.js';
import { Card } from '@mui/material';

const Caracteristicas = () => {

    return (
        <div className="caracteristicas">
            {caracteristicas.map((c, index) => 
                <Card key={index} className='caracteristica-item'>
                    {c}
                </Card>
            )}
        </div>
    )
}

export default Caracteristicas