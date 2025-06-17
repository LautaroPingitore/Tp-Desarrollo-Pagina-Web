import React from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Atributos from "../../filtros/atributos/Atributos";
import Caracteristicas from "../../filtros/caracteristicas/Caracteristicas";
import { useState } from "react";

const BloqueFiltros = ({filtros, setFiltros, pageNumber, setPageNumber}) => {
    const [atributos, setAtributos] = useState(
       { 
        ciudad: null,
        fechaInicio: null,
        fechaFin: null,
        cantidadHuespedes: 1,
        precioMax: null,
        caracteristicas: null
       }
    )

    const resetearFiltros = () => {
        const filtrosBase = {
            ciudad: null,
            fechaInicio: null,
            fechaFin: null,
            cantidadHuespedes: 1,
            precioMax: null,
            caracteristicas: null
        };
        setAtributos(filtrosBase);
        if(pageNumber > 1) {
            setPageNumber(1)
        }
        setFiltros(atributos);
    }

    const actualizarFiltros = () => {
        if(pageNumber > 1) {
            setPageNumber(1)
        }
        setFiltros(atributos);
    }

    return (
        <div className="w-full flex flex-col items-center gap-4 px-4 py-6 bg-black relative z-50">
            {/* Barra de filtros */}
            <div className="bg-black rounded-full sm:border sm:border-white/20 sm:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] px-6 py-4 grid sm:flex items-center gap-6 w-full max-w-4xl relative z-50">
                <Atributos atributos={atributos} setAtributos={setAtributos} />
                
                <div className="flex items-center gap-2">
                    {/* Botón de reset */}
                    <button 
                        onClick={resetearFiltros}
                        className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                        title="Resetear filtros"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                    
                    {/* Botón de búsqueda */}
                    <button 
                        className="p-3 rounded-full text-black cursor-pointer bg-gradient-to-r from-emerald-300 to-emerald-400 hover:from-emerald-400 hover:to-emerald-500 flex items-center justify-center py-4 px-4 font-medium transition" 
                        onClick={actualizarFiltros}
                    >
                        <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                    </button>
                </div>
            </div>

            <Caracteristicas atributos={atributos} setAtributos={setAtributos}/>
        </div>
    );
};

export default BloqueFiltros;
