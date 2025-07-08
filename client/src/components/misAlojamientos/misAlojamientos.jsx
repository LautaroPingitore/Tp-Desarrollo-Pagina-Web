import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

import { ArrowLeft, Home, Plus, Edit, Eye, Calendar, DollarSign, Star, Users } from 'lucide-react';

const AccommodationsView = () => {
  const [activeTab, setActiveTab] = useState('all');

  const { id } = useParams();
const { usuario } = useContext(AuthContext);
  
    const navigate = useNavigate();

  const accommodations = [
    {
      id: 1,
      title: "Modern Beachfront Villa",
      location: "Malibu, California",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: 420,
      rating: 4.95,
      reviews: 127,
      status: 'active',
      bookings: 23,
      earnings: 9660,
      nextBooking: '15 Dic - 20 Dic',
      occupancy: 85
    },
    {
      id: 2,
      title: "Ocean View Apartment",
      location: "Santa Monica, CA",
      image: "https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: 320,
      rating: 4.91,
      reviews: 89,
      status: 'active',
      bookings: 18,
      earnings: 5760,
      nextBooking: '22 Dic - 25 Dic',
      occupancy: 72
    },
    {
      id: 3,
      title: "Desert Modern House",
      location: "Joshua Tree, CA",
      image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: 290,
      rating: 4.89,
      reviews: 64,
      status: 'paused',
      bookings: 12,
      earnings: 3480,
      nextBooking: null,
      occupancy: 45
    }
  ];

  



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
                    <Home className="h-5 w-5 text-emerald-300" />
                    <h1 className="text-xl font-semibold text-white pt-3">Mis Alojamientos</h1>
                  </div>
                  <div className="w-20"></div> {/* Spacer for centering */}
                </div>
              </div>
            </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        

        {/* Tabs */}
       

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {accommodations.map((accommodation) => (
            <div key={accommodation.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
              {/* Image */}
              <div className="relative aspect-video">
                <img
                  src={accommodation.image}
                  alt={accommodation.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                  accommodation.status === 'active' 
                    ? 'bg-emerald-300 text-black' 
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  {accommodation.status === 'active' ? 'Activa' : 'Pausada'}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {accommodation.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{accommodation.location}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm">{accommodation.rating}</span>
                    <span className="text-gray-400 text-sm">({accommodation.reviews})</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-xs">Precio por noche</p>
                    <p className="text-white font-semibold">${accommodation.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Ocupación</p>
                    <p className="text-white font-semibold">{accommodation.occupancy}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Reservas</p>
                    <p className="text-white font-semibold">{accommodation.bookings}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Ganancias</p>
                    <p className="text-white font-semibold">${accommodation.earnings.toLocaleString()}</p>
                  </div>
                </div>


                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">Ver</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 bg-emerald-300 text-black rounded-lg hover:bg-emerald-400 transition-colors">
                    <Edit className="h-4 w-4" />
                    <span className="text-sm">Editar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {accommodations.length === 0 && (
          <div className="text-center py-12">
            <Home className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No tienes alojamientos {activeTab !== 'all' ? activeTab === 'active' ? 'activos' : 'pausados' : ''}
            </h3>
            <p className="text-gray-500 mb-6">
              Crea tu primer alojamiento para empezar a recibir huéspedes.
            </p>
            <button className="bg-emerald-300 text-black px-6 py-3 rounded-lg font-semibold hover:bg-emerald-400 transition-colors">
              Crear alojamiento
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccommodationsView;