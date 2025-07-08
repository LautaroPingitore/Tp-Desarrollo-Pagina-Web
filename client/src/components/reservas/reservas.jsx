import React, { useState, useContext, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { ArrowLeft, Calendar, MapPin, User, Star, MessageCircle, Phone, Mail } from 'lucide-react';
import { AuthContext } from '../../context/authContext';
import { getReservasAnfitrion, getReservasHuesped } from '../../api/api';


const Reservas = () => {

const [activeTab, setActiveTab] = useState('upcoming');

  const { id } = useParams();
  // FIXME: Te retorna null esto
  const { tipoUsuario} = useContext(AuthContext);
  
  const navigate = useNavigate();

  const [guestReservations, setGuestReservations] = useState([])
  const [hostReservations, setHostReservations] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarReservas();
  }, [pageNumber])

  const cargarReservas = async () => {
    try {
      setLoading(true)

      let response
      if(tipoUsuario === 'Huesped') {
        response = await getReservasHuesped(id, { page: pageNumber });

        setGuestReservations(response.data.data || []);
        setTotalPages(response.data.total_pages);
        if (response.data.page !== pageNumber) {
          setPageNumber(response.data.page);
        }

        setLoading(false);
      } else if(tipoUsuario === 'Anfitrion') {
        response = await getReservasAnfitrion(id, { page: pageNumber });

        setHostReservations(response.data.data || []);
        setTotalPages(response.data.total_pages);
        if (response.data.page !== pageNumber) {
          setPageNumber(response.data.page);
        }

        setLoading(false);
      }

    } catch(error) {
      setLoading(false)
    }
  }

  const reservations = tipoUsuario === 'Huesped' ? guestReservations : hostReservations;

  const filteredReservations = reservations.filter(reservation => {
    const today = new Date();
    const checkIn = new Date(reservation.checkIn);
    const checkOut = new Date(reservation.checkOut);
    
    if (activeTab === 'upcoming') {
      return checkIn > today || (checkIn <= today && checkOut >= today);
    } else if (activeTab === 'past') {
      return checkOut < today;
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-900 text-emerald-300';
      case 'completed': return 'bg-gray-700 text-gray-300';
      case 'cancelled': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

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
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-900 p-1 rounded-lg w-fit">
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
        </div>

        {/* Reservations List */}
        <div className="space-y-6">
          {filteredReservations.map((reservation) => (
            <div key={reservation.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
              <div className="md:flex">
                {/* Image */}
                <div className="md:w-48 md:flex-shrink-0">
                  <img
                    src={reservation.property.image}
                    alt={reservation.property.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {reservation.property.title}
                      </h3>
                      <div className="flex items-center space-x-1 text-gray-400 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{reservation.property.location}</span>
                      </div>
                      {tipoUsuario === 'Huesped' && (
                        <p className="text-gray-400 text-sm">
                          Anfitrión: {reservation.property.host}
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                      {getStatusText(reservation.status)}
                    </span>
                  </div>

                  {/* Guest Info (for hosts) */}
                  {tipoUsuario === 'Anfitrion' && (
                    <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-800 rounded-lg">
                      <img
                        src={reservation.guest.avatar}
                        alt={reservation.guest.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-white font-medium">{reservation.guest.name}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{reservation.guest.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{reservation.guest.email}</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <MessageCircle className="h-5 w-5" />
                      </button>
                    </div>
                  )}

                  {/* Booking Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Check-in</p>
                      <p className="text-white font-medium">
                        {new Date(reservation.checkIn).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Check-out</p>
                      <p className="text-white font-medium">
                        {new Date(reservation.checkOut).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Huéspedes</p>
                      <p className="text-white font-medium">{reservation.guests}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-center pt-4 border-t border-gray-800">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Total</p>
                      <p className="text-white font-bold text-lg">${reservation.total.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Rating (for completed reservations) */}
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReservations.length === 0 && (
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
    </div>
  );
};

export default Reservas;