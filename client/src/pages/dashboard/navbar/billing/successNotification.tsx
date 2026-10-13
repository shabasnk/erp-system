// // src/components/billing/SuccessNotification.tsx
// import React, { useEffect } from 'react';
// import { InvoiceData } from './types';
// import { formatCurrency } from './utils';

// interface SuccessNotificationProps {
//   invoiceData: InvoiceData;
//   darkMode: boolean;
//   onClose: () => void;
// }

// export const SuccessNotification: React.FC<SuccessNotificationProps> = ({ 
//   invoiceData, 
//   darkMode, 
//   onClose 
// }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50`}>
//       <div 
//         className={`p-6 rounded-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl transform transition-all duration-300 scale-100`}
//       >
//         <div className="text-center">
//           <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
//             <svg 
//               className="h-6 w-6 text-green-600" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round" 
//                 strokeWidth={2} 
//                 d="M5 13l4 4L19 7" 
//               />
//             </svg>
//           </div>
//           <h3 className={`text-lg leading-6 font-medium mt-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//             Invoice Created Successfully!
//           </h3>
//           <div className={`mt-2 px-4 py-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//             <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//               Invoice #: <span className="font-medium">{invoiceData.id}</span>
//             </p>
//             <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//               Total Amount: <span className="font-medium">{formatCurrency(invoiceData.total)}</span>
//             </p>
//           </div>
//           <div className="mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className={`inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md ${
//                 darkMode 
//                   ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500' 
//                   : 'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500'
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };














// src/components/billing/SuccessNotification.tsx
import React, { useEffect } from 'react';
import axios from 'axios';
import { InvoiceData } from './types';
import { formatCurrency } from './utils';
import { useAuth } from '@/hooks/useAuth';

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
  const { getAuthHeaders } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // Add download function
  const handleDownload = async () => {
    try {
      const response = await axios.get(`/api/billing/download-invoice/${invoiceData.id}`, {
        responseType: 'blob',
        headers: getAuthHeaders()
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice_${invoiceData.invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading invoice:', error);
    }
  };

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
              Invoice #: <span className="font-medium">{invoiceData.invoiceNumber}</span>
            </p>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Amount: <span className="font-medium">{formatCurrency(invoiceData.total)}</span>
            </p>
          </div>
          <div className="mt-4 flex justify-center space-x-3">
            <button
              type="button"
              onClick={handleDownload}
              className={`inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md ${
                darkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500' 
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
            >
              Download PDF
            </button>
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