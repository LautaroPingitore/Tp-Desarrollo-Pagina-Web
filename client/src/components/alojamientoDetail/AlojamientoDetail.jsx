import React, { useState, useRef, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share, Star, MapPin, Users, Bed, Bath, Wifi, Car, AirVent, Waves, Calendar, User, Dog } from 'lucide-react';
import Calendario from '../filtros/calendario/Calendario.jsx';
import dayjs from 'dayjs';

const AlojamientoDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const alojamiento = location.state?.alojamiento;

  // Si no hay alojamiento en el state, usar datos por defecto
  const property = alojamiento ;  // Datos del host (mock)
  const hostData = {
    name: "María",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    superhost: true
  };  const [_selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [_isLiked, _setIsLiked] = useState(false);
  const [mostrarCalendario, setMostrarCalendario] = useState(null);
  const calendarioRef = useRef();
  const [fechas, setFechas] = useState({ checkin: null, checkout: null });
  const [guests, setGuests] = useState(1);

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
  const amenityIcons = {
    'WIFI': <Wifi className="w-5 h-5" />,
    'MASCOTAS': <Dog  className="w-5 h-5" />,
    'PILETA': <Waves className="w-5 h-5" />,
    'ESTACIONAMIENTO': <Car className="w-5 h-5" />,
  };  const calculateTotal = () => {
    if (!fechas.checkin || !fechas.checkout) return 0;
    const days = Math.ceil((fechas.checkout.toDate().getTime() - fechas.checkin.toDate().getTime()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * property.precioPorNoche : 0;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="top-0 z-10 bg-black backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 text-white">            <button
              onClick={() => navigate(-1)}
              className="cursor-pointer flex items-center space-x-2 text-white hover:text-pink-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white text-left mb-2">{property.nombre}</h1>
          <div className="flex items-center space-x-4 text-gray-300">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-current text-pink-500" />
              <span>{property.rating || 4.8}</span>
              <span>({property.reviewCount || 127} reseñas)</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{property.direccion.ciudad.nombre || "Buenos Aires, Argentina"}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 mb-8 h-96">          <div className="col-span-2 row-span-2">
            <img
              src={property.fotos?.[0] || "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}
              alt={property.nombre}
              className="w-full h-full object-cover rounded-l-xl cursor-pointer"
              onClick={() => setSelectedImageIndex(0)}
            />
          </div>
          {property.fotos?.slice(1, 5).map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`${property.nombre} ${index + 2}`}
                className={`w-full h-full object-cover cursor-pointer ${
                  index === 1 ? 'rounded-tr-xl' : index === 3 ? 'rounded-br-xl' : ''
                }`}
                onClick={() => setSelectedImageIndex(index + 1)}
              />
              {index === 3 && property.fotos?.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-br-xl">
                  <span className="text-white font-medium">+{property.fotos.length - 5} fotos</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host Info */}
            <div className="flex items-center justify-between pb-8 border-b border-gray-800">              <div>
                <h2 className="text-2xl font-semibold text-white mb-2 text-left">
                  {property.propertyType || "Alojamiento completo"} ofrecido por {property.anfitrion.nombre}
                </h2>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span>{property.cantHuespedesMax} huéspedes</span>
                </div>
              </div>
            </div>            {/* Description */}
            <div className="pb-8 border-b border-gray-800 text-left">
              <h3 className="text-xl font-bold text-white mb-4">Acerca de este lugar</h3>
              <p className="text-gray-300 leading-relaxed">{property.descripcion}</p>
            </div>

            {/* Amenities */}
            <div className="pb-8 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white text-left mb-4">Lo que ofrece este lugar</h3>
              <div className="grid grid-cols-2 gap-4">
                {(property.caracteristicas || ['Wifi', 'Mascotas', 'AC', 'Estacionamiento']).map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg !text-white">
                    {amenityIcons[amenity] || <div className="w-5 h-5 bg-gray-600 rounded"></div>}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1 relative text-center">
            <div className="top-24 bg-black rounded-xl border border-gray-700 p-6 shadow-xl text-center">              <div className="flex items-baseline space-x-2 mb-6 justify-center">
                <span className="text-3xl font-bold text-white ">${property.precioPorNoche}</span>
                <span className="text-gray-400">noche</span>
              </div>              {/* Date Selection */}
              <div className="space-y-4 mb-6 relative">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMostrarCalendario('calendario')}
                    className="space-y-1 text-center"
                  >
                    <label className="text-sm text-gray-400 uppercase tracking-wide font-semibold text-center">
                      Entrada
                    </label>                    
                    <div className={`text-white w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer ${fechas.checkin ? 'text-black' : 'text-black'}`}>
                      {fechas.checkin ? dayjs(fechas.checkin).format('DD/MM/YYYY') : 'Seleccionar fecha'}
                    </div>
                  </button>
                  <button
                    onClick={() => setMostrarCalendario('calendario')}
                    className="space-y-1 "
                  >
                    <label className="text-sm text-gray-400 uppercase tracking-wide text-center font-semibold">
                      Salida
                    </label>
                    <div className={`text-white w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer ${fechas.checkout ? 'text-black' : 'text-black'}`}>
                      {fechas.checkout ? dayjs(fechas.checkout).format('DD/MM/YYYY') : 'Seleccionar fecha'}
                    </div>
                  </button>                </div>                {/* CALENDARIO */}
                {mostrarCalendario && (
                  <div
                  ref={calendarioRef}
                  className="relative z-[99999] top-78 -right-43 bg-black rounded-lg !shadow-lg border border-gray-600"
                >
                  <Calendario onChange={handleFechasSeleccionadas} />
                </div>
                )}

                <div className="space-y-1 !font-xl">
                  <label className="text-sm text-gray-400 font-semibold uppercase tracking-wide mb-9 py-2">
                    Huéspedes
                  </label>                  
                  <select
                value={guests}  // Usa la variable de estado
                onChange={(e) => setGuests(Number(e.target.value))}
                className="!text-white !text-sm w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer text-center"
              >
                {Array.from({ length: property.cantHuespedesMax }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} huésped{num > 1 ? 'es' : ''}
                  </option>
                ))}
              </select>
                </div>
              </div>{/* Reserve Button */}
              <button className="!text-black w-full cursor-pointer bg-gradient-to-r from-emerald-300 to-emerald-400 hover:from-emerald-400 hover:to-emerald-500 flex items-center justify-center py-4 px-4 font-semibold transition duration-200 shadow-lg hover:shadow-xl mb-4 rounded-lg ">
                Reservar
              </button>

              <p className="text-center text-gray-400 text-sm mb-4">
                Aún no se te cobrará
              </p>              {/* Price Breakdown */}
              {fechas.checkin && fechas.checkout && (
                <div className="space-y-2 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-gray-300">
                    <span>${property.precioPorNoche} x {Math.ceil((fechas.checkout.toDate().getTime() - fechas.checkin.toDate().getTime()) / (1000 * 60 * 60 * 24))} noches</span>
                    <span>${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tarifa del servicio</span>
                    <span>${Math.round(calculateTotal() * 0.14)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-white pt-2 border-t border-gray-700">
                    <span>Total</span>
                    <span>${calculateTotal() + Math.round(calculateTotal() * 0.14)}</span>
                  </div>
                </div>
              )}
            </div>              </div>
        </div>
      </div>
    </div>
  );
};

export default AlojamientoDetail;