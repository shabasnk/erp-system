// src/components/auth/StepsIndicator.tsx
import React from 'react';

interface StepsIndicatorProps {
  currentStep: number;
  darkMode?: boolean;
}

const StepsIndicator: React.FC<StepsIndicatorProps> = ({ currentStep, darkMode = false }) => {
  const steps = [
    { number: 1, label: 'Email' },
    { number: 2, label: 'WhatsApp' },
    { number: 3, label: 'Details' }
  ];

  return (
    <div className="flex justify-center mb-6 w-full">
      <div className="flex items-center space-x-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 ${
                currentStep >= step.number 
                  ? 'border-[#FF4B4B] text-[#FF4B4B]'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {step.number}
              </div>
              <span className={`text-xs mt-1 font-medium ${
                currentStep >= step.number 
                  ? 'text-[#FF4B4B]'
                  : darkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-10 h-0.5 bg-gray-200"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepsIndicator;