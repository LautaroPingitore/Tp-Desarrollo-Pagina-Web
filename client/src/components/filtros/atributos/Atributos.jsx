import React from "react";

const Atributos = () => {
    return (
        <div className="flex flex-1 justify-between items-center gap-6 px-4 py-1">
            <button className="flex flex-col items-center text-sm cursor-pointer text-center" >
                <span className="text-gray-100">Lugar</span>
                <span className="text-gray-300 font-medium">Explorar destinos</span>
            </button>
            <button className="flex flex-col items-center text-sm cursor-pointer text-center border-l border-gray-300 pl-16" >
                <span className="text-gray-100">Check-in</span>
                <span className="text-gray-300 font-medium">¿Cuándo?</span>
            </button>
            <button className="flex flex-col items-center text-sm cursor-pointer text-center border-l border-gray-300 pl-17">
                <span className="text-gray-100">Check-out</span>
                <span className="text-gray-300 font-medium">¿Cuándo?</span>
            </button>
            <button className="flex flex-col items-center text-sm cursor-pointer text-center border-l border-gray-300 pl-6">
                <span className="text-gray-100">Viajeros</span>
                <span className="text-gray-300 font-medium">¿Cuántos?</span>
            </button>
        </div>
    );
};

export default Atributos;