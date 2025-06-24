import React, { useEffect, useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { debounce } from 'lodash';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import InputFields from '../billing/inputField';

interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  description?: string;
}

interface SelectedProduct extends Product {
  quantity: number;
}

interface CustomerInfo {
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

interface InvoiceData {
  id: number;
  total: number;
  items: SelectedProduct[];
  customerInfo: CustomerInfo;
  paymentMethod: string;
  createdAt: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

const BillingNav: React.FC = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const { getAuthHeaders, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    useSameAsPhone: true,
    address: '',
    gstNumber: '',
    gstPercentage: '18.00'
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [isCreatingInvoice, setIsCreatingInvoice] = useState<boolean>(false);
  const [invoiceCreated, setInvoiceCreated] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [showValidation, setShowValidation] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const authAxios = axios.create({
    baseURL: '/api',
    headers: getAuthHeaders()
  });

  const debouncedSearch = debounce(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await authAxios.get(`/billing/search?query=${encodeURIComponent(query)}`);
      if (response.data.products) {
        setSearchResults(response.data.products);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('API call failed:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert('Session expired. Please login again.');
      }
      setSearchResults([]);
    }
  }, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowCheckoutModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      setSearchResults([]);
    }

    return () => debouncedSearch.cancel();
  }, [searchQuery]);

  useEffect(() => {
    if (customerInfo.useSameAsPhone) {
      setCustomerInfo(prev => ({
        ...prev,
        whatsappNumber: prev.phone
      }));
    }
  }, [customerInfo.phone, customerInfo.useSameAsPhone]);

  const handleProductSelect = (product: Product) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    
    if (existingProduct) {
      setSelectedProducts(prev => 
        prev.map(p => 
          p.id === product.id 
            ? { ...p, quantity: p.quantity + 1 } 
            : p
        )
      );
    } else {
      setSelectedProducts(prev => [
        ...prev,
        {
          ...product,
          quantity: 1
        }
      ]);
    }
    
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setSelectedProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  const removeProduct = (id: number) => {
    setSelectedProducts(prev => prev.filter(product => product.id !== id));
  };

  const validateCustomerInfo = (): boolean => {
    // Required fields validation
    if (!customerInfo.companyName.trim()) return false;
    if (!customerInfo.name.trim()) return false;
    if (!customerInfo.phone.trim()) return false;
    if (!customerInfo.address.trim()) return false;
    
    // Email validation
    if (customerInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      return false;
    }
    
    // Phone validation
    if (!/^[0-9]{10}$/.test(customerInfo.phone)) return false;
    
    // WhatsApp validation
    if (!customerInfo.useSameAsPhone && !/^[0-9]{10}$/.test(customerInfo.whatsappNumber)) {
      return false;
    }
    
    // GST validation
    if (customerInfo.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(customerInfo.gstNumber)) {
      return false;
    }
    
    // GST percentage validation
    if (customerInfo.gstNumber) {
      const percentage = parseFloat(customerInfo.gstPercentage);
      if (isNaN(percentage)) return false;
      if (percentage < 0 || percentage > 100) return false;
    }
    
    return true;
  };

  const calculateTotal = () => {
    const subtotal = selectedProducts.reduce((sum, product) => 
      sum + (product.discountPrice || product.price) * product.quantity, 0
    );

    if (customerInfo.gstNumber) {
      const gstPercentage = parseFloat(customerInfo.gstPercentage) || 0;
      const gstAmount = subtotal * (gstPercentage / 100);
      return subtotal + gstAmount;
    }

    return subtotal;
  };

  const handleCheckout = async (): Promise<void> => {
    if (!isAuthenticated) {
      alert('Please login to complete checkout');
      return;
    }

    if (selectedProducts.length === 0) {
      alert('Please add at least one product');
      return;
    }
    
    // Show validation messages
    setShowValidation(true);
    
    // Validate all fields
    if (!validateCustomerInfo()) {
      return;
    }

    setIsCreatingInvoice(true);
    
    try {
      const response = await authAxios.post('/billing/create', {
        products: selectedProducts,
        customerInfo,
        paymentMethod,
        total: calculateTotal(),
        gstPercentage: customerInfo.gstNumber ? customerInfo.gstPercentage : null
      });

      const data = response.data;
      
      if (response.status === 200 && data.success) {
        setInvoiceData(data.invoice);
        setInvoiceCreated(true);
        setSelectedProducts([]);
        setShowCheckoutModal(false);
        setShowValidation(false);
      } else {
        alert(data.message || 'Failed to create invoice');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Failed to process checkout');
      } else {
        alert('Failed to process checkout');
      }
    } finally {
      setIsCreatingInvoice(false);
    }
  };

  const renderCheckoutModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto`}>
      <div 
        ref={modalRef}
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
            onClick={() => {
              setShowCheckoutModal(false);
              setShowValidation(false);
            }}
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

  const renderInvoiceModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50`}>
      <div className={`p-6 rounded-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className={`text-xl font-bold mt-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Invoice Created Successfully!
          </h3>
          <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Invoice #: {invoiceData?.id}
          </p>
          <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Total: {formatCurrency(invoiceData?.total || 0)}
          </p>
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => {
              setInvoiceCreated(false);
              setInvoiceData(null);
              setCustomerInfo(prev => ({
                companyName: '',
                name: '',
                email: '',
                phone: '',
                whatsappNumber: '',
                useSameAsPhone: true,
                address: '',
                gstNumber: prev.gstNumber,
                gstPercentage: '18.00'
              }));
              setShowValidation(false);
            }}
            className={`w-full px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold font-['Kantumruy_Pro'] bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent`}>
          Billing Information
        </h1>
        <p className={`mt-2 ${darkMode ? 'text-pink-200' : 'text-pink-700'}`}>
          View and manage your billing information
        </p>
      </div>

      <div>
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/50 border border-pink-900' : 'bg-pink-50 border border-pink-100'}`}>
          <div className="mb-8">
            <h2 className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Add Products
            </h2>
            
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search products..."
                className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-pink-900 text-white focus:border-pink-500' : 'bg-white border-pink-200 focus:border-pink-300'} transition-colors duration-300`}
              />
              
              {showSuggestions && searchResults.length > 0 && (
                <div className={`absolute z-10 w-full mt-1 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border border-pink-900' : 'bg-white border border-pink-200'}`}>
                  {searchResults.map(product => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className={`p-3 cursor-pointer hover:${darkMode ? 'bg-gray-700' : 'bg-pink-50'} transition-colors duration-200`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={darkMode ? 'text-white' : 'text-gray-800'}>{product.name}</span>
                        <span className={`font-medium ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                          {formatCurrency(product.discountPrice || product.price)}
                        </span>
                      </div>
                      {product.description && (
                        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {product.description.length > 50 
                            ? `${product.description.substring(0, 50)}...` 
                            : product.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedProducts.length > 0 && (
            <div className="mt-6">
              <h3 className={`text-lg font-bold font-['Kantumruy_Pro'] mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Selected Products
              </h3>
              
              <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <table className="w-full">
                  <thead className={`${darkMode ? 'bg-gray-700' : 'bg-pink-100'}`}>
                    <tr>
                      <th className="p-3 text-left">Product</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Quantity</th>
                      <th className="p-3 text-left">Total</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProducts.map(product => (
                      <tr key={product.id} className={`border-t ${darkMode ? 'border-gray-700' : 'border-pink-100'}`}>
                        <td className="p-3">
                          <div>
                            <p className={darkMode ? 'text-white' : 'text-gray-800'}>{product.name}</p>
                            {product.description && (
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {product.description.length > 30 
                                  ? `${product.description.substring(0, 30)}...` 
                                  : product.description}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`font-medium ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                            {formatCurrency(product.discountPrice || product.price)}
                          </span>
                          {product.discountPrice && (
                            <span className={`text-xs line-through ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {formatCurrency(product.price)}
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(product.id, product.quantity - 1)}
                              className={`p-1 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-pink-100 hover:bg-pink-200'}`}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={product.quantity}
                              onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                              className={`w-12 mx-2 p-1 text-center rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white border border-pink-200'}`}
                            />
                            <button
                              onClick={() => updateQuantity(product.id, product.quantity + 1)}
                              className={`p-1 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-pink-100 hover:bg-pink-200'}`}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`font-medium ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                            {formatCurrency((product.discountPrice || product.price) * product.quantity)}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => removeProduct(product.id)}
                            className={`p-1 rounded-md ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-pink-100'}`}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-pink-100'} w-full md:w-1/3`}>
                  <h4 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Purchase Summary
                  </h4>
                  <div className="flex justify-between mb-2">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Subtotal:</span>
                    <span className={darkMode ? 'text-white' : 'text-gray-800'}>
                      {formatCurrency(selectedProducts.reduce((sum, product) => 
                        sum + (product.discountPrice || product.price) * product.quantity, 0
                      ))}
                    </span>
                  </div>
                  {customerInfo.gstNumber && (
                    <>
                      <div className="flex justify-between mb-2">
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>GST ({customerInfo.gstPercentage}%):</span>
                        <span className={darkMode ? 'text-white' : 'text-gray-800'}>
                          {formatCurrency(
                            selectedProducts.reduce((sum, product) => 
                              sum + (product.discountPrice || product.price) * product.quantity, 0
                            ) * (parseFloat(customerInfo.gstPercentage) || 0) / 100
                          )}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="border-t pt-3 mt-3 border-pink-900/50">
                    <div className="flex justify-between font-bold">
                      <span className={darkMode ? 'text-white' : 'text-gray-800'}>Total:</span>
                      <span className="text-lg text-pink-600">
                        {formatCurrency(calculateTotal())}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setShowCheckoutModal(true)}
                    disabled={selectedProducts.length === 0}
                    className={`w-full mt-4 py-2 rounded-lg font-medium ${selectedProducts.length === 0 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-pink-600 hover:bg-pink-700 text-white'}`}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCheckoutModal && renderCheckoutModal()}
      {invoiceCreated && renderInvoiceModal()}
    </div>
  );
};

export default BillingNav;



