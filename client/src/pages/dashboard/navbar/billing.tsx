import React from 'react';

interface BillingNavProps {
  darkMode: boolean;
  setActiveTab?: (tab: string) => void;
}

const BillingNav: React.FC<BillingNavProps> = ({ darkMode, setActiveTab }) => {
  return (
    <>
      {setActiveTab && (
        <button
          onClick={() => setActiveTab('products')}
          className={`px-3 py-2 rounded-md text-sm font-medium font-['Kantumruy_Pro'] ${darkMode ? 'text-gray-300 hover:text-pink-300 hover:bg-gray-700' : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'}`}
        >
          Products
        </button>
      )}
      {setActiveTab && (
        <button
          onClick={() => setActiveTab('billing')}
          className={`px-3 py-2 rounded-md text-sm font-medium font-['Kantumruy_Pro'] ${darkMode ? 'bg-gray-800 text-pink-400' : 'bg-pink-100 text-pink-600'}`}
        >
          Billing
        </button>
      )}
      
      {!setActiveTab && (
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
              <h2 className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Billing Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Billing Summary */}
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 border border-pink-900' : 'bg-white border border-pink-200'} shadow-sm`}>
                  <h3 className={`font-medium font-['Kantumruy_Pro'] mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Current Plan
                  </h3>
                  <div className={`p-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-pink-100'} mb-4`}>
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Premium Plan</span>
                      <span className={`font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>$29.99/month</span>
                    </div>
                  </div>
                  <button
                    className={`w-full py-2 rounded-md font-medium ${darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white border border-pink-900' 
                      : 'bg-white hover:bg-gray-50 text-gray-800 border border-pink-200'} shadow-sm`}
                  >
                    Change Plan
                  </button>
                </div>

                {/* Payment Method */}
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 border border-pink-900' : 'bg-white border border-pink-200'} shadow-sm`}>
                  <h3 className={`font-medium font-['Kantumruy_Pro'] mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Payment Method
                  </h3>
                  <div className={`p-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-pink-100'} mb-4 flex items-center justify-between`}>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-blue-500 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Visa ending in 4242</p>
                        <p className={`text-xs ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>Expires 12/2024</p>
                      </div>
                    </div>
                    <button className={`text-sm ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                      Edit
                    </button>
                  </div>
                  <button
                    className={`w-full py-2 rounded-md font-medium ${darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white border border-pink-900' 
                      : 'bg-white hover:bg-gray-50 text-gray-800 border border-pink-200'} shadow-sm`}
                  >
                    Add Payment Method
                  </button>
                </div>
              </div>

              {/* Billing History */}
              <div className="mt-6">
                <h3 className={`font-medium font-['Kantumruy_Pro'] mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Billing History
                </h3>
                <div className={`rounded-lg overflow-hidden border ${darkMode ? 'border-pink-900' : 'border-pink-200'}`}>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-pink-900">
                    <thead className={`${darkMode ? 'bg-gray-800' : 'bg-pink-50'}`}>
                      <tr>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                          Date
                        </th>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                          Description
                        </th>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                          Amount
                        </th>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y divide-gray-200 dark:divide-pink-900 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
                      {[1, 2, 3].map((invoice) => (
                        <tr key={invoice}>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                            {new Date().toLocaleDateString()}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Premium Plan Subscription
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                            $29.99
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                            Paid
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BillingNav;