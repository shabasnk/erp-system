import React from 'react';

interface PersonalInformationProps {
  darkMode: boolean;
  user: {
    name: string;
    email: string;
    avatar: string;
    phone?: string;
  };
}

const PersonalInformation = ({ darkMode, user }: PersonalInformationProps) => {
  return (
    <div className={`w-full p-6 rounded-xl mb-6 relative overflow-hidden ${darkMode ? 'bg-gray-800 border border-pink-900' : 'bg-white border border-pink-200'}`}>
      {/* Pink Gradient Border Beam Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className={`absolute inset-0 bg-gradient-to-r ${
          darkMode 
            ? 'from-transparent via-pink-500/20 to-transparent' 
            : 'from-transparent via-pink-400/20 to-transparent'
        } opacity-70`} />
      </div>
      
      {/* Pink Gradient Title */}
     <h3 className={`text-xl font-bold font-['Kantumruy_Pro'] mb-6 bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent`}>
        Personal Information
      </h3>
      
      <div className="space-y-5 relative z-10">
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-pink-200' : 'text-pink-800'} font-['Kantumruy_Pro']`}>
            Full Name
          </label>
          <input
            type="text"
            defaultValue={user.name}
            className={`w-full px-4 py-3 rounded-lg text-base ${darkMode 
              ? 'bg-gray-700 border-pink-800 text-white placeholder-pink-300 focus:ring-pink-400 focus:border-pink-400' 
              : 'bg-white border-pink-200 text-gray-800 placeholder-pink-400 focus:ring-pink-400 focus:border-pink-400'} border shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-pink-200' : 'text-pink-800'} font-['Kantumruy_Pro']`}>
            Email Address
          </label>
          <input
            type="email"
            defaultValue={user.email}
            className={`w-full px-4 py-3 rounded-lg text-base ${darkMode 
              ? 'bg-gray-700 border-pink-800 text-white placeholder-pink-300 focus:ring-pink-400 focus:border-pink-400' 
              : 'bg-white border-pink-200 text-gray-800 placeholder-pink-400 focus:ring-pink-400 focus:border-pink-400'} border shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-pink-200' : 'text-pink-800'} font-['Kantumruy_Pro']`}>
            Phone Number
          </label>
          <input
            type="tel"
            defaultValue={user.phone || ''}
            placeholder="Enter your phone number"
            className={`w-full px-4 py-3 rounded-lg text-base ${darkMode 
              ? 'bg-gray-700 border-pink-800 text-white placeholder-pink-300 focus:ring-pink-400 focus:border-pink-400' 
              : 'bg-white border-pink-200 text-gray-800 placeholder-pink-400 focus:ring-pink-400 focus:border-pink-400'} border shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
          />
        </div>

        <div className="pt-2">
         <button
            className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d]' 
                : 'bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d]'
            } relative overflow-hidden group font-['Kantumruy_Pro']`}
          >
            <span className="relative z-10">Update Information</span>
            {/* Animated background for extra effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF719A] to-[#ea384c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;