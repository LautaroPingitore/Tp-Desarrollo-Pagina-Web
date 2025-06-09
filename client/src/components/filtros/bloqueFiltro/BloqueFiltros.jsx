import './BloqueFiltros.css'
import {AppBar} from "@mui/material"
import Atributos from "../../filtros/atributos/Atributos";
import Caracteristicas from "../../filtros/caracteristicas/Caracteristicas";

const BloqueFiltros = () => {

    return (
        <AppBar position="static">
            <div className='bloque-filtros'>
                <Atributos></Atributos>
                <Caracteristicas></Caracteristicas>
            </div>
        </AppBar>
    )
}

export default BloqueFiltros