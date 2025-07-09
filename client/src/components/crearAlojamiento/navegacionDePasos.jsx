import React from 'react';

const StepNavigation = ({ 
  currentStep, 
  nextStep, 
  prevStep, 
  canProceedToNextStep, 
  formData, 
  onSubmit 
}) => {
  const handleNext = () => {
    if (canProceedToNextStep()) {
        console.log(formData);
      nextStep();
    }
  };

  const handleSubmit = () => {
    if (formData.fotos.length < 1) {
      alert('Debes subir al menos 1 foto de tu alojamiento');
      return;
    }
    onSubmit();
  };

  return (
    <div className="flex items-center justify-between pt-8 border-t border-gray-800">
      <button
        type="button"
        onClick={prevStep}
        disabled={currentStep === 1}
        className="px-6 py-3 border border-gray-700 rounded-lg text-white hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>

      <div className="flex items-center space-x-2 text-gray-400 text-sm">
        <span>Paso {currentStep} de 3</span>
      </div>

      {currentStep < 3 ? (
        <button
          type="button"
          onClick={handleNext}
          disabled={!canProceedToNextStep()}
          className="px-6 py-3 bg-emerald-300 text-black rounded-lg font-semibold hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-3 bg-emerald-300 !text-black rounded-lg font-semibold hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Crear Alojamiento
        </button>
      )}
    </div>
  );
};

export default StepNavigation;