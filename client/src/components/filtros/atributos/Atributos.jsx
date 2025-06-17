import React, { useState, useRef, useEffect } from "react";
import Calendario from '../calendario/Calendario.jsx';
import dayjs from 'dayjs';
import {getAlojamientos} from "../../../api/api.js"
import { getDestinos } from "../../../api/api.js";

const Atributos = ({ atributos, setAtributos }) => {
  const [mostrarCalendario, setMostrarCalendario] = useState(null);
  const calendarioRef = useRef();
  const [fechas, setFechas] = useState({ checkin: null, checkout: null });
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [cargandoDestinos, setCargandoDestinos] = useState(false);

  

  const [busquedaLugar, setBusquedaLugar] = useState('');
  const [mostrarDropdownLugar, setMostrarDropdownLugar] = useState(false);

  const viajerosRef = useRef();
  const [mostrarViajeros, setMostrarViajeros] = useState(false);
  const [viajeros, setViajeros] = useState(1);
  const [destinosSug, setDestinosSug] = useState([]);

  const [precioMax, setPrecioMax] = useState("");

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

  const cargarDestinosSugerencia = async () => {
  try {
    setCargandoDestinos(true); // empieza la carga
    const response = await getDestinos(pagina);
    setDestinosSug(response.data.data);
    setTotalPaginas(response.data.total_pages);
    setPagina(response.data.page);
  } catch (error) {
    console.error("Algo salió mal:", error);
  } finally {
    setCargandoDestinos(false); // termina la carga
  }
}


   useEffect(() => {
    cargarDestinosSugerencia();
  }, []);
      
  useEffect(() => {

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); 


  const actualizarViajeros = (operacion) => { // :D
    var cant = viajeros
    if (operacion === 'sumar') {
      cant = cant + 1;
      setViajeros(cant);
    } else if (operacion === 'restar') {
      cant = cant - 1;
      setViajeros(cant);
    }
    
    setAtributos({
      ...atributos,
      cantidadHuespedes : cant
    })
  };

  const getTextoViajeros = () => {
    if(viajeros === 1) {
      return "1 Persona";
    } else {
      return `${viajeros} Personas`;
    }
  };

  const handleFechasSeleccionadas = (dates) => {
    if (dates && dates.length === 2) {
      setAtributos({
        ...atributos,
        fechaInicio: dayjs(dates[0]).format('DD/MM/YYYY'),
        fechaFin: dayjs(dates[1]).format('DD/MM/YYYY'),
      })
      setFechas({
        checkin: dates[0],
        checkout: dates[1]
      });
      setMostrarCalendario(null);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-4 py-2 bg-black border border-gray-700 rounded-3xl w-full sm:border-0">

        {/* LUGAR */}
        <div className="relative w-full sm:ml-4 sm:flex-1 justify-center">
          <label className="text-xs text-gray-100 text-xs mb-1">Lugar</label>
          <input
            type="text"
            value={busquedaLugar}
            onChange={(e) => {
              setBusquedaLugar(e.target.value)
              var lugar = e.target.value
              setAtributos({
                ...atributos,
                ciudad: lugar
              })
            }}
            onFocus={() => setMostrarDropdownLugar(true)}
            
            onBlur={() => setTimeout(() => setMostrarDropdownLugar(false), 200)}
            placeholder="Explorar destinos"
            className="w-full mt-1 px-4 py-2 text-sm !text-white rounded-full bg-black border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-500 text-center"
          />
          
          {mostrarDropdownLugar && (
            <div className="absolute mt-2 w-68 max-w-md rounded-2xl shadow-lg z-[99999] bg-black max-h-96 overflow-y-auto scroll-dark">
              <div className="p-3 text-sm text-gray-500 font-semibold">Sugerencias de destinos</div>
              { cargandoDestinos ? (
                <div className="flex justify-center py-6">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
              destinosSug.filter((d) => d.nombre.toLowerCase().includes(busquedaLugar.toLowerCase()))
                .map((destino, i) => (
                  <div
                    key={i}
                    className="text-white flex items-start gap-3 px-4 py-3 hover:bg-gray-800 cursor-pointer"
                    onMouseDown={() => {
                      setBusquedaLugar(destino.nombre);
                      var lugar = destino.nombre
                      setAtributos({
                        ...atributos,
                        ciudad: lugar
                      })
                      setMostrarDropdownLugar(false);
                    }}
                  >
                    <span className="text-lg pt-1">{destino.icon}</span>
                    <div className="flex flex-col items-start">
                      <div className="font-semibold text-white leading-tight">{destino.nombre}</div>
                      <div className="text-sm text-gray-400">{destino.pais}</div>
                    </div>
                  </div>
                )))}
            </div>
          )}
        </div>

        {/* FECHAS */}
        <div className="flex sm:flex-col sm:ml-12 sm:flex-row gap-2 sm:gap-6 sm:flex-1">
          <button onClick={() => setMostrarCalendario('calendario')} className="flex flex-col text-center text-sm w-full">
            <span className="text-gray-100 text-xs">Check-in</span>
            <span className="text-gray-300 font-medium">
              {fechas.checkin ? dayjs(fechas.checkin).format('DD/MM/YYYY') : '¿Cuándo?'}
            </span>
          </button>

          <button onClick={() => setMostrarCalendario('calendario')} className="flex flex-col text-center text-sm w-full">
            <span className="text-gray-100 text-xs">Check-out</span>
            <span className="text-gray-300 font-medium">
              {fechas.checkout ? dayjs(fechas.checkout).format('DD/MM/YYYY') : '¿Cuándo?'}
            </span>
          </button>
        </div>

        {/* VIAJEROS */}
        <div className="relative w-full sm:flex-1">
          <button
            onClick={() => setMostrarViajeros(!mostrarViajeros)}
            className="flex flex-col text-center text-sm w-full"
          >
            <span className="text-gray-100 text-xs">Viajeros</span>
            <span className="text-gray-300 font-medium">{getTextoViajeros()}</span>
          </button>

          {mostrarViajeros && (
            <div
              ref={viajerosRef}
              className="absolute z-[99999] top-14 sm:top-12 left-0 bg-black rounded-xl shadow-lg p-4 w-80"
            >
              <div className="space-y-4">
                {/* Personas */}
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <h3 className="text-gray-100 font-medium">Personas</h3>
                    <p className="text-gray-400 text-xs">¿Cuántas personas son?</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => actualizarViajeros('restar')}
                      disabled={viajeros <= 1}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${viajeros <= 1
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-600 text-white hover:bg-gray-500'
                        }`}
                    >-</button>
                    <span className="text-gray-100 w-6 text-center">{viajeros}</span>
                    <button
                      onClick={() => actualizarViajeros('sumar')}
                      className="w-8 h-8 rounded-full bg-gray-600 text-white hover:bg-gray-500 flex items-center justify-center"
                    >+</button>
                  </div>
                </div>
                
              </div>
            </div>
          )}
        </div>

        <div className="relative w-full sm:ml-4 sm:flex-1 justify-center">
            <label className="text-xs text-gray-100 text-xs mb-1">Precio Maximo</label>
            <input
              type="number"
              value={precioMax}
              onChange={(e) => {
                if(e.target.value < 0) {
                  e.target.value = 0
                }
                setPrecioMax(e.target.value)
                setAtributos({
                  ...atributos,
                  precioMax: e.target.value
                })
              }}
              placeholder="precio max"
              className="w-full mt-1 px-4 py-2 text-sm !text-white rounded-full bg-black border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-500 text-center"
            />
          </div>
      </div>

      {/* CALENDARIO */}
      {mostrarCalendario && (
        <div ref={calendarioRef} className="absolute z-[99999] top-190 left-0 sm:top-16 sm:left-40 transform -translate-x-1/2 bg-black rounded-lg shadow-lg">
          <Calendario onChange={handleFechasSeleccionadas} />
        </div>
      )}
    </div>

  );
};

export default Atributos;
