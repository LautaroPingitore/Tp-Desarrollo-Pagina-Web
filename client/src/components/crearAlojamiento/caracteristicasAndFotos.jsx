import React, { useState } from 'react';
import { Camera, X, Tv, AirVent, Coffee, Utensils, Mountain, Dumbbell, Wind, Snowflake } from 'lucide-react';

const AmenitiesPhotosStep = ({ formData, updateFormData }) => {
  const [dragActive, setDragActive] = useState(false);

  

  

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));

    const updatedImages = [...formData.fotos, ...newImages].slice(0, 10); // Max 10 images
    updateFormData({ fotos: updatedImages });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const removeImage = (fotoUrl) => {
    const updatedImages = formData.fotos.filter(url => {
      if (url === fotoUrl) {
        // Clean up the object URL to prevent memory leaks
        URL.revokeObjectURL(url);
        return false;
      }
      return true;
    });
    updateFormData({ fotos: updatedImages });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Fotos</h2>
        <p className="text-gray-400">Muestra lo mejor de tu alojamiento</p>
      </div>


      {/* Photo Upload */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Fotos del alojamiento *
          <span className="text-sm text-gray-400 font-normal ml-2">
            (máximo 10)
          </span>
        </h3>
        
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive 
              ? 'border-emerald-300 bg-emerald-900/10' 
              : 'border-gray-700 hover:border-gray-600'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/png,image/jpeg,image/jpg"
            onChange={(e) => handleImageUpload(e.target.files)}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-800 rounded-full">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <p className="text-white font-medium">
                  Arrastra las fotos aquí o haz clic para seleccionar
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Solo archivos PNG, JPG o JPEG
                </p>
              </div>
            </div>
          </label>
        </div>

        {/* Image Preview */}
        {formData.fotos.length > 0 && (
          <div className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.fotos.map((fotoUrl, index) => (
                <div key={index} className="relative group">
                  <img
                    src={fotoUrl}
                    alt={`Foto del alojamiento ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(fotoUrl)}
                    className="absolute top-2 right-2 p-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                  
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-2">
              {formData.fotos.length} de 10 fotos subidas
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AmenitiesPhotosStep;