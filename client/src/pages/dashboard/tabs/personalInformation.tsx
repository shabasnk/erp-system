// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '@/hooks/useAuth';

// interface ShopData {
//   ownerName: string;
//   phoneNumber: string;
//   email: string;
// }

// interface PersonalInformationProps {
//   darkMode: boolean;
//   initialData: ShopData;
// }

// const PersonalInformation = ({ darkMode, initialData }: PersonalInformationProps) => {
//   const { getAuthHeaders, isAuthenticated, isLoading: authLoading } = useAuth();
//   const [shopData, setShopData] = useState<ShopData>(initialData);
//   const [originalData, setOriginalData] = useState<ShopData>(initialData);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [editingField, setEditingField] = useState<'ownerName' | 'phoneNumber' | null>(null);

//   useEffect(() => {
//     if (isAuthenticated && !authLoading) {
//       fetchShopData();
//     }
//   }, [isAuthenticated, authLoading]);

//   const fetchShopData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:8080/api/shops/shops', {
//         headers: getAuthHeaders()
//       });
//       const newData = {
//         ownerName: response.data.ownerName || initialData.ownerName,
//         phoneNumber: response.data.phoneNumber || initialData.phoneNumber,
//         email: initialData.email
//       };
//       setShopData(newData);
//       setOriginalData(newData);
//     } catch (err) {
//       setError('Failed to fetch shop information');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setShopData(prev => ({ ...prev, [name]: value }));
//   };

//   const startEditing = (field: 'ownerName' | 'phoneNumber') => {
//     setEditingField(field);
//     setError('');
//     setSuccessMessage('');
//   };

//   const cancelEditing = () => {
//     setShopData(originalData);
//     setEditingField(null);
//   };

//   const saveChanges = async (field: 'ownerName' | 'phoneNumber') => {
//   try {
//     setError('');
//     setLoading(true);
    
//     const response = await axios.put('http://localhost:8080/api/shops/shops', {
//       [field]: shopData[field]
//     }, {
//       headers: getAuthHeaders()
//     });
    
//     setOriginalData({
//       ...originalData,
//       [field]: shopData[field]
//     });
    
//     setSuccessMessage('Changes saved successfully!');
//     setTimeout(() => setSuccessMessage(''), 3000);
//     setEditingField(null);
//   } catch (err) {
//     if (axios.isAxiosError(err)) {
//       setError(err.response?.data?.message || 'Failed to save changes');
//     } else {
//       setError('An unexpected error occurred');
//     }
//   } finally {
//     setLoading(false);
//   }
// };

//   if (authLoading) {
//     return <div>Loading authentication...</div>;
//   }

//   if (!isAuthenticated) {
//     return <div className="text-red-500">Please login to view this page</div>;
//   }

//   if (loading) {
//     return <div>Loading shop information...</div>;
//   }

//   return (
//     <div className={`w-full p-6 rounded-xl mb-6 relative overflow-hidden ${darkMode ? 'bg-gray-800 border border-pink-900' : 'bg-white border border-pink-200'}`}>
//       <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-20"></div>
//       <h2 className={`text-xl font-bold mb-6 relative z-10 ${darkMode ? 'text-pink-100' : 'text-pink-800'}`}>
//         Personal Information
//       </h2>
      
//       {error && (
//         <div className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-800'}`}>
//           {error}
//         </div>
//       )}

//       {successMessage && (
//         <div className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-green-900/50 text-green-200' : 'bg-green-100 text-green-800'}`}>
//           {successMessage}
//         </div>
//       )}

