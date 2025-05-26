

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Edit, Check, X, Loader2 } from 'lucide-react';
import { Particles } from '@/components/magicui/particles';
import { cn } from "@/lib/utils";

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
        <Loader2 className={cn(
          "animate-spin w-8 h-8",
          darkMode ? "text-[#FF719A]" : "text-[#ea384c]"
        )} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "text-center p-8 rounded-xl border shadow-lg",
          darkMode 
            ? "bg-gray-900/80 border-gray-700/50 text-gray-300" 
            : "bg-white/90 border-gray-200 text-gray-600"
        )}
      >
        <h3 className={cn(
          "text-xl font-bold mb-2 bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent"
        )}>
          Access Denied
        </h3>
        <p>Please login to view this page</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative overflow-hidden shadow-xl backdrop-blur-sm",
        "w-full rounded-2xl",
        darkMode 
          ? "bg-gray-900/80 border border-gray-700/50" 
          : "bg-white/90 border border-gray-200"
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <Particles        
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={darkMode ? "#FF719A" : "#ea384c"}
          refresh={false}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: darkMode 
              ? "radial-gradient(circle at center, transparent, rgba(255,113,154,0.03))"
              : "radial-gradient(circle at center, transparent, rgba(234,56,76,0.03))",
            filter: "blur(80px)",
            transform: "translateZ(0)",
          }}
        />
      </div>

      {/* Gradient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(
          "absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl",
          darkMode ? "bg-[#FF719A]/5" : "bg-[#ea384c]/5"
        )} />
        <div className={cn(
          "absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-3xl",
          darkMode ? "bg-[#ea384c]/5" : "bg-[#FF719A]/5"
        )} />
      </div>

      {/* Border gradient effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r from-transparent to-transparent opacity-50",
          darkMode 
            ? "via-pink-500/15" 
            : "via-pink-400/15"
        )} />
      </div>

      <div className="relative z-10 p-8">
        <motion.h2 
          className={cn(
            "text-2xl font-bold mb-8",
            darkMode ? "text-white" : "text-gray-900"
          )}
        >
          Personal Information
          <motion.div 
            className={cn(
              "h-1 mt-1 rounded-full bg-gradient-to-r from-[#ea384c] to-[#FF719A]"
            )}
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
            className={cn(
              "mb-6 p-4 rounded-lg border",
              darkMode 
                ? "bg-red-900/30 text-red-100 border-red-800/50" 
                : "bg-red-50 text-red-800 border-red-200"
            )}
          >
            {error}
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "mb-6 p-4 rounded-lg border",
              darkMode 
                ? "bg-green-900/30 text-green-100 border-green-800/50" 
                : "bg-green-50 text-green-800 border-green-200"
            )}
          >
            {successMessage}
          </motion.div>
        )}

        <div className="space-y-6">
          {/* Full Name Field */}
          <div>
            <motion.label 
              className={cn(
                "block text-sm font-medium mb-3",
                darkMode ? "text-pink-200" : "text-gray-700"
              )}
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
                className={cn(
                  "w-full px-5 py-3 rounded-xl text-base border shadow-sm focus:outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed",
                  darkMode 
                    ? "bg-gray-800/50 border-gray-700/50 text-white placeholder-pink-300 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500" 
                    : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-pink-500/30 focus:border-pink-300"
                )}
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
                    className={cn(
                      "rounded-lg h-8 px-3 text-white",
                      "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#ea384c]/90 hover:to-[#FF719A]/90"
                    )}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  </Button>
                  <Button 
                    onClick={cancelEditing}
                    size="sm"
                    variant="outline"
                    className={cn(
                      "rounded-lg h-8 px-3",
                      darkMode 
                        ? "border-gray-600 hover:bg-gray-800 text-gray-300" 
                        : "border-gray-200 hover:bg-gray-50 text-gray-600"
                    )}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              ) : (
                <Button 
                  onClick={() => startEditing('ownerName')}
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg h-8 px-3",
                    darkMode 
                      ? "text-[#FF719A] hover:bg-[#FF719A]/10" 
                      : "text-[#ea384c] hover:bg-[#ea384c]/10"
                  )}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Phone Number Field */}
          <div>
            <motion.label 
              className={cn(
                "block text-sm font-medium mb-3",
                darkMode ? "text-pink-200" : "text-gray-700"
              )}
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
                className={cn(
                  "w-full px-5 py-3 rounded-xl text-base border shadow-sm focus:outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed",
                  darkMode 
                    ? "bg-gray-800/50 border-gray-700/50 text-white placeholder-pink-300 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500" 
                    : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-pink-500/30 focus:border-pink-300"
                )}
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
                    className={cn(
                      "rounded-lg h-8 px-3 text-white",
                      "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#ea384c]/90 hover:to-[#FF719A]/90"
                    )}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  </Button>
                  <Button 
                    onClick={cancelEditing}
                    size="sm"
                    variant="outline"
                    className={cn(
                      "rounded-lg h-8 px-3",
                      darkMode 
                        ? "border-gray-600 hover:bg-gray-800 text-gray-300" 
                        : "border-gray-200 hover:bg-gray-50 text-gray-600"
                    )}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              ) : (
                <Button 
                  onClick={() => startEditing('phoneNumber')}
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg h-8 px-3",
                    darkMode 
                      ? "text-[#FF719A] hover:bg-[#FF719A]/10" 
                      : "text-[#ea384c] hover:bg-[#ea384c]/10"
                  )}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Email Field (readonly) */}
        
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalInformation;






