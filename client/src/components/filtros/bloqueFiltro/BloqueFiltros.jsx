import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Atributos from "../../filtros/atributos/Atributos";
import Caracteristicas from "../../filtros/caracteristicas/Caracteristicas";
import { useState } from "react";

const BloqueFiltros = ({filtros, setFiltros}) => {
    const [atributos, setAtributos] = useState(
       { 
        pais: null,
        fechaEntrada: null,
        fechaSalida: null,
        cantidadHuespedes: 1,
        precioMax: null,
        caracteristicas: null
       }
    )

    const actualizarFiltros = () => {
        setFiltros(atributos);
    }

    return (
        <div className="w-full flex flex-col items-center gap-4 px-4 py-6 bg-black relative z-50">
            {/* Barra de filtros */}
        <div className="bg-black rounded-full sm:border sm:border-white/20 sm:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] px-6 py-4 grid sm:flex items-center gap-6 w-full max-w-4xl relative z-50">
            <Atributos atributos={atributos} setAtributos={setAtributos} />
            <button className="p-3 rounded-full text-black cursor-pointer bg-gradient-to-r from-emerald-300 to-emerald-400 hover:from-emerald-400 hover:to-emerald-500 flex items-center justify-center py-4 px-4 font-medium transition" onClick={actualizarFiltros}>
                <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                    display: 'block',
                    width: '15px',
                    height: '15px',
                    fill: 'none',
                    stroke: 'white',
                    strokeWidth: 5.33,
                    overflow: 'visible',
                }}
                >
                <g fill="none">
                    <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                </g>
                </svg>
            </button>
            </div>

            <Caracteristicas atributos={atributos} setAtributos={setAtributos}/>
        </div>
    );
};

export default BloqueFiltros;
