import './BloqueFiltro.css'
import {AppBar} from "@mui/material"
import Atributos from "../../filtros/atributos/atributos";
import Caracteristicas from "../../filtros/caracteristicas/caracteristicas";

const BloqueFiltro = () => {

    return (
        <AppBar position="static">
            <div className='bloque-filtros'>
                <Atributos></Atributos>
                <Caracteristicas></Caracteristicas>
            </div>
        </AppBar>
    )

}

export default BloqueFiltro