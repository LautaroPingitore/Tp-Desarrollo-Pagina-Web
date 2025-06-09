import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Atributos from "../../filtros/atributos/Atributos";
import Caracteristicas from "../../filtros/caracteristicas/Caracteristicas";

const BloqueFiltros = () => {
    return (
        <div className="w-full flex flex-col items-center gap-4 px-4 py-6 bg-gray-900">
            {/* Barra de filtros */}
            <div className="bg-gray-800 rounded-full shadow-md px-6 py-4 flex items-center gap-6 w-full max-w-4xl">
                <Atributos />
                <button className="p-3 rounded-full text-white transition cursor-pointer bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-medium rounded-full hover:from-emerald-600 hover:to-emerald-700 flex items-center justify-center py-4 px-4">    
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
                                        <path
                                            d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
                                        ></path>
                                    </g>
                                </svg>
                </button>
            </div>

            <Caracteristicas />
        </div>
    );
};

export default BloqueFiltros;
