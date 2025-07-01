// src/components/billing/SuccessNotification.tsx
import React, { useEffect } from 'react';
import { InvoiceData } from './types';
import { formatCurrency } from './utils';

interface SuccessNotificationProps {
  invoiceData: InvoiceData;
  darkMode: boolean;
  onClose: () => void;
}

export const SuccessNotification: React.FC<SuccessNotificationProps> = ({ 
  invoiceData, 
  darkMode, 
  onClose 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50`}>
      <div 
        className={`p-6 rounded-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl transform transition-all duration-300 scale-100`}
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
            Invoice Created Successfully!
          </h3>
          <div className={`mt-2 px-4 py-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Invoice #: <span className="font-medium">{invoiceData.id}</span>
            </p>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Amount: <span className="font-medium">{formatCurrency(invoiceData.total)}</span>
            </p>
          </div>
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