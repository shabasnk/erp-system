import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import PersonalInformation from './tabs/personalInformation';
import CompanyInformation from './tabs/companyInformation';

interface ProfileProps {
  darkMode: boolean;
  user: {
    name: string;
    email: string;
    avatar: string;
    phone?: string;
  };
  onBack: () => void;
}

function Profile({ darkMode, user, onBack }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'company'>('personal');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        `rounded-xl shadow-lg p-8 relative overflow-hidden ${darkMode ? 'bg-gray-900/90 border border-pink-900' : 'bg-white/90 border border-pink-200'}`,
      )}
    >
      {/* Pink Gradient Border Beam Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className={`absolute inset-0 bg-gradient-to-r ${
          darkMode 
            ? 'from-transparent via-pink-500/20 to-transparent' 
            : 'from-transparent via-pink-400/20 to-transparent'
        } opacity-70`} />
      </div>

      <div className="flex flex-col items-center relative z-10">
        <div className="relative mb-6">
          <img 
            className="h-24 w-24 rounded-full border-2 border-pink-500" 
            src={user.avatar} 
            alt="User Avatar" 
          />
          <button className="absolute bottom-0 right-0 bg-gradient-to-r from-[#ea384c] to-[#FF719A] text-white p-1 rounded-full shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>
        
        <h2 className={`text-2xl font-bold font-['Kantumruy_Pro'] mb-1 bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent`}>
          {user.name}
        </h2>
        <p className={`mb-6 ${darkMode ? 'text-pink-200' : 'text-pink-700'}`}>{user.email}</p>
        
        {/* Tabs Navigation */}
        <div className={`w-full flex border-b mb-6 ${darkMode ? 'border-pink-800' : 'border-pink-200'}`}>
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 font-medium text-sm flex-1 text-center font-['Kantumruy_Pro'] ${
              activeTab === 'personal'
                ? darkMode
                  ? 'text-pink-400 border-b-2 border-pink-400'
                  : 'text-pink-600 border-b-2 border-pink-600'
                : darkMode
                  ? 'text-pink-200 hover:text-pink-300'
                  : 'text-pink-500 hover:text-pink-700'
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`px-4 py-2 font-medium text-sm flex-1 text-center font-['Kantumruy_Pro'] ${
              activeTab === 'company'
                ? darkMode
                  ? 'text-pink-400 border-b-2 border-pink-400'
                  : 'text-pink-600 border-b-2 border-pink-600'
                : darkMode
                  ? 'text-pink-200 hover:text-pink-300'
                  : 'text-pink-500 hover:text-pink-700'
            }`}
          >
            Company Information
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'personal' ? (
          <PersonalInformation darkMode={darkMode} user={user} />
        ) : (
          <CompanyInformation darkMode={darkMode} />
        )}
        
        <div className="flex space-x-4 w-full mt-6">
          <button
            onClick={onBack}
            className={`flex-1 py-3 px-4 rounded-lg font-medium shadow-md transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-pink-200' 
                : 'bg-gray-200 hover:bg-gray-300 text-pink-800'
            } font-['Kantumruy_Pro']`}
          >
            Back to Dashboard
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d]' 
                : 'bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d]'
            } relative overflow-hidden group font-['Kantumruy_Pro']`}
          >
            <span className="relative z-10">Save Changes</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF719A] to-[#ea384c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Profile;


