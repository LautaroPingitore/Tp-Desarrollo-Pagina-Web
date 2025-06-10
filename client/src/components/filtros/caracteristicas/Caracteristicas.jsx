import React, { useState } from "react";
import { caracteristicas } from "../../../mock/caracteristicas.js";

const Caracteristicas = () => {
    const [seleccionadas, setSeleccionadas] = useState([]);

    const toggleCaracteristica = (index) => {
        if (seleccionadas.includes(index)) {
            setSeleccionadas(seleccionadas.filter(i => i !== index));
        } else {
            setSeleccionadas([...seleccionadas, index]);
        }
    };

    return (
        <div className="flex flex-wrap gap-3 max-w-4xl justify-start">
            {caracteristicas.map((c, index) => (
                <button
                    type="button"
                    key={index}
                    onClick={() => toggleCaracteristica(index)}
                    className={`px-4 py-2 rounded-full shadow-sm text-sm transition-all cursor-pointer focus:outline-none
                        ${
                    seleccionadas.includes(index)
                        ? 'border-2 border-emerald-300 bg-black !text-gray-300 hover:bg-gray-700'
                        : 'border border-gray-700 bg-black !text-gray-300 hover:bg-gray-700'
                    }`}
                >
                    {c}
                </button>
            ))}
        </div>
    );
};

export default Caracteristicas;