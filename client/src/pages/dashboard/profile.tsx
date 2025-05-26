



import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import PersonalInformation from './tabs/personalInformation';
import CompanyInformation from './tabs/companyInformation';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Edit2 } from 'lucide-react';
import { Particles } from '@/components/magicui/particles';

interface User {
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  ownerName?: string;
}

interface ProfileProps {
  darkMode: boolean;
  user: User;
  onBack: () => void;
}

function Profile({ darkMode, user, onBack }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'company'>('personal');

  const shopData = {
    ownerName: user.ownerName || user.name,
    phoneNumber: user.phone || '',
    email: user.email
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative overflow-hidden mx-auto shadow-xl backdrop-blur-sm",
        "w-full max-w-4xl rounded-2xl",
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
        {/* Back button */}
        <Button 
          onClick={onBack}
          variant="ghost"
          className={cn(
            "absolute top-6 left-6 rounded-full",
            darkMode 
              ? "text-gray-300 hover:bg-gray-800 hover:text-[#FF719A]" 
              : "text-gray-600 hover:bg-gray-100 hover:text-[#ea384c]"
          )}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="ml-2">Back</span>
        </Button>

        {/* Profile header - centered with more space */}
        <div className="flex flex-col items-center pt-10 pb-6">
          <motion.div 
            className="relative mb-8"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img 
              className={cn(
                "h-32 w-32 rounded-full border-4 shadow-lg",
                darkMode ? "border-gray-700/50" : "border-white/20"
              )} 
              src={user.avatar} 
              alt="User Avatar" 
            />
            <Button 
              size="icon"
              className={cn(
                "absolute bottom-0 right-0 text-white p-2 rounded-full shadow-lg",
                "bg-gradient-to-r from-[#ea384c] to-[#FF719A]",
                darkMode 
                  ? "hover:shadow-[#FF719A]/20" 
                  : "hover:shadow-[#ea384c]/20"
              )}
            >
              <Edit2 className="h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.h2 
            className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {user.name}
          </motion.h2>
          <motion.p 
            className={cn(
              "mb-10 text-xl",
              darkMode ? "text-gray-300/90" : "text-gray-600"
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {user.email}
          </motion.p>
          
          {/* Wider Tabs Navigation */}
          <motion.div 
            className={cn(
              "w-full max-w-3xl mx-auto flex border-b mb-10",
              darkMode ? "border-gray-700/50" : "border-gray-200"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setActiveTab('personal')}
              className={cn(
                "px-8 py-4 font-medium text-base flex-1 text-center relative",
                activeTab === 'personal'
                  ? darkMode
                    ? "text-[#FF719A]"
                    : "text-[#ea384c]"
                  : darkMode
                    ? "text-gray-400 hover:text-[#FF719A]"
                    : "text-gray-500 hover:text-[#ea384c]"
              )}
            >
              Personal Information
              {activeTab === 'personal' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ea384c] to-[#FF719A]"
                  layoutId="tabIndicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('company')}
              className={cn(
                "px-8 py-4 font-medium text-base flex-1 text-center relative",
                activeTab === 'company'
                  ? darkMode
                    ? "text-[#FF719A]"
                    : "text-[#ea384c]"
                  : darkMode
                    ? "text-gray-400 hover:text-[#FF719A]"
                    : "text-gray-500 hover:text-[#ea384c]"
              )}
            >
              Company Information
              {activeTab === 'company' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ea384c] to-[#FF719A]"
                  layoutId="tabIndicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </motion.div>
        </div>
        
        {/* Expanded Form Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-3xl mx-auto"
        >
          {activeTab === 'personal' ? (
            <PersonalInformation darkMode={darkMode} initialData={shopData} />
          ) : (
            <CompanyInformation darkMode={darkMode} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Profile;