//       <div className="space-y-5 relative z-10">
//         <div>
//           <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-pink-200' : 'text-pink-800'} font-['Kantumruy_Pro']`}>
//             Full Name
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               name="ownerName"
//               value={shopData.ownerName}
//               onChange={handleChange}
//               disabled={editingField !== 'ownerName'}
//               className={`w-full px-4 py-3 rounded-lg text-base ${darkMode 
//                 ? 'bg-gray-700 border-pink-800 text-white placeholder-pink-300 focus:ring-pink-400 focus:border-pink-400' 
//                 : 'bg-white border-pink-200 text-gray-800 placeholder-pink-400 focus:ring-pink-400 focus:border-pink-400'} border shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed`}
//             />
//             {editingField === 'ownerName' ? (
//               <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
//                 <button 
//                   onClick={() => saveChanges('ownerName')}
//                   className={`px-2 py-1 text-xs rounded-md ${darkMode ? 'bg-pink-600 hover:bg-pink-700 text-white' : 'bg-pink-500 hover:bg-pink-600 text-white'}`}
//                 >
//                   Save
//                 </button>
//                 <button 
//                   onClick={cancelEditing}
//                   className={`px-2 py-1 text-xs rounded-md ${darkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <button 
//                 onClick={() => startEditing('ownerName')}
//                 className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs rounded-md ${darkMode ? 'bg-pink-700 hover:bg-pink-600 text-white' : 'bg-pink-200 hover:bg-pink-300 text-pink-800'}`}
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         </div>
        
//         <div>
//           <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-pink-200' : 'text-pink-800'} font-['Kantumruy_Pro']`}>
//             Phone Number
//           </label>
//           <div className="relative">
//             <input
//               type="tel"
//               name="phoneNumber"
//               value={shopData.phoneNumber}
//               onChange={handleChange}
//               disabled={editingField !== 'phoneNumber'}
//               placeholder="Enter your phone number"
//               className={`w-full px-4 py-3 rounded-lg text-base ${darkMode 
//                 ? 'bg-gray-700 border-pink-800 text-white placeholder-pink-300 focus:ring-pink-400 focus:border-pink-400' 
//                 : 'bg-white border-pink-200 text-gray-800 placeholder-pink-400 focus:ring-pink-400 focus:border-pink-400'} border shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed`}
//             />
//             {editingField === 'phoneNumber' ? (
//               <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
//                 <button 
//                   onClick={() => saveChanges('phoneNumber')}
//                   className={`px-2 py-1 text-xs rounded-md ${darkMode ? 'bg-pink-600 hover:bg-pink-700 text-white' : 'bg-pink-500 hover:bg-pink-600 text-white'}`}
//                 >
//                   Save
//                 </button>
//                 <button 
//                   onClick={cancelEditing}
//                   className={`px-2 py-1 text-xs rounded-md ${darkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <button 
//                 onClick={() => startEditing('phoneNumber')}
//                 className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs rounded-md ${darkMode ? 'bg-pink-700 hover:bg-pink-600 text-white' : 'bg-pink-200 hover:bg-pink-300 text-pink-800'}`}
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         </div>

      
//       </div>
//     </div>
//   );
// };

// export default PersonalInformation;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Edit, Check, X, Loader2 } from 'lucide-react';

interface ShopData {
  ownerName: string;
  phoneNumber: string;
  email: string;
}

interface PersonalInformationProps {
  darkMode: boolean;
  initialData: ShopData;
}

