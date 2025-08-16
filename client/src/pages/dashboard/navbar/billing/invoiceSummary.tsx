// src/components/billing/InvoiceSummary.tsx

import React from 'react';
import { InvoiceData } from './types';
import { formatCurrency, calculateSubtotal, calculateGst } from './utils';

interface InvoiceSummaryProps {
  invoiceData: InvoiceData;
  darkMode: boolean;
  onClose: () => void;
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({
  invoiceData,
  darkMode,
  onClose
}) => {
  const subtotal = calculateSubtotal(invoiceData.items);
  const gstAmount = invoiceData.customerInfo.gstNumber 
    ? calculateGst(subtotal, invoiceData.customerInfo.gstPercentage) 
    : 0;

  return (
    <div className={`mt-6 p-6 rounded-lg ${darkMode ? 'bg-gray-800/50 border border-pink-900' : 'bg-pink-50 border border-pink-100'}`}>
      <h2 className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Invoice Summary
      </h2>
      
      <div className="flex justify-end">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-pink-100'} w-full md:w-1/3`}>
          <h4 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Invoice #{invoiceData.id}
          </h4>
          <div className="flex justify-between mb-2">
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Subtotal:</span>
            <span className={darkMode ? 'text-white' : 'text-gray-800'}>
              {formatCurrency(subtotal)}
            </span>
          </div>
          {invoiceData.customerInfo.gstNumber && (
            <div className="flex justify-between mb-2">
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                GST ({invoiceData.customerInfo.gstPercentage}%):
              </span>
              <span className={darkMode ? 'text-white' : 'text-gray-800'}>
                {formatCurrency(gstAmount)}
              </span>
            </div>
          )}
          <div className="border-t pt-3 mt-3 border-pink-900/50">
            <div className="flex justify-between font-bold">
              <span className={darkMode ? 'text-white' : 'text-gray-800'}>Total:</span>
              <span className="text-lg text-pink-600">
                {formatCurrency(invoiceData.total)}
              </span>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <button
              onClick={() => window.print()}
              className={`w-full py-2 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white`}
            >
              Print Invoice
            </button>
            <button
              onClick={onClose}
              className={`w-full py-2 rounded-lg font-medium ${
                darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'
              } text-gray-800`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};