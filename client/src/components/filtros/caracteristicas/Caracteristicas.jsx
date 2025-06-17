import React, { useState } from "react";
import { caracteristicasGlobales } from "../../../mock/caracteristicas.js";

const Caracteristicas = ({ atributos, setAtributos }) => {
  const [seleccionadas, setSeleccionadas] = useState([]);

  const toggleCaracteristica = (index) => {
    const yaSeleccionada = seleccionadas.includes(index)

    if (yaSeleccionada) {
        setSeleccionadas(seleccionadas.filter(i => i !== index))
        
        const nuevasCaracteristicas = atributos.caracteristicas?.filter(
            (c) => c !== caracteristicasGlobales[index]
        ) || []

        setAtributos({
            ...atributos,
            caracteristicas: nuevasCaracteristicas
        })
    } else {
        setSeleccionadas([...seleccionadas, index])

        const caracteristicasObtenidas = Array.isArray(atributos.caracteristicas)
            ? atributos.caracteristicas
            : []

        // Solo agregar si no está (por seguridad)
        if (!caracteristicasObtenidas.includes(caracteristicasGlobales[index])) {
            setAtributos({
                ...atributos,
                caracteristicas: [...caracteristicasObtenidas, caracteristicasGlobales[index]]
            })
        }
    }
}

  return (
    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 max-w-4xl sm:justify-start">
      {caracteristicasGlobales.map((c, index) => (
        <button
          type="button"
          key={index}
          onClick={() => toggleCaracteristica(index)}
          className={` px-4 py-2 rounded-full shadow-sm text-sm sm:text-xs transition-all cursor-pointer focus:outline-none
        ${seleccionadas.includes(index)
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