

// src/components/billing/inputField.tsx

import React from 'react';
import { CustomerInfo } from './types';

interface InputFieldsProps {
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
  darkMode: boolean;
  showValidation: boolean;
}

const InputFields: React.FC<InputFieldsProps> = ({ 
  customerInfo, 
  setCustomerInfo, 
  darkMode, 
  showValidation 
}) => {
  const handleChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo({
      ...customerInfo,
      [field]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCustomerInfo({
      ...customerInfo,
      useSameAsPhone: checked,
      whatsappNumber: checked ? customerInfo.phone : customerInfo.whatsappNumber
    });
  };

  // Validation functions
  const validateRequired = (value: string) => {
    return value.trim() !== '';
  };

  const validateEmail = (email: string) => {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    if (!phone) return false;
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const validateGSTNumber = (gstNumber: string) => {
    if (!gstNumber) return true;
    const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return regex.test(gstNumber);
  };

  const validateGSTPercentage = (percentage: string) => {
    if (!percentage) return true;
    const num = parseFloat(percentage);
    return !isNaN(num) && num >= 0 && num <= 100;
  };

  const handleGSTPercentageChange = (value: string) => {
    if (value === '') {
      handleChange('gstPercentage', '');
      return;
    }
    
    const regex = /^(\d+)?(\.\d{0,2})?$/;
    if (regex.test(value)) {
      handleChange('gstPercentage', value);
    }
  };

  // Validation states
  const isCompanyNameValid = validateRequired(customerInfo.companyName);
  const isNameValid = validateRequired(customerInfo.name);
  const isEmailValid = validateEmail(customerInfo.email);
  const isPhoneValid = validatePhone(customerInfo.phone);
  const isWhatsappValid = customerInfo.useSameAsPhone ? true : validatePhone(customerInfo.whatsappNumber);
  const isAddressValid = validateRequired(customerInfo.address);
  const isGSTValid = validateGSTNumber(customerInfo.gstNumber);
  const isGSTPercentageValid = validateGSTPercentage(customerInfo.gstPercentage);

  return (
    <div className="space-y-4">
      {/* Company Name */}
      <div>
        <label className={`block mb-2 font-medium ${darkMode ? 'text-pink-200' : 'text-pink-700'}`}>Company Name *</label>
        <input
          type="text"
          value={customerInfo.companyName}
          onChange={(e) => handleChange('companyName', e.target.value)}
          className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-pink-900 text-white focus:border-pink-500' : 'bg-white border-pink-200 focus:border-pink-300'} ${showValidation && !isCompanyNameValid ? 'border-red-500' : ''}`}
          required
        />
        {showValidation && !isCompanyNameValid && (
          <p className={`mt-1 text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            Company name is required
          </p>
        )}
      </div>

      {/* Customer Name */}
      <div>
        <label className={`block mb-2 font-medium ${darkMode ? 'text-pink-200' : 'text-pink-700'}`}>Customer Name *</label>
        <input
          type="text"
          value={customerInfo.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-pink-900 text-white focus:border-pink-500' : 'bg-white border-pink-200 focus:border-pink-300'} ${showValidation && !isNameValid ? 'border-red-500' : ''}`}
          required
        />
        {showValidation && !isNameValid && (
          <p className={`mt-1 text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            Customer name is required
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className={`block mb-2 font-medium ${darkMode ? 'text-pink-200' : 'text-pink-700'}`}>Email *</label>
        <input
          type="email"
          value={customerInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-pink-900 text-white focus:border-pink-500' : 'bg-white border-pink-200 focus:border-pink-300'} ${showValidation && !isEmailValid ? 'border-red-500' : ''}`}
          required
        />
        {showValidation && !isEmailValid && (
          <p className={`mt-1 text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            {customerInfo.email ? 'Please enter a valid email address' : 'Email is required'}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className={`block mb-2 font-medium ${darkMode ? 'text-pink-200' : 'text-pink-700'}`}>Phone Number *</label>
        <input
          type="tel"
          value={customerInfo.phone}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/g, '');
            handleChange('phone', numericValue.slice(0, 10));
          }}
          className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-pink-900 text-white focus:border-pink-500' : 'bg-white border-pink-200 focus:border-pink-300'} ${showValidation && !isPhoneValid ? 'border-red-500' : ''}`}
          required
          pattern="[0-9]{10}"
          inputMode="numeric"
        />
        {showValidation && !isPhoneValid && (
          <p className={`mt-1 text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            {customerInfo.phone ? 'Please enter a valid 10-digit phone number' : 'Phone number is required'}
          </p>
        )}
      </div>

      {/* WhatsApp Number */}
      <div>
        <label className={`block mb-2 font-medium ${darkMode ? 'text-pink-200' : 'text-pink-700'}`}>WhatsApp Number *</label>
        <div className="flex items-center gap-2">
          <input
            type="tel"
            value={customerInfo.whatsappNumber}
            onChange={(e) => handleChange('whatsappNumber', e.target.value)}
            disabled={customerInfo.useSameAsPhone}
            className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-pink-900 text-white focus:border-pink-500' : 'bg-white border-pink-200 focus:border-pink-300'} ${customerInfo.useSameAsPhone ? 'opacity-50' : ''} ${showValidation && !isWhatsappValid ? 'border-red-500' : ''}`}
            required
            maxLength={10}
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sameAsPhone"
              checked={customerInfo.useSameAsPhone}
              onChange={handleCheckboxChange}
              className={`h-4 w-4 rounded ${darkMode ? 'bg-gray-600 border-pink-500' : 'border-pink-300'} text-pink-600 focus:ring-pink-500`}
            />
            <label htmlFor="sameAsPhone" className={`ml-2 text-sm ${darkMode ? 'text-pink-200' : 'text-pink-700'}`}>
              Same as phone
            </label>
          </div>
        </div>
        {showValidation && !isWhatsappValid && (
          <p className={`mt-1 text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            Please enter a valid 10-digit WhatsApp number
          </p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className={`block mb-2 font-medium ${darkMode ? 'text-pink-200' : 'text-pink-700'}`}>Address *</label>
        <textarea
          value={customerInfo.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-pink-900 text-white focus:border-pink-500' : 'bg-white border-pink-200 focus:border-pink-300'} ${showValidation && !isAddressValid ? 'border-red-500' : ''}`}
          rows={3}
          required
        />
        {showValidation && !isAddressValid && (
          <p className={`mt-1 text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            Address is required
          </p>
        )}
      </div>

      {/* GST Number */}
      <div>
        <label className={`block mb-2 font-medium ${darkMode ? 'text-pink-200' : 'text-pink-700'}`}>GST Number</label>
        <input
          type="text"
          value={customerInfo.gstNumber}
          onChange={(e) => handleChange('gstNumber', e.target.value.toUpperCase())}
          placeholder="22AAAAA0000A1Z5"
          className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-pink-900 text-white focus:border-pink-500' : 'bg-white border-pink-200 focus:border-pink-300'} ${showValidation && !isGSTValid ? 'border-red-500' : ''}`}
        />
        {showValidation && !isGSTValid && (
          <p className={`mt-1 text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            Please enter a valid GST number (format: 22AAAAA0000A1Z5)
          </p>
        )}
      </div>

      {/* GST Percentage */}
      <div>
        <label className={`block mb-2 font-medium ${darkMode ? 'text-pink-200' : 'text-pink-700'}`}>GST Percentage</label>
        <div className="relative">
          <input
            type="text"
            value={customerInfo.gstPercentage}
            onChange={(e) => handleGSTPercentageChange(e.target.value)}
            placeholder="0-100%"
            className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-pink-900 text-white focus:border-pink-500' : 'bg-white border-pink-200 focus:border-pink-300'} ${showValidation && !isGSTPercentageValid ? 'border-red-500' : ''}`}
          />
          <span className={`absolute right-3 top-3 ${darkMode ? 'text-pink-200' : 'text-pink-600'}`}>%</span>
        </div>
        {showValidation && !isGSTPercentageValid && (
          <p className={`mt-1 text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            Please enter a valid percentage between 0 and 100
          </p>
        )}
      </div>
    </div>
  );
};

export default InputFields;