const PersonalInformation = ({ darkMode, initialData }: PersonalInformationProps) => {
  const { getAuthHeaders, isAuthenticated, isLoading: authLoading } = useAuth();
  const [shopData, setShopData] = useState<ShopData>(initialData);
  const [originalData, setOriginalData] = useState<ShopData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editingField, setEditingField] = useState<'ownerName' | 'phoneNumber' | null>(null);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchShopData();
    }
  }, [isAuthenticated, authLoading]);

  const fetchShopData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/shops/shops', {
        headers: getAuthHeaders()
      });
      const newData = {
        ownerName: response.data.ownerName || initialData.ownerName,
        phoneNumber: response.data.phoneNumber || initialData.phoneNumber,
        email: initialData.email
      };
      setShopData(newData);
      setOriginalData(newData);
    } catch (err) {
      setError('Failed to fetch shop information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShopData(prev => ({ ...prev, [name]: value }));
  };

  const startEditing = (field: 'ownerName' | 'phoneNumber') => {
    setEditingField(field);
    setError('');
    setSuccessMessage('');
  };

  const cancelEditing = () => {
    setShopData(originalData);
    setEditingField(null);
  };

  const saveChanges = async (field: 'ownerName' | 'phoneNumber') => {
    try {
      setError('');
      setLoading(true);
      
      const response = await axios.put('http://localhost:8080/api/shops/shops', {
        [field]: shopData[field]
      }, {
        headers: getAuthHeaders()
      });
      
      setOriginalData({
        ...originalData,
        [field]: shopData[field]
      });
      
      setSuccessMessage('Changes saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setEditingField(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to save changes');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[#ea384c] w-8 h-8" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-8 rounded-xl bg-gradient-to-br from-white to-gray-50/50 border border-red-100 shadow-lg"
      >
        <h3 className="text-xl font-bold text-[#ea384c] mb-2">Access Denied</h3>
        <p className="text-gray-600">Please login to view this page</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`w-full p-8 rounded-2xl relative overflow-hidden ${darkMode ? 'bg-gray-900/50 border border-red-900/50' : 'bg-white border border-red-100'} shadow-xl backdrop-blur-sm`}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#ea384c]/5 rounded-full blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#FF719A]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <motion.h2 
          className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Personal Information
          <motion.div 
            className="h-1 mt-1 bg-gradient-to-r from-[#ea384c] to-[#FF719A] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.h2>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-red-900/30 text-red-100 border border-red-800/50' : 'bg-red-50 text-red-800 border border-red-200'}`}
          >
            {error}
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-green-900/30 text-green-100 border border-green-800/50' : 'bg-green-50 text-green-800 border border-green-200'}`}
          >
            {successMessage}
          </motion.div>
        )}

        <div className="space-y-6">
          {/* Full Name Field */}
          <div>
            <motion.label 
              className={`block text-sm font-medium mb-3 ${darkMode ? 'text-pink-200' : 'text-gray-700'}`}
            >
              Full Name
            </motion.label>
            <div className="relative">
              <motion.input
                type="text"
                name="ownerName"
                value={shopData.ownerName}
                onChange={handleChange}
                disabled={editingField !== 'ownerName'}
                className={`w-full px-5 py-3 rounded-xl text-base ${darkMode 
                  ? 'bg-gray-800/50 border-red-900/50 text-white placeholder-pink-300 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500' 
                  : 'bg-white border-red-100 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-pink-500/30 focus:border-pink-300'} border shadow-sm focus:outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed`}
              />
              {editingField === 'ownerName' ? (
                <motion.div 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Button 
                    onClick={() => saveChanges('ownerName')}
                    size="sm"
                    className="rounded-lg h-8 px-3 bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#ea384c]/90 hover:to-[#FF719A]/90 text-white"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  </Button>
                  <Button 
                    onClick={cancelEditing}
                    size="sm"
                    variant="outline"
                    className="rounded-lg h-8 px-3 border-red-200 hover:bg-red-50 text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              ) : (
                <Button 
                  onClick={() => startEditing('ownerName')}
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg h-8 px-3 text-[#ea384c] hover:bg-[#ea384c]/10"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Phone Number Field */}
          <div>
            <motion.label 
              className={`block text-sm font-medium mb-3 ${darkMode ? 'text-pink-200' : 'text-gray-700'}`}
            >
              Phone Number
            </motion.label>
            <div className="relative">
              <motion.input
                type="tel"
                name="phoneNumber"
                value={shopData.phoneNumber}
                onChange={handleChange}
                disabled={editingField !== 'phoneNumber'}
                placeholder="Enter your phone number"
                className={`w-full px-5 py-3 rounded-xl text-base ${darkMode 
                  ? 'bg-gray-800/50 border-red-900/50 text-white placeholder-pink-300 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500' 
                  : 'bg-white border-red-100 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-pink-500/30 focus:border-pink-300'} border shadow-sm focus:outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed`}
              />
              {editingField === 'phoneNumber' ? (
                <motion.div 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Button 
                    onClick={() => saveChanges('phoneNumber')}
                    size="sm"
                    className="rounded-lg h-8 px-3 bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#ea384c]/90 hover:to-[#FF719A]/90 text-white"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  </Button>
                  <Button 
                    onClick={cancelEditing}
                    size="sm"
                    variant="outline"
                    className="rounded-lg h-8 px-3 border-red-200 hover:bg-red-50 text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              ) : (
                <Button 
                  onClick={() => startEditing('phoneNumber')}
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg h-8 px-3 text-[#ea384c] hover:bg-[#ea384c]/10"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalInformation;