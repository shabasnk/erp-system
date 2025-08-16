// src/components/billing/types.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  description?: string;
}

export interface SelectedProduct extends Product {
  quantity: number;
}

export interface CustomerInfo {
  companyName: string;
  name: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  useSameAsPhone: boolean;
  address: string;
  gstNumber: string;
  gstPercentage: string;
}

export interface InvoiceData {
  id: number;
  total: number;
  items: SelectedProduct[];
  customerInfo: CustomerInfo;
  paymentMethod: string;
  createdAt: string;
}

export const initialCustomerInfo: CustomerInfo = {
  companyName: '',
  name: '',
  email: '',
  phone: '',
  whatsappNumber: '',
  useSameAsPhone: true,
  address: '',
  gstNumber: '',
  gstPercentage: '18.00'
};