import React from 'react';

const ProgressSteps = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= step 
              ? 'bg-emerald-300 text-black' 
              : 'bg-gray-800 text-gray-400'
          }`}>
            {step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-0.5 mx-2 ${
              currentStep > step ? 'bg-emerald-300' : 'bg-gray-800'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;