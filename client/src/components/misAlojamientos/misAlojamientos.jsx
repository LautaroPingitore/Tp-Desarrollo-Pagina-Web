import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

import { ArrowLeft, Home, Plus, Edit, Eye, Calendar, DollarSign, Star, Users, ArrowRight } from 'lucide-react';
import { getAlojamientosAnfitrion } from '../../api/api';
import { IconButton } from '@material-tailwind/react';

const AccommodationsView = () => {
  const [activeTab, setActiveTab] = useState('all');

  const { id } = useParams();
  const { usuario } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const [accommodations, setAccommodations] = useState([])
  
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarAlojamientosAnfitrion();
  }, [pageNumber])

  const cargarAlojamientosAnfitrion = async () => {
    try {
      setLoading(true)

      const response = await getAlojamientosAnfitrion(id, pageNumber)

      setAccommodations(response.data.data || []);
      setTotalPages(response.data.total_pages);
      if (response.data.page !== pageNumber) {
        setPageNumber(response.data.page);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error al cargar alojamientos:", error);
      setLoading(false);
    }
  }

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
                    <h1 className="text-xl font-semibold text-white">Mis Alojamientos</h1>
                  </div>
                  <div className="w-20"></div> {/* Spacer for centering */}
                </div>
              </div>
            </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        

        {/* Tabs */}
       <div className="flex items-center justify-center pt-10 bg-black relative z-10">
        {/* Flechas en desktop - solo visible en pantallas medianas y grandes */}
        <div className="hidden md:flex w-20 items-center justify-center h-full px-2">
          {pageNumber > 1 && (
            <IconButton
              size="sm"
              variant="outlined"
              onClick={handlePrevious}
              className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-800 mx-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </IconButton>
          )}
        </div>

          {/* Accommodations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl w-full px-2 flex-1 min-h-[200px]">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-300"></div>
              </div>
            ) : (
              accommodations.map((accommodation) => (
                <div key={accommodation.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
                  {/* Image */}
                  <div className="relative aspect-video">
                    <img
                      src={accommodation.fotos[0]}
                      alt={accommodation.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="border-b border-gray-500 flex items-center justify-center mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {accommodation.nombre}
                        </h3>
                        <p className="text-gray-400 text-sm">{accommodation.direccion.ciudad.nombre}, {accommodation.direccion.ciudad.pais}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-xs">Precio por noche</p>
                        <p className="text-white font-semibold">${accommodation.precioPorNoche}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Cantidad huespedes</p>
                        <p className="text-white font-semibold">{accommodation.cantHuespedesMax}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button className="flex-1 flex items-center justify-center space-x-2 py-2 border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-colors">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">Ver</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-2 py-2 bg-emerald-300 !text-black rounded-lg hover:bg-emerald-400 transition-colors">
                        <Edit className="h-4 w-4" />
                        <span className="text-sm">Editar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Flechas en desktop - solo visible en pantallas medianas y grandes */}
          <div className="hidden md:flex w-20 items-center justify-center h-full px-2">
            {pageNumber < totalPages && (
              <IconButton
                size="sm"
                variant="outlined"
                onClick={handleNext}
                className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-800 mx-2"
              >
                <ArrowRight className="h-5 w-5" />
              </IconButton>
            )}
          </div>
       </div>

      {/* Flechas en móvil - solo visible en pantallas pequeñas */}
      <div className="flex md:hidden justify-center items-center gap-4 py-4 bg-black">
        {pageNumber > 1 && (
          <IconButton
            size="sm"
            variant="outlined"
            onClick={handlePrevious}
            className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </IconButton>
        )}
        
        <span className="text-white text-sm mx-4">
          Página {pageNumber} de {totalPages}
        </span>

        {pageNumber < totalPages && (
          <IconButton
            size="sm"
            variant="outlined"
            onClick={handleNext}
            className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <ArrowRight className="h-5 w-5" />
          </IconButton>
        )}
      </div>

        {/* Empty State */}
        {accommodations.length === 0 && !loading && (
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