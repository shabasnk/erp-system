// // src/components/billing/BillingNav.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useOutletContext } from 'react-router-dom';
// import { debounce } from 'lodash';
// import axios from 'axios';
// import { useAuth } from '@/hooks/useAuth';
// import { ProductSearch } from './productSearch';
// import { ProductTable } from './productTable';
// import { CheckoutSummary } from './checkoutSummary';
// import { CheckoutModal } from './checkoutModal';
// import { SuccessNotification } from './successNotification';
// import { InvoiceSummary } from './invoiceSummary';
// import { SuccessCustomerPopup } from './successCustomerPopup';
// import { ErrorPopup } from './errorPopup';
// import { Product, SelectedProduct, CustomerInfo, InvoiceData, initialCustomerInfo } from './types';
// import { formatCurrency, calculateSubtotal, calculateGst } from './utils';
// import { log } from 'console';

// const BillingNav: React.FC = () => {
//   const { darkMode } = useOutletContext<{ darkMode: boolean }>();
//   const { getAuthHeaders, isAuthenticated } = useAuth();
  
//   // State management
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<Product[]>([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
//   const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(initialCustomerInfo);
//   const [paymentMethod, setPaymentMethod] = useState('cash');
//   const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
//   const [showSuccessNotification, setShowSuccessNotification] = useState(false);
//   const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
//   const [showCheckoutModal, setShowCheckoutModal] = useState(false);
//   const [showValidation, setShowValidation] = useState(false);
//   const [autoCloseTimer, setAutoCloseTimer] = useState<NodeJS.Timeout | null>(null);
//   const [showCustomerSuccess, setShowCustomerSuccess] = useState(false);
//   const [customerSuccessTimer, setCustomerSuccessTimer] = useState<NodeJS.Timeout | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [showErrorPopup, setShowErrorPopup] = useState(false);
  
//   // Refs
//   const searchRef = useRef<HTMLDivElement>(null);
//   const modalRef = useRef<HTMLDivElement>(null);

//   // API client
//   const authAxios = axios.create({
//     baseURL: '/api',
//     headers: getAuthHeaders()
//   });

//   // Cleanup effects
//   useEffect(() => {
//     return () => {
//       if (autoCloseTimer) clearTimeout(autoCloseTimer);
//       if (customerSuccessTimer) clearTimeout(customerSuccessTimer);
//     };
//   }, [autoCloseTimer, customerSuccessTimer]);

//   // Reset all notification states
//   const resetNotificationStates = () => {
//     setShowSuccessNotification(false);
//     setShowCustomerSuccess(false);
//     setShowErrorPopup(false);
//     setErrorMessage(null);
//   };

//   // Search products with debounce
//   useEffect(() => {
//     const debouncedSearch = debounce(async (query: string) => {
//       if (query.length < 2) {
//         setSearchResults([]);
//         return;
//       }

//       try {
//         const response = await authAxios.get(`/billing/search?query=${encodeURIComponent(query)}`);
//         setSearchResults(response.data.products || []);
//       } catch (error) {
//         console.error('Search failed:', error);
//         setSearchResults([]);
//       }
//     }, 300);

//     if (searchQuery) {
//       debouncedSearch(searchQuery);
//     } else {
//       setSearchResults([]);
//     }

//     return () => debouncedSearch.cancel();
//   }, [searchQuery]);

//   // Close suggestions when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setShowSuggestions(false);
//       }
//       if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//         setShowCheckoutModal(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Sync WhatsApp number if useSameAsPhone is true
//   useEffect(() => {
//     if (customerInfo.useSameAsPhone) {
//       setCustomerInfo(prev => ({
//         ...prev,
//         whatsappNumber: prev.phone
//       }));
//     }
//   }, [customerInfo.phone, customerInfo.useSameAsPhone]);

//   // Product quantity handlers
//   const updateQuantity = (id: number, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     setSelectedProducts(prev =>
//       prev.map(product =>
//         product.id === id ? { ...product, quantity: newQuantity } : product
//       )
//     );
//   };

//   const removeProduct = (id: number) => {
//     setSelectedProducts(prev => prev.filter(product => product.id !== id));
//   };

//   // Product selection handler
//   const handleProductSelect = (product: Product) => {
//     const existingProduct = selectedProducts.find(p => p.id === product.id);
    
//     if (existingProduct) {
//       updateQuantity(product.id, existingProduct.quantity + 1);
//     } else {
//       setSelectedProducts(prev => [...prev, { ...product, quantity: 1 }]);
//     }
    
//     setSearchQuery('');
//     setShowSuggestions(false);
//   };

//   // Validation
//   const validateCustomerInfo = (): boolean => {
//     if (!customerInfo.companyName.trim()) return false;
//     if (!customerInfo.name.trim()) return false;
//     if (!customerInfo.phone.trim()) return false;
//     if (!customerInfo.address.trim()) return false;
    
//     if (customerInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
//       return false;
//     }
    
//     if (!/^[0-9]{10}$/.test(customerInfo.phone)) return false;
    
//     if (!customerInfo.useSameAsPhone && !/^[0-9]{10}$/.test(customerInfo.whatsappNumber)) {
//       return false;
//     }
    
//     if (customerInfo.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(customerInfo.gstNumber)) {
//       return false;
//     }
    
//     if (customerInfo.gstNumber) {
//       const percentage = parseFloat(customerInfo.gstPercentage);
//       if (isNaN(percentage)) return false;
//       if (percentage < 0 || percentage > 100) return false;
//     }
    
//     return true;
//   };

//   // Calculate totals
//   const calculateTotal = () => {
//     const subtotal = calculateSubtotal(selectedProducts);
//     const gstAmount = customerInfo.gstNumber 
//       ? calculateGst(subtotal, customerInfo.gstPercentage) 
//       : 0;
//     return subtotal + gstAmount;
//   };

//   // Checkout handler
//   // Update the handleCheckout function in BillingNav.tsx
// const handleCheckout = async () => {
//   if (!isAuthenticated) {
//     resetNotificationStates();
//     setErrorMessage('Please login to complete checkout');
//     setShowErrorPopup(true);
//     return;
//   }

//   if (selectedProducts.length === 0) {
//     resetNotificationStates();
//     setErrorMessage('Please add at least one product');
//     setShowErrorPopup(true);
//     return;
//   }
  
//   setShowValidation(true);
  
//   if (!validateCustomerInfo()) {
//     resetNotificationStates();
//     setErrorMessage('Please fill all required fields correctly');
//     setShowErrorPopup(true);
//     return;
//   }

//   setIsCreatingInvoice(true);
  
//   try {
//     // Clear any existing timers
//     if (autoCloseTimer) clearTimeout(autoCloseTimer);
//     if (customerSuccessTimer) clearTimeout(customerSuccessTimer);

//     // Create customer
//     const customerResponse = await authAxios.post('/customer/create', {
//       companyName: customerInfo.companyName,
//       name: customerInfo.name,
//       email: customerInfo.email,
//       phone: customerInfo.phone,
//       whatsappNumber: customerInfo.whatsappNumber,
//       address: customerInfo.address,
//       gstNumber: customerInfo.gstNumber,
//       useSameAsPhone: customerInfo.useSameAsPhone
//     });
    
//     if (!customerResponse.data.success) {
//       throw new Error(customerResponse.data.message || 'Failed to create customer');
//     }

//     // Show customer success popup
//     setShowCustomerSuccess(true);
//     setCustomerSuccessTimer(setTimeout(() => setShowCustomerSuccess(false), 3000));

//     const customerId = customerResponse.data.data.id;

//     // Create invoice
//     const invoiceResponse = await authAxios.post('/billing/create', {
//       products: selectedProducts,
//       customerId,
//       paymentMethod,
//       total: calculateTotal(),
//       gstPercentage: customerInfo.gstNumber ? customerInfo.gstPercentage : null
//     });

//     const data = invoiceResponse.data;

//     // console.log("invoice response:",invoiceResponse);
    
    
//         // Remove the error throwing for success case
//       if (invoiceResponse.status === 200 || invoiceResponse.status === 201) {
//         setInvoiceData(data.invoice);
//         setShowSuccessNotification(true);
      
//       // Reset form
//       setSelectedProducts([]);
//       setCustomerInfo(initialCustomerInfo);
//       setPaymentMethod('cash');
//       setShowValidation(false);
//       setShowCheckoutModal(false);
      
//       // Set auto-close timer for notification
//       setAutoCloseTimer(setTimeout(() => setShowSuccessNotification(false), 5000));
//     } else {
//       throw new Error(data.message || 'Failed to create invoice');
//     }
//   } catch (err) {
//     console.error('Checkout error:', err);
//     const message = axios.isAxiosError(err) 
//       ? err.response?.data?.message || 'Failed to process checkout'
//       : err instanceof Error ? err.message : 'Failed to process checkout';
    
//     // Only show error if we're not already showing customer success
//   if (!message.includes('successfully')) {
//     setErrorMessage(message);
//     setShowErrorPopup(true);
//     const timer = setTimeout(() => setShowErrorPopup(false), 5000);
//     setAutoCloseTimer(timer);
//   }

//   } finally {
//     setIsCreatingInvoice(false);
//   }
// };

//   return (
//     <div>
//       <div className="mb-8">
//         <h1 className={`text-3xl font-bold font-['Kantumruy_Pro'] bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent`}>
//           Billing Information
//         </h1>
//         <p className={`mt-2 ${darkMode ? 'text-pink-200' : 'text-pink-700'}`}>
//           View and manage your billing information
//         </p>
//       </div>

//       <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/50 border border-pink-900' : 'bg-pink-50 border border-pink-100'}`}>
//         <div className="mb-8">
//           <h2 className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//             Add Products
//           </h2>
          
//           <div ref={searchRef}>
//             <ProductSearch
//               searchQuery={searchQuery}
//               setSearchQuery={setSearchQuery}
//               searchResults={searchResults}
//               handleProductSelect={handleProductSelect}
//               showSuggestions={showSuggestions}
//               setShowSuggestions={setShowSuggestions}
//               darkMode={darkMode}
//             />
//           </div>
//         </div>

//         {selectedProducts.length > 0 && (
//           <div className="mt-6">
//             <h3 className={`text-lg font-bold font-['Kantumruy_Pro'] mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//               Selected Products
//             </h3>
            
//             <ProductTable
//               selectedProducts={selectedProducts}
//               updateQuantity={updateQuantity}
//               removeProduct={removeProduct}
//               darkMode={darkMode}
//             />

//             <div className="mt-6 flex justify-end">
//               <CheckoutSummary
//                 selectedProducts={selectedProducts}
//                 customerInfo={customerInfo}
//                 darkMode={darkMode}
//                 setShowCheckoutModal={setShowCheckoutModal}
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       {showCheckoutModal && (
//         <CheckoutModal
//           darkMode={darkMode}
//           customerInfo={customerInfo}
//           setCustomerInfo={setCustomerInfo}
//           paymentMethod={paymentMethod}
//           setPaymentMethod={setPaymentMethod}
//           handleCheckout={handleCheckout}
//           handleCloseModal={() => setShowCheckoutModal(false)}
//           isCreatingInvoice={isCreatingInvoice}
//           showValidation={showValidation}
//         />
//       )}

//       {showCustomerSuccess && (
//         <SuccessCustomerPopup 
//           darkMode={darkMode}
//           onClose={() => setShowCustomerSuccess(false)}
//           message="Customer details saved successfully!"
//         />
//       )}

//       {showErrorPopup && (
//         <ErrorPopup
//           message={errorMessage || 'An error occurred'}
//           darkMode={darkMode}
//           onClose={() => setShowErrorPopup(false)}
//         />
//       )}

   

//       {showSuccessNotification && invoiceData && (
//         <>
//           <SuccessNotification 
//             invoiceData={invoiceData}
//             darkMode={darkMode}
//             onClose={() => setShowSuccessNotification(false)}
//           />
//           <InvoiceSummary 
//             invoiceData={invoiceData}
//             darkMode={darkMode}
//             onClose={() => {
//               setShowSuccessNotification(false);
//               setInvoiceData(null);
//             }}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default BillingNav;










// for 12 digin again
// src/components/billing/BillingNav.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { debounce } from 'lodash';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { ProductSearch } from './productSearch';
import { ProductTable } from './productTable';
import { CheckoutSummary } from './checkoutSummary';
import { CheckoutModal } from './checkoutModal';
import { SuccessNotification } from './successNotification';
import { InvoiceSummary } from './invoiceSummary';
import { SuccessCustomerPopup } from './successCustomerPopup';
import { ErrorPopup } from './errorPopup';
import { Product, SelectedProduct, CustomerInfo, InvoiceData, initialCustomerInfo } from './types';
import { formatCurrency, calculateSubtotal, calculateGst } from './utils';
import { log } from 'console';

const BillingNav: React.FC = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const { getAuthHeaders, isAuthenticated } = useAuth();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(initialCustomerInfo);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [autoCloseTimer, setAutoCloseTimer] = useState<NodeJS.Timeout | null>(null);
  const [showCustomerSuccess, setShowCustomerSuccess] = useState(false);
  const [customerSuccessTimer, setCustomerSuccessTimer] = useState<NodeJS.Timeout | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  
  // Refs
  const searchRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // API client
  const authAxios = axios.create({
    baseURL: '/api',
    headers: getAuthHeaders()
  });

  // Cleanup effects
  useEffect(() => {
    return () => {
      if (autoCloseTimer) clearTimeout(autoCloseTimer);
      if (customerSuccessTimer) clearTimeout(customerSuccessTimer);
    };
  }, [autoCloseTimer, customerSuccessTimer]);

  // Reset all notification states
  const resetNotificationStates = () => {
    setShowSuccessNotification(false);
    setShowCustomerSuccess(false);
    setShowErrorPopup(false);
    setErrorMessage(null);
  };

  // Search products with debounce
  useEffect(() => {
    const debouncedSearch = debounce(async (query: string) => {
      if (query.length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await authAxios.get(`/billing/search?query=${encodeURIComponent(query)}`);
        setSearchResults(response.data.products || []);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      }
    }, 300);

    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      setSearchResults([]);
    }

    return () => debouncedSearch.cancel();
  }, [searchQuery]);

  // Close suggestions when clicking outside
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

  // Sync WhatsApp number if useSameAsPhone is true
  useEffect(() => {
    if (customerInfo.useSameAsPhone) {
      setCustomerInfo(prev => ({
        ...prev,
        whatsappNumber: prev.phone
      }));
    }
  }, [customerInfo.phone, customerInfo.useSameAsPhone]);

  // Product quantity handlers
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setSelectedProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const removeProduct = (id: number) => {
    setSelectedProducts(prev => prev.filter(product => product.id !== id));
  };

  // Product selection handler
  const handleProductSelect = (product: Product) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    
    if (existingProduct) {
      updateQuantity(product.id, existingProduct.quantity + 1);
    } else {
      setSelectedProducts(prev => [...prev, { ...product, quantity: 1 }]);
    }
    
    setSearchQuery('');
    setShowSuggestions(false);
  };

  // Validation
  const validateCustomerInfo = (): boolean => {
    if (!customerInfo.companyName.trim()) return false;
    if (!customerInfo.name.trim()) return false;
    if (!customerInfo.phone.trim()) return false;
    if (!customerInfo.address.trim()) return false;
    
    if (customerInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      return false;
    }
    
     if (!/^[0-9]{10,12}$/.test(customerInfo.phone)) return false;
    
    if (!customerInfo.useSameAsPhone && !/^[0-9]{10,12}$/.test(customerInfo.whatsappNumber)) {
        return false;
    }
    
    if (customerInfo.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(customerInfo.gstNumber)) {
      return false;
    }
    
    if (customerInfo.gstNumber) {
      const percentage = parseFloat(customerInfo.gstPercentage);
      if (isNaN(percentage)) return false;
      if (percentage < 0 || percentage > 100) return false;
    }
    
    return true;
  };

  // Calculate totals
  const calculateTotal = () => {
    const subtotal = calculateSubtotal(selectedProducts);
    const gstAmount = customerInfo.gstNumber 
      ? calculateGst(subtotal, customerInfo.gstPercentage) 
      : 0;
    return subtotal + gstAmount;
  };

  // Checkout handler
  // Update the handleCheckout function in BillingNav.tsx
const handleCheckout = async () => {
  if (!isAuthenticated) {
    resetNotificationStates();
    setErrorMessage('Please login to complete checkout');
    setShowErrorPopup(true);
    return;
  }

  if (selectedProducts.length === 0) {
    resetNotificationStates();
    setErrorMessage('Please add at least one product');
    setShowErrorPopup(true);
    return;
  }
  
  setShowValidation(true);
  
  if (!validateCustomerInfo()) {
    resetNotificationStates();
    setErrorMessage('Please fill all required fields correctly');
    setShowErrorPopup(true);
    return;
  }

  setIsCreatingInvoice(true);
  
  try {
    // Clear any existing timers
    if (autoCloseTimer) clearTimeout(autoCloseTimer);
    if (customerSuccessTimer) clearTimeout(customerSuccessTimer);

    // Create customer
    const customerResponse = await authAxios.post('/customer/create', {
      companyName: customerInfo.companyName,
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      whatsappNumber: customerInfo.whatsappNumber,
      address: customerInfo.address,
      gstNumber: customerInfo.gstNumber,
      useSameAsPhone: customerInfo.useSameAsPhone
    });
    
    if (!customerResponse.data.success) {
      throw new Error(customerResponse.data.message || 'Failed to create customer');
    }

    // Show customer success popup
    setShowCustomerSuccess(true);
    setCustomerSuccessTimer(setTimeout(() => setShowCustomerSuccess(false), 3000));

    const customerId = customerResponse.data.data.id;

    // Create invoice
    const invoiceResponse = await authAxios.post('/billing/create', {
      products: selectedProducts,
      customerId,
      paymentMethod,
      total: calculateTotal(),
      gstPercentage: customerInfo.gstNumber ? customerInfo.gstPercentage : null
    });

    const data = invoiceResponse.data;

    // console.log("invoice response:",invoiceResponse);
    
    
        // Remove the error throwing for success case
      if (invoiceResponse.status === 200 || invoiceResponse.status === 201) {
        setInvoiceData(data.invoice);
        setShowSuccessNotification(true);
      
      // Reset form
      setSelectedProducts([]);
      setCustomerInfo(initialCustomerInfo);
      setPaymentMethod('cash');
      setShowValidation(false);
      setShowCheckoutModal(false);
      
      // Set auto-close timer for notification
      setAutoCloseTimer(setTimeout(() => setShowSuccessNotification(false), 5000));
    } else {
      throw new Error(data.message || 'Failed to create invoice');
    }
  } catch (err) {
    console.error('Checkout error:', err);
    const message = axios.isAxiosError(err) 
      ? err.response?.data?.message || 'Failed to process checkout'
      : err instanceof Error ? err.message : 'Failed to process checkout';
    
    // Only show error if we're not already showing customer success
  if (!message.includes('successfully')) {
    setErrorMessage(message);
    setShowErrorPopup(true);
    const timer = setTimeout(() => setShowErrorPopup(false), 5000);
    setAutoCloseTimer(timer);
  }

  } finally {
    setIsCreatingInvoice(false);
  }
};

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

      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/50 border border-pink-900' : 'bg-pink-50 border border-pink-100'}`}>
        <div className="mb-8">
          <h2 className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Add Products
          </h2>
          
          <div ref={searchRef}>
            <ProductSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={searchResults}
              handleProductSelect={handleProductSelect}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
              darkMode={darkMode}
            />
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <div className="mt-6">
            <h3 className={`text-lg font-bold font-['Kantumruy_Pro'] mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Selected Products
            </h3>
            
            <ProductTable
              selectedProducts={selectedProducts}
              updateQuantity={updateQuantity}
              removeProduct={removeProduct}
              darkMode={darkMode}
            />

            <div className="mt-6 flex justify-end">
              <CheckoutSummary
                selectedProducts={selectedProducts}
                customerInfo={customerInfo}
                darkMode={darkMode}
                setShowCheckoutModal={setShowCheckoutModal}
              />
            </div>
          </div>
        )}
      </div>

      {showCheckoutModal && (
        <CheckoutModal
          darkMode={darkMode}
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          handleCheckout={handleCheckout}
          handleCloseModal={() => setShowCheckoutModal(false)}
          isCreatingInvoice={isCreatingInvoice}
          showValidation={showValidation}
        />
      )}

      {showCustomerSuccess && (
        <SuccessCustomerPopup 
          darkMode={darkMode}
          onClose={() => setShowCustomerSuccess(false)}
          message="Customer details saved successfully!"
        />
      )}

      {showErrorPopup && (
        <ErrorPopup
          message={errorMessage || 'An error occurred'}
          darkMode={darkMode}
          onClose={() => setShowErrorPopup(false)}
        />
      )}

   

      {showSuccessNotification && invoiceData && (
        <>
          <SuccessNotification 
            invoiceData={invoiceData}
            darkMode={darkMode}
            onClose={() => setShowSuccessNotification(false)}
          />
          <InvoiceSummary 
            invoiceData={invoiceData}
            darkMode={darkMode}
            onClose={() => {
              setShowSuccessNotification(false);
              setInvoiceData(null);
            }}
          />
        </>
      )}
    </div>
  );
};

export default BillingNav;


