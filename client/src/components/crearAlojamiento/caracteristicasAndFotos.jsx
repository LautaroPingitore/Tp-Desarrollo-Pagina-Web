import React, { useState, useEffect } from 'react';
import { Camera, X, Tv, AirVent, Coffee, Utensils, Mountain, Dumbbell, Wind, Snowflake } from 'lucide-react';

const AmenitiesPhotosStep = ({ formData, updateFormData }) => {
  const [dragActive, setDragActive] = useState(false);

  // Solo limpiar URLs al desmontar el componente
  useEffect(() => {
    return () => {
      // Solo limpiar si el componente se desmonta completamente
      if (formData.fotos) {
        formData.fotos.forEach(url => {
          if (url && url.startsWith('blob:')) {
            try {
              URL.revokeObjectURL(url);
            } catch (e) {
              // Ignorar errores de limpieza
            }
          }
        });
      }
    };
  }, []); // Sin dependencias para que solo se ejecute al desmontar

  const handleImageUpload = (files) => {
    if (!files || files.length === 0) return;
    
    console.log('Subiendo archivos:', files.length);
    
    const newImages = Array.from(files).map(file => {
      console.log('Procesando archivo:', file.name, file.type, file.size);
      // Verificar que sea un archivo válido
      if (file && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        console.log('URL creada:', url);
        return url;
      }
      return null;
    }).filter(Boolean); // Remover elementos null

    console.log('Nuevas imágenes:', newImages);
    console.log('Fotos actuales:', formData.fotos);

    // Evitar que se agreguen más de 10 fotos
    const totalPhotos = formData.fotos.length + newImages.length;
    if (totalPhotos > 10) {
      const maxNewPhotos = 10 - formData.fotos.length;
      console.log(`Solo se pueden agregar ${maxNewPhotos} fotos más`);
      const limitedNewImages = newImages.slice(0, maxNewPhotos);
      // Limpiar las URLs que no se van a usar
      newImages.slice(maxNewPhotos).forEach(url => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {
          console.log('Error al limpiar URL no usada:', e);
        }
      });
      const updatedImages = [...formData.fotos, ...limitedNewImages];
      console.log('Fotos actualizadas (limitadas):', updatedImages);
      updateFormData({ fotos: updatedImages });
    } else {
      const updatedImages = [...formData.fotos, ...newImages];
      console.log('Fotos actualizadas:', updatedImages);
      updateFormData({ fotos: updatedImages });
    }
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
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const removeImage = (indexToRemove) => {
    console.log('Eliminando imagen en índice:', indexToRemove);
    const fotoUrl = formData.fotos[indexToRemove];
    console.log('URL a eliminar:', fotoUrl);
    
    // Clean up the object URL to prevent memory leaks
    if (fotoUrl && fotoUrl.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(fotoUrl);
        console.log('URL revocada exitosamente');
      } catch (e) {
        console.log('Error al revocar URL:', e);
      }
    }
    
    const updatedImages = formData.fotos.filter((_, index) => index !== indexToRemove);
    console.log('Fotos después de eliminar:', updatedImages);
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
            onChange={(e) => {
              handleImageUpload(e.target.files);
              // Resetear el input para permitir seleccionar el mismo archivo otra vez
              e.target.value = '';
            }}
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
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-600 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
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