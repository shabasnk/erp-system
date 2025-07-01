// src/components/billing/CheckoutModal.tsx
import React from 'react';
import { CustomerInfo } from './types';
import  InputFields  from './inputField';

interface CheckoutModalProps {
  darkMode: boolean;
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  handleCheckout: () => Promise<void>;
  handleCloseModal: () => void;
  isCreatingInvoice: boolean;
  showValidation: boolean;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  darkMode,
  customerInfo,
  setCustomerInfo,
  paymentMethod,
  setPaymentMethod,
  handleCheckout,
  handleCloseModal,
  isCreatingInvoice,
  showValidation
}) => {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto`}>
      <div 
        className={`p-6 rounded-lg w-full max-w-md max-h-[90vh] ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Customer Information
        </h3>
        
        <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
          <InputFields 
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
            darkMode={darkMode}
            showValidation={showValidation}
          />
          
          <div>
            <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            >
              <option value="cash">Cash</option>
              <option value="card">Credit Card</option>
              <option value="transfer">Bank Transfer</option>
              <option value="upi">UPI</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleCloseModal}
            className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Cancel
          </button>
          <button
            onClick={handleCheckout}
            disabled={isCreatingInvoice}
            className={`px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700 disabled:opacity-50`}
          >
            {isCreatingInvoice ? 'Processing...' : 'Complete Order'}
          </button>
        </div>
      </div>
    </div>
  );
};