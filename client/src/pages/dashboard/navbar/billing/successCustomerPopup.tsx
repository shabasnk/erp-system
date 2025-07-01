


// src/components/billing/SuccessCustomerPopup.tsx
import React from 'react';

interface SuccessCustomerPopupProps {
  darkMode: boolean;
  onClose: () => void;
  message?: string;
}

export const SuccessCustomerPopup: React.FC<SuccessCustomerPopupProps> = ({ 
  darkMode, 
  onClose,
  message = "Customer Details Saved Successfully!" 
}) => {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50`}>
      <div 
        className={`p-6 rounded-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg 
              className="h-6 w-6 text-green-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h3 className={`text-lg leading-6 font-medium mt-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {message}
          </h3>
          <div className="mt-4">
            <button
              type="button"
              onClick={onClose}
              className={`inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md ${
                darkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500' 
                  : 'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
