import React, { useState, useContext, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Bell } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { getNotificacionesAnfitrion, getNotificacionesHuesped, marcarLeidaAnfitrion, marcarLeidaHuesped } from '../../api/api';

const NotificationsView = () => {
  const { id } = useParams();
  const { tipoUsuario } = useContext(AuthContext)

  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mostrarLeidas, setMostrarLeidas] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    cargarNotificaciones();
  }, [pageNumber, mostrarLeidas]);

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

  const cargarNotificaciones = async () => {
    try {
      if (tipoUsuario === 'huesped') {
        setLoading(true);
        
        const response = await getNotificacionesHuesped(id, mostrarLeidas, pageNumber);
        setNotifications(response.data);
        setTotalPages(response.total_pages);
        setUnreadCount(response.unread_count || 0);
        setLoading(false);
        console.log(response.data)
      } else if (tipoUsuario === 'anfitrion') {
        setLoading(true);
        
        const response = await getNotificacionesAnfitrion(id, mostrarLeidas, pageNumber);
        setNotifications(response.data);
        setTotalPages(response.total_pages);
        setUnreadCount(response.unread_count || 0);
        setLoading(false);
        console.log(response.data)
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const marcarLeida = async (idNotificacion) => {
    try {
      if (tipoUsuario === 'huesped') {
        await marcarLeidaHuesped(id ,idNotificacion)

        await cargarNotificaciones()
      } else if (tipoUsuario === 'anfitrion') {
        console.log("a")
        await marcarLeidaAnfitrion(id, idNotificacion)

        await cargarNotificaciones()
      }
    } catch(error) {
      setLoading(false)
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
              <Bell className="h-5 w-5 text-emerald-300" />
              <h1 className="text-xl font-semibold text-white pt-3">Notificaciones</h1>
              {unreadCount > 0 && (
                <span className="bg-emerald-300 text-black text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filtro: Leídas / No Leídas */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => { setMostrarLeidas(false); setPageNumber(1); }}
            className={`px-4 py-2 rounded-l-lg border border-gray-700 ${
              !mostrarLeidas ? 'bg-emerald-300 text-black' : 'bg-black text-gray-300 hover:bg-gray-800'
            }`}
          >
            No leídas
          </button>
          <button
            onClick={() => { setMostrarLeidas(true); setPageNumber(1); }}
            className={`px-4 py-2 rounded-r-lg border border-gray-700 ${
              mostrarLeidas ? 'bg-emerald-300 text-black' : 'bg-black text-gray-300 hover:bg-gray-800'
            }`}
          >
            Leídas
          </button>
        </div>
        <div className="flex justify-end items-center mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div>
            {pageNumber > 1 && (
              <button
                onClick={handlePrevious}
                className="rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.map((notification) => {
              // const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors`}
                >
                  <div className="flex items-start space-x-4">
                    {/* <div className={`p-2 rounded-full bg-gray-800 ${notification.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div> */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {/* <h3
                            className={`text-lg font-semibold ${
                              notification.fechaLeida === null ? 'text-white' : 'text-gray-300'
                            }`}
                          >
                            {notification.title}
                          </h3> */}
                          <p className="text-gray-400 mt-1 leading-relaxed">
                            {notification.mensaje}
                          </p>
                          <p className="text-gray-500 text-sm mt-2">{notification.fechaAlta}</p>
                        </div>
                        {notification.fechaLeida === null && (
                          <div className="ml-4">
                            <button onClick={() => marcarLeida(notification.id)}>
                              <div className="w-3 h-3 bg-emerald-300 rounded-full cursor-pointer"></div>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Estado vacío */}
          {notifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No tienes notificaciones
              </h3>
              <p className="text-gray-500">
                Cuando tengas nuevas notificaciones, aparecerán aquí.
              </p>
            </div>
          )}

          <div>
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
  );
};

export default NotificationsView;
