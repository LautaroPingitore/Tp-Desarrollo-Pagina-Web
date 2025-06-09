import React, { useState, useRef, useEffect } from "react";
import Calendario from '../calendario/Calendario.jsx';
import dayjs from 'dayjs';

const Atributos = () => {
    const [mostrarCalendario, setMostrarCalendario] = useState(null);
    const calendarioRef = useRef();
    const [fechas, setFechas] = useState({ checkin: null, checkout: null });

    const [busquedaLugar, setBusquedaLugar] = useState('');
    const [mostrarDropdownLugar, setMostrarDropdownLugar] = useState(false);

    const viajerosRef =useRef();
    const [mostrarViajeros, setMostrarViajeros] = useState(false);
    const [viajeros, setViajeros] = useState({
        personas: 1,
        mascotas: 0
    });


    const destinosSugerencia = [
    { icon: "📍", title: "En la zona", description: "Descubrí qué hay cerca de vos" },
    { icon: "🏙️", title: "Buenos Aires, Provincia de Buenos Aires", description: "Obelisco de Buenos Aires" },
    { icon: "🌊", title: "Mar Azul, Provincia de Buenos Aires", description: "Alojamientos en Mar Azul" },
    { icon: "🌲", title: "Cariló, Provincia de Buenos Aires", description: "Por su encanto costero" },
    { icon: "🏖️", title: "Mar del Plata, Provincia de Buenos Aires", description: "Destino de playa popular" },
    { icon: "🏔️", title: "San Carlos de Bariloche, Provincia de Río Negro", description: "Cerca del Parque Nacional Nahuel Huapi" }
];

    const handleClickOutside = (e) => {
        if (calendarioRef.current && !calendarioRef.current.contains(e.target)) {
            setMostrarCalendario(null);
        }
        if (viajerosRef.current && !viajerosRef.current.contains(e.target)) {
            setMostrarViajeros(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const actualizarViajeros = (tipo, operacion) => {
        setViajeros(prev => {
            const nuevoValor = operacion === 'sumar' ? prev[tipo] + 1 : prev[tipo] - 1;
            
            // Validaciones
            if (tipo === 'personas' && nuevoValor < 1) return prev;
            if (( tipo === 'mascotas') && nuevoValor < 0) return prev;
            
            return {
                ...prev,
                [tipo]: nuevoValor
            };
        });
    };

    const getTextoViajeros = () => {
        const { personas,  mascotas } = viajeros;
        let texto = `${personas} ${personas === 1 ? 'persona' : 'personas'}`;
        if (mascotas > 0) texto += `, ${mascotas} ${mascotas === 1 ? 'mascota' : 'mascotas'}`;
        return texto === '1 persona' ? '1 persona' : texto;
    };

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

                {/* LUGAR */}
                <div className="relative ">
                    <label className="text-xs text-gray-100">Lugar</label>
                    <br />
                    <input
                        type="text"
                        value={busquedaLugar}
                        onChange={(e) => setBusquedaLugar(e.target.value)}
                        onFocus={() => setMostrarDropdownLugar(true)}
                        onBlur={() => setTimeout(() => setMostrarDropdownLugar(false), 200)}
                        placeholder="Explorar destinos"
                        className="w-full mt-1 px-4 py-2 text-sm text-gray-600 rounded-full bg-gray-200 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-500"
                    />

                    {mostrarDropdownLugar && (
            <div className="bg-gray-900 absolute mt-2 w-[26rem] rounded-2xl shadow-lg z-50 max-h-96 overflow-y-auto scroll-dark">
                <div className="p-3 text-sm text-gray-500 font-semibold">Sugerencias de destinos</div>
                {destinosSugerencia
                    .filter((d) => d.title.toLowerCase().includes(busquedaLugar.toLowerCase()))
                    .map((destino, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-800 cursor-pointer"
                            onMouseDown={() => {
                                setBusquedaLugar(destino.title);
                                setMostrarDropdownLugar(false);
                            }}
                        >
                            <span className="text-lg pt-1">{destino.icon}</span>
                            <div className="flex flex-col items-start">
                                <div className="font-semibold text-white leading-tight">{destino.title}</div>
                                <div className="text-sm text-gray-400 leading-tight group-hover:text-gray-200">{destino.description}</div>
                            </div>
                        </div>
                    ))}
                    </div>
                )}
                </div>

                {/* CHECK-IN */}
                <button
                    onClick={() => setMostrarCalendario('calendario')}
                    className="text-xs flex flex-col items-center text-sm cursor-pointer text-center border-l border-gray-300 pl-6"
                >
                    <span className="text-gray-100 text-xs">Check-in</span>
                    <span className="text-gray-300 font-medium ">
                        {fechas.checkin ? dayjs(fechas.checkin).format('DD/MM/YYYY') : '¿Cuándo?'}
                    </span>
                </button>

                {/* CHECK-OUT */}
                <button
                    onClick={() => setMostrarCalendario('calendario')}
                    className="flex flex-col items-center text-sm cursor-pointer text-center border-l border-gray-300 pl-17"
                >
                    <span className="text-gray-100 text-xs">Check-out</span>
                    <span className="text-gray-300 font-medium">
                        {fechas.checkout ? dayjs(fechas.checkout).format('DD/MM/YYYY') : '¿Cuándo?'}
                    </span>
                </button>

                {/* VIAJEROS */}
               <div className="relative">
                    <button 
                        onClick={() => setMostrarViajeros(!mostrarViajeros)}
                        className="flex flex-col items-center text-sm cursor-pointer text-center border-l border-gray-300 pl-6"
                    >
                        <span className="text-gray-100 text-xs">Viajeros</span>
                        <span className="text-gray-300 font-medium">
                            {getTextoViajeros()}
                        </span>
                    </button>

                    {mostrarViajeros && (
                        <div 
                                ref={viajerosRef}
                                className="absolute z-50 top-12 left-0 bg-gray-900 rounded-xl shadow-lg p-4 w-84"
                        >
                            <div className="space-y-4">
                                {/* Personas */}
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-gray-100 font-medium">Personas</h3>
                                        <p className="text-gray-400 text-xs">¿Cuantas personas son?</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => actualizarViajeros('personas', 'restar')}
                                            disabled={viajeros.personas <= 1}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                viajeros.personas <= 1 
                                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                                                    : 'bg-gray-600 text-white hover:bg-gray-500'
                                            }`}
                                        >
                                            <span className="text-white">-</span>
                                        </button>
                                        <span className="text-gray-100 w-6 text-center">{viajeros.personas}</span>
                                        <button 
                                            onClick={() => actualizarViajeros('personas', 'sumar')}
                                            className="w-8 h-8 rounded-full bg-gray-600 text-white hover:bg-gray-500 flex items-center justify-center"
                                        >
                                            <span className="text-white">+</span>
                                        </button>
                                    </div>
                                </div>
                            
                                {/* Mascotas */}
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-gray-100 font-medium">Mascotas</h3>
                                        <p className="text-gray-400 text-xs">¿Traes a tu compañero?</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => actualizarViajeros('mascotas', 'restar')}
                                            disabled={viajeros.mascotas <= 0}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                viajeros.mascotas <= 0 
                                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                                                    : 'bg-gray-600 text-white hover:bg-gray-500'
                                            }`}
                                        >
                                             <span className="text-white">-</span>
                                        </button>
                                        <span className="text-gray-100 w-6 text-center">{viajeros.mascotas}</span>
                                        <button 
                                            onClick={() => actualizarViajeros('mascotas', 'sumar')}
                                            className="w-8 h-8 rounded-full bg-gray-600 text-white hover:bg-gray-500 flex items-center justify-center"
                                        >
                                            <span className="text-white">+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* CALENDARIO */}
            {mostrarCalendario && (
                <div ref={calendarioRef} className="absolute z-50 top-8 left-1/3 transform -translate-x-1/2 bg-white rounded-lg shadow-lg">
                    <Calendario onChange={handleFechasSeleccionadas} />
                </div>
            )}
        </div>
    );
};

export default Atributos;
