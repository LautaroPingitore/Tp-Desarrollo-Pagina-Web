import React, { useState, useContext } from 'react';
import { ArrowLeft, Bell, Check, X, Calendar, Home, User } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';


const NotificationsView = () => {

    const { id } = useParams();
    const { tipoUsuario} = useContext(AuthContext);
      
    const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'booking',
      title: 'Nueva reserva confirmada',
      message: 'Carlos López ha reservado tu propiedad "Modern Beachfront Villa" del 15 al 20 de diciembre.',
      time: 'Hace 2 horas',
      read: false,
      icon: Calendar,
      color: 'text-emerald-300'
    },
    {
      id: 2,
      type: 'review',
      title: 'Nueva reseña recibida',
      message: 'María González dejó una reseña de 5 estrellas para tu alojamiento.',
      time: 'Hace 5 horas',
      read: false,
      icon: User,
      color: 'text-blue-300'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Pago procesado',
      message: 'Se ha procesado el pago de $1,680 por la reserva #12345.',
      time: 'Hace 1 día',
      read: true,
      icon: Check,
      color: 'text-green-300'
    },
    {
      id: 4,
      type: 'maintenance',
      title: 'Recordatorio de mantenimiento',
      message: 'Es hora de revisar el sistema de aire acondicionado en tu propiedad de Malibu.',
      time: 'Hace 2 días',
      read: true,
      icon: Home,
      color: 'text-orange-300'
    },
    {
      id: 5,
      type: 'cancellation',
      title: 'Reserva cancelada',
      message: 'La reserva para el 10-15 de enero ha sido cancelada por el huésped.',
      time: 'Hace 3 días',
      read: true,
      icon: X,
      color: 'text-red-300'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

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
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions */}
        

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className={`bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors `}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full bg-gray-800 ${notification.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold ${
                          !notification.read ? 'text-white' : 'text-gray-300'
                        }`}>
                          {notification.title}
                        </h3>
                        <p className="text-gray-400 mt-1 leading-relaxed">
                          {notification.message}
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="ml-4">
                          <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
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
      </div>
    </div>
  );
};

export default NotificationsView;