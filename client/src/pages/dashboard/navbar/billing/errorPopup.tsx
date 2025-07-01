
// src/components/billing/errorPopup.tsx

import React from 'react';

interface ErrorPopupProps {
  message: string;
  darkMode: boolean;
  onClose: () => void;
}

export const ErrorPopup: React.FC<ErrorPopupProps> = ({ 
  message, 
  darkMode, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`p-6 rounded-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg 
              className="h-6 w-6 text-red-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </div>
          <h3 className={`text-lg leading-6 font-medium mt-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Error
          </h3>
          <div className={`mt-2 px-4 py-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {message}
            </p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={onClose}
              className={`inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md ${
                darkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500' 
                  : 'bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500'
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