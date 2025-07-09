import React, { useState, useContext, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, User, Star, MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react'
import { AuthContext } from '../../context/authContext'
import { getReservasAnfitrion, getReservasHuesped } from '../../api/api'
import { IconButton } from '@material-tailwind/react'


const Reservas = () => {

const [activeTab, setActiveTab] = useState('upcoming')

  const { id } = useParams()
  const { tipoUsuario } = useContext(AuthContext)
  
  const navigate = useNavigate()

  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)

  const [reservas, setReservas] = useState([])

  useEffect(() => {
    cargarReservas()
  }, [pageNumber])

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const cargarReservas = async () => {
    try {
      setLoading(true)

      let response
      if(tipoUsuario === 'huesped') {
        response = await getReservasHuesped(id, pageNumber)

        setReservas(response.data.data || [])
        setTotalPages(response.data.total_pages)
        if (response.data.page !== pageNumber) {
          setPageNumber(response.data.page)
        }

        console.log(response.data)
        setLoading(false)
      } else if(tipoUsuario === 'anfitrion') {
        response = await getReservasAnfitrion(id, pageNumber)

        setReservas(response.data.data || [])
        setTotalPages(response.data.total_pages)
        if (response.data.page !== pageNumber) {
          setPageNumber(response.data.page)
        }
        
        setLoading(false)
      }

    } catch(error) {
      setLoading(false)
    }
  }

  const getFilteredReservations = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizamos la fecha para comparar solo días

    return reservas.filter(reservation => {
      const checkOut = new Date(reservation.rangoFechas.fechaFin);
      checkOut.setHours(0, 0, 0, 0);

      if (activeTab === 'upcoming') {
        return checkOut >= today;
      } else if (activeTab === 'past') {
        return checkOut < today;
      }
      return true;
    });
  };

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'CONFIRMADA': return 'bg-emerald-900 text-emerald-300'
      case 'COMPLETADA': return 'bg-gray-700 text-gray-300'
      case 'CANCELADA': return 'bg-red-900 text-red-300'
      default: return 'bg-gray-700 text-gray-300'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'CONFIRMADA': return 'Confirmada'
      case 'PENDIENTE': return 'Pendiente'
      case 'CANCELADA': return 'Cancelada'
      default: return status
    }
  }

  return (
  <div className="min-h-screen bg-black">
    {/* Header */}
    <div className="sticky top-0 z-50 bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-white hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Volver</span>
          </button>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-emerald-300" />
            <h1 className="text-xl font-semibold text-white pt-3">Mis Reservas</h1>
          </div>
          <div className="w-20"></div>
        </div>
      </div>
    </div>

    {/* Contenedor principal con flechas laterales */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-start gap-4">
        {/* Flecha izquierda */}
        <div className="flex items-center h-full sticky top-32">
          {pageNumber > 1 && (
            <button
              onClick={handlePrevious}
              className="rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Contenido central */}
        <div className="flex-1">
          {/* Tabs (descomenta si lo necesitas) */}
          {/* <div className="flex space-x-1 mb-8 bg-gray-900 p-1 rounded-lg w-fit">
            {[
              { id: 'upcoming', label: 'Próximas' },
              { id: 'past', label: 'Pasadas' }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-emerald-300 text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div> */}

          {/* Lista de reservas */}
          <div className="space-y-6">
            {reservas.map((reservation) => (
              <div key={reservation.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
                <div className="md:flex">
                  {/* Imagen */}
                  <div className="md:w-48 md:flex-shrink-0">
                    <img
                      src={reservation.alojamiento.fotos[0]}
                      alt={reservation.alojamiento.nombre}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {reservation.alojamiento.nombre}
                        </h3>
                        <div className="flex items-center space-x-1 text-gray-400 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{reservation.alojamiento.direccion.ciudad.pais.nombre}, {reservation.alojamiento.direccion.ciudad.nombre}</span>
                        </div>
                        {tipoUsuario === 'huesped' && (
                          <p className="text-gray-400 text-sm">
                            Anfitrión: {reservation.alojamiento.anfitrion.nombre} {reservation.alojamiento.anfitrion.apellido}
                          </p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.estado)}`}>
                        {getStatusText(reservation.estado)}
                      </span>
                    </div>

                    {/* Info de huésped (para anfitriones) */}
                    {tipoUsuario === 'anfitrion' && (
                      <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-800 rounded-lg">
                        <div className="flex-1">
                          <p className="text-white font-medium">{reservation.huespedReservador.nombre} {reservation.huespedReservador.apellido}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Mail className="h-3 w-3" />
                              <span>{reservation.huespedReservador.email}</span>
                            </div>
                          </div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                          <MessageCircle className="h-5 w-5" />
                        </button>
                      </div>
                    )}

                    {/* Detalles de la reserva */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Check-in</p>
                        <p className="text-white font-medium">
                          {reservation.rangoFechas.fechaInicio}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Check-out</p>
                        <p className="text-white font-medium">
                          {reservation.rangoFechas.fechaFin}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Huéspedes</p>
                        <p className="text-white font-medium">{reservation.huespedReservador.nombre} {reservation.huespedReservador.nombre}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Estado vacío */}
          {reservas.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No tienes reservas {activeTab === 'upcoming' ? 'próximas' : 'pasadas'}
              </h3>
              <p className="text-gray-500">
                {activeTab === 'upcoming' 
                  ? 'Cuando hagas una reserva, aparecerá aquí.' 
                  : 'Tus reservas completadas aparecerán aquí.'
                }
              </p>
            </div>
          )}
        </div>

        {/* Flecha derecha */}
        <div className="flex items-center h-full sticky top-32">
          {pageNumber < totalPages && (
            <button
              onClick={handleNext}
              className="rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 p-2"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
)
}

export default Reservas