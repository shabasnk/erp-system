// src/components/billing/utils.ts
import { SelectedProduct } from './types';
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const calculateSubtotal = (products: SelectedProduct[]) => {
  return products.reduce((sum, product) => 
    sum + (product.discountPrice || product.price) * product.quantity, 0
  );
};

export const calculateGst = (subtotal: number, gstPercentage: string) => {
  const percentage = parseFloat(gstPercentage) || 0;
  return subtotal * (percentage / 100);
};







