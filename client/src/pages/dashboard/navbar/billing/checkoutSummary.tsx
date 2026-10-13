// src/components/billing/CheckoutSummary.tsx
import React from 'react';
import { CustomerInfo, SelectedProduct } from './types';
import { formatCurrency, calculateSubtotal, calculateGst } from './utils';

interface CheckoutSummaryProps {
  selectedProducts: SelectedProduct[];
  customerInfo: CustomerInfo;
  darkMode: boolean;
  setShowCheckoutModal: (show: boolean) => void;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  selectedProducts,
  customerInfo,
  darkMode,
  setShowCheckoutModal
}) => {
  const subtotal = calculateSubtotal(selectedProducts);
  const gstAmount = customerInfo.gstNumber 
    ? calculateGst(subtotal, customerInfo.gstPercentage) 
    : 0;
  const total = subtotal + gstAmount;

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-pink-100'} w-full md:w-1/3`}>
      <h4 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Purchase Summary
      </h4>
      <div className="flex justify-between mb-2">
        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Subtotal:</span>
        <span className={darkMode ? 'text-white' : 'text-gray-800'}>
          {formatCurrency(subtotal)}
        </span>
      </div>
      {customerInfo.gstNumber && (
        <>
          <div className="flex justify-between mb-2">
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              GST ({customerInfo.gstPercentage}%):
            </span>
            <span className={darkMode ? 'text-white' : 'text-gray-800'}>
              {formatCurrency(gstAmount)}
            </span>
          </div>
        </>
      )}
      <div className="border-t pt-3 mt-3 border-pink-900/50">
        <div className="flex justify-between font-bold">
          <span className={darkMode ? 'text-white' : 'text-gray-800'}>Total:</span>
          <span className="text-lg text-pink-600">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
      
      <button
        onClick={() => setShowCheckoutModal(true)}
        disabled={selectedProducts.length === 0}
        className={`w-full mt-4 py-2 rounded-lg font-medium ${
          selectedProducts.length === 0 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-pink-600 hover:bg-pink-700 text-white'
        }`}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};