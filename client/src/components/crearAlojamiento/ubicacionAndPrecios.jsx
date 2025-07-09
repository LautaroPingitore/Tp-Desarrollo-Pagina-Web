import React from 'react';
import { MapPin, DollarSign, Clock } from 'lucide-react';

const LocationPricingStep = ({ formData, updateFormData }) => {
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'MXN', symbol: '$', name: 'Mexican Peso' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Manejar campos anidados de dirección
    if (name === 'pais') {
      updateFormData({
        direccion: {
          ...formData.direccion,
          ciudad: {
            ...formData.direccion.ciudad,
            pais: {
              ...formData.direccion.ciudad.pais,
              nombre: value
            }
          }
        }
      });
    } else if (name === 'ciudad') {
      updateFormData({
        direccion: {
          ...formData.direccion,
          ciudad: {
            ...formData.direccion.ciudad,
            nombre: value
          }
        }
      });
    } else if (name === 'calle') {
      updateFormData({
        direccion: {
          ...formData.direccion,
          calle: value
        }
      });
    } else if (name === 'altura') {
      updateFormData({
        direccion: {
          ...formData.direccion,
          altura: value
        }
      });
    } else {
      // Para campos simples como precioPorNoche, moneda, horarios
      updateFormData({
        [name]: value
      });
    }
  };

  

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Ubicación y Precios</h2>
        <p className="text-gray-400">Detalles importantes para tus huéspedes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Dirección *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">País</label>
              <input
                type="text"
                name="pais"
                value={formData.direccion.ciudad.pais.nombre || ''}
                onChange={handleInputChange}
                placeholder="Argentina"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Ciudad</label>
              <input
                type="text"
                name="ciudad"
                value={formData.direccion.ciudad.nombre || ''}
                onChange={handleInputChange}
                placeholder="Buenos Aires"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Calle</label>
              <input
                type="text"
                name="calle"
                value={formData.direccion.calle || ''}
                onChange={handleInputChange}
                placeholder="Av. Corrientes"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Altura</label>
              <input
                type="text"
                name="altura"
                value={formData.direccion.altura || ''}
                onChange={handleInputChange}
                placeholder="1234"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-colors"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Precio por noche *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              name="precioPorNoche"
              value={formData.precioPorNoche}
              onChange={handleInputChange}
              placeholder="0"
              min="1"
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Moneda
          </label>
          <select
            name="moneda"
            value={formData.moneda}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-colors"
          >
            {currencies.map(({ code, symbol, name }) => (
              <option key={code} value={code}>
                {symbol} {code} - {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Horario de Check-in
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="time"
              name="horarioCheckIn"
              value={formData.horarioCheckIn}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Horario de Check-out
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="time"
              name="horarioCheckOut"
              value={formData.horarioCheckOut}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPricingStep;