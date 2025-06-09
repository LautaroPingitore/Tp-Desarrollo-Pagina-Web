import React, { useState, useRef, useEffect } from "react";
import Calendario from '../calendario/Calendario.jsx';
import dayjs from 'dayjs';

const Atributos = () => {
    const [mostrarCalendario, setMostrarCalendario] = useState(null);
    const calendarioRef = useRef();
    const [fechas, setFechas] = useState({ checkin: null, checkout: null });

    const handleClickOutside = (e) => {
        if (calendarioRef.current && !calendarioRef.current.contains(e.target)) {
            setMostrarCalendario(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFechasSeleccionadas = (dates) => {
        if (dates && dates.length === 2) {
            setFechas({
                checkin: dates[0],
                checkout: dates[1]
            });
            setMostrarCalendario(null);
        }
    };

    return (
        <div className="relative w-full">
            <div className="flex justify-between items-center gap-6 px-4 py-1">
                <button className="flex flex-col items-center text-sm cursor-pointer text-center">
                    <span className="text-gray-100">Lugar</span>
                    <span className="text-gray-300 font-medium">Explorar destinos</span>
                </button>

                <button
                    onClick={() => setMostrarCalendario('calendario')}
                    className="flex flex-col items-center text-sm cursor-pointer text-center border-l border-gray-300 pl-16"
                >
                    <span className="text-gray-100">Check-in</span>
                    <span className="text-gray-300 font-medium">
                        {fechas.checkin ? dayjs(fechas.checkin).format('DD/MM/YYYY') : '¿Cuándo?'}
                    </span>
                </button>

                <button
                    onClick={() => setMostrarCalendario('calendario')}
                    className="flex flex-col items-center text-sm cursor-pointer text-center border-l border-gray-300 pl-17"
                >
                    <span className="text-gray-100">Check-out</span>
                    <span className="text-gray-300 font-medium">
                        {fechas.checkout ? dayjs(fechas.checkout).format('DD/MM/YYYY') : '¿Cuándo?'}
                    </span>
                </button>

                <button className="flex flex-col items-center text-sm cursor-pointer text-center border-l border-gray-300 pl-6">
                    <span className="text-gray-100">Viajeros</span>
                    <span className="text-gray-300 font-medium">¿Cuántos?</span>
                </button>
            </div>

            {mostrarCalendario && (
                <div ref={calendarioRef} className="absolute z-50 top-8 left-1/3 transform -translate-x-1/2 bg-white rounded-lg shadow-lg">
                    <Calendario onChange={handleFechasSeleccionadas} />
                </div>
            )}
        </div>
    );
};

export default Atributos;
