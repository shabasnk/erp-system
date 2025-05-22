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
        `rounded-xl shadow-lg p-8 relative overflow-hidden ${darkMode ? 'bg-black/70 border border-gray-800' : 'bg-white/90'}`,
      )}
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <img 
            className="h-24 w-24 rounded-full border-2 border-red-400" 
            src={user.avatar} 
            alt="User Avatar" 
          />
          <button className="absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>
        
        <h2 className={`text-2xl font-bold font-['Kantumruy_Pro'] mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {user.name}
        </h2>
        <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</p>
        
        {/* Tabs Navigation */}
        <div className={`w-full flex border-b mb-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 font-medium text-sm flex-1 text-center ${
              activeTab === 'personal'
                ? darkMode
                  ? 'text-red-400 border-b-2 border-red-400'
                  : 'text-red-600 border-b-2 border-red-600'
                : darkMode
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`px-4 py-2 font-medium text-sm flex-1 text-center ${
              activeTab === 'company'
                ? darkMode
                  ? 'text-red-400 border-b-2 border-red-400'
                  : 'text-red-600 border-b-2 border-red-600'
                : darkMode
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-500 hover:text-gray-700'
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
        
        <div className="flex space-x-4 w-full">
          <button
            onClick={onBack}
            className={`flex-1 py-2 px-4 rounded-md font-medium ${darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            Back to Dashboard
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md font-medium ${darkMode 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-red-600 hover:bg-red-700 text-white'}`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Profile;