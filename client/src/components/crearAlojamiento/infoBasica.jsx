import React from 'react';
import { Users, Wifi, Waves, Dog, Car } from 'lucide-react';

const BasicInfoStep = ({ formData, updateFormData }) => {
  const caracteristicas = [
    { id: 'WIFI', name: 'WiFi', icon: Wifi },
    { id: 'PILETA', name: 'Pileta', icon: Waves },
    { id: 'MASCOTAS_PERMITIDAS', name: 'Mascotas Permitidas', icon: Dog },
    { id: 'ESTACIONAMIENTO', name: 'Estacionamiento', icon: Car }
  ];

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleAmenityToggle = (caracteristicasId) => {
    const newCaracteristicas = formData.caracteristicas.includes(caracteristicasId)
      ? formData.caracteristicas.filter(id => id !== caracteristicasId)
      : [...formData.caracteristicas, caracteristicasId];
    
    updateFormData({ caracteristicas: newCaracteristicas });
  };

  const handleGuestChange = (increment) => {
    const newGuests = increment 
      ? formData.cantHuespedesMax + 1 
      : Math.max(1, formData.cantHuespedesMax - 1);
    updateFormData({ cantHuespedesMax: newGuests });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Información Básica</h2>
        <p className="text-gray-400">Cuéntanos sobre tu alojamiento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nombre del alojamiento *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Ej: Villa moderna frente al mar"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-colors"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Descripción *
          </label>
          
          <textarea
            type = "text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            rows={4}
            placeholder="Describe tu alojamiento, sus características especiales y lo que lo hace único..."
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-colors resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-4">
            Características *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {caracteristicas.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleAmenityToggle(id)}
                className={`p-3 border rounded-lg flex items-center space-x-2 transition-colors ${
                  formData.caracteristicas.includes(id)
                    ? 'border-emerald-300 bg-emerald-900/20 text-emerald-300'
                    : 'border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Huéspedes máximos *
          </label>
          <div className="flex items-center !justify-center space-x-3">
            <button
              type="button"
              onClick={() => handleGuestChange(false)}
              className="p-2 border border-gray-700  rounded-lg hover:border-gray-600 transition-colors"
            >
              <span className="text-white">-</span>
            </button>
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-white font-medium">{formData.cantHuespedesMax}</span>
            </div>
            <button
              type="button"
              onClick={() => handleGuestChange(true)}
              className="p-2 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
            >
              <span className="text-white">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;