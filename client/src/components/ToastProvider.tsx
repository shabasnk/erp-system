// components/ToastProvider.tsx
import React from 'react';
import { Toaster, ToastOptions } from 'react-hot-toast';

interface CustomToastOptions extends ToastOptions {
  success?: ToastOptions;
  error?: ToastOptions;
}

const ToastProvider: React.FC = () => {
  const toastOptions: CustomToastOptions = {
    duration: 4000,
    style: {
      background: '#363636',
      color: '#fff',
    },
    success: {
      duration: 3000,
      iconTheme: {
        primary: '#4ade80',
        secondary: '#fff',
      },
    },
    error: {
      duration: 4000,
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    },
  };

  return (
    <Toaster
      position="top-right"
      toastOptions={toastOptions}
    />
  );
};

export default ToastProvider;