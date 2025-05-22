import React from 'react';

interface CompanyInformationProps {
  darkMode: boolean;
}

const CompanyInformation = ({ darkMode }: CompanyInformationProps) => {
  return (
    <div className={`w-full p-6 rounded-lg mb-6 ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-red-50 border border-red-100'}`}>
      <h3 className={`text-lg font-bold font-['Kantumruy_Pro'] mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Company Information
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Company Name
          </label>
          <input
            type="text"
            placeholder="Enter company name"
            className={`w-full px-3 py-2 rounded-md ${darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300'} border focus:ring-red-500 focus:border-red-500`}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Position
          </label>
          <input
            type="text"
            placeholder="Your position in company"
            className={`w-full px-3 py-2 rounded-md ${darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300'} border focus:ring-red-500 focus:border-red-500`}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Department
          </label>
          <input
            type="text"
            placeholder="Your department"
            className={`w-full px-3 py-2 rounded-md ${darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300'} border focus:ring-red-500 focus:border-red-500`}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;