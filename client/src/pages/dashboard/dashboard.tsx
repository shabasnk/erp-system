import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { Particles } from '@/components/magicui/particles';
import { BorderBeam } from '@/components/magicui/border-beam';
import { useNavigate } from 'react-router-dom';
import Profile from './profile'; // Make sure to import the Profile component

// Import font
import '@fontsource/kantumruy-pro/400.css';
import '@fontsource/kantumruy-pro/600.css';
import '@fontsource/kantumruy-pro/700.css';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  };

  const handleLogout = () => {
    // Clear user data and token
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col overflow-hidden ${darkMode ? 'bg-black' : 'bg-gradient-to-b from-white to-gray-50/30'}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <Particles        
          className="absolute inset-0"
          quantity={300}
          ease={80}
          color={darkMode ? "#FF4B4B" : "#FF4B4B"} 
          refresh={false}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: darkMode 
              ? "radial-gradient(circle at center, transparent, rgba(0, 0, 0, 0.5))" 
              : "radial-gradient(circle at center, transparent, rgba(255,75,75,0.03))",
            filter: "blur(80px)",
            transform: "translateZ(0)",
          }}
        />
      </div>

      {/* Navbar */}
      <nav className={`relative z-20 ${darkMode ? 'bg-black/80 border-b border-gray-800' : 'bg-white/80 backdrop-blur-sm'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <motion.div 
                className="flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-xl font-['Kantumruy_Pro'] text-rose-400 font-bold">WEZ-</div>
                <span className={`text-xl font-['Kantumruy_Pro'] ${darkMode ? 'text-white' : 'text-gray-900'}`}>ER</span>
              </motion.div>
            </div>

            {/* Navigation Links */}
            {!showProfile && (
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4">
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`px-3 py-2 rounded-md text-sm font-medium font-['Kantumruy_Pro'] ${activeTab === 'products' 
                      ? (darkMode ? 'bg-gray-800 text-white' : 'bg-red-100 text-red-600') 
                      : (darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-red-600 hover:bg-red-50')}`}
                  >
                    Products
                  </button>
                  <button
                    onClick={() => setActiveTab('billing')}
                    className={`px-3 py-2 rounded-md text-sm font-medium font-['Kantumruy_Pro'] ${activeTab === 'billing' 
                      ? (darkMode ? 'bg-gray-800 text-white' : 'bg-red-100 text-red-600') 
                      : (darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-red-600 hover:bg-red-50')}`}
                  >
                    Billing
                  </button>
                </div>
              </div>
            )}

            {/* Right side - Profile */}
            <div className="ml-4 flex items-center md:ml-6">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full mr-2 ${darkMode ? 'bg-black text-red-600 border border-gray-800' : 'bg-white text-red-400'} shadow-md`}
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Profile dropdown */}
              {!showProfile && (
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={user.avatar} alt="" />
                    </button>
                  </div>

                  {/* Profile dropdown panel */}
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} ring-1 ring-black ring-opacity-5 focus:outline-none z-30`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          setShowProfile(true);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        role="menuitem"
                      >
                        Your Profile
                      </button>
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        role="menuitem"
                      >
                        Settings
                      </a>
                      <button
                        onClick={handleLogout}
                        className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}`}
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showProfile ? (
            <Profile 
              darkMode={darkMode} 
              user={user} 
              onBack={() => setShowProfile(false)} 
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={cn(
                `rounded-xl shadow-lg p-8 relative overflow-hidden ${darkMode ? 'bg-black/70 border border-gray-800' : 'bg-white/90'}`,
              )}
            >
              {/* Border Beam Effect */}
              <BorderBeam
                duration={6}
                size={300}
                className={`from-transparent ${darkMode ? 'via-red-500' : 'via-red-500'} to-transparent`}
              />

              <div className="mb-8">
                <h1 className={`text-3xl font-bold font-['Kantumruy_Pro'] ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Welcome to your Dashboard, {user.name}!
                </h1>
                <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {activeTab === 'products' ? 'Manage your products here' : 'View and manage your billing information'}
                </p>
              </div>

              {/* Tab Content */}
              <div className="mt-8">
                {activeTab === 'products' ? (
                  <div>
                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-red-50 border border-red-100'}`}>
                      <h2 className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Your Products
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Product Cards */}
                        {[1, 2, 3].map((product) => (
                          <div 
                            key={product}
                            className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 border border-gray-700 hover:border-red-500' : 'bg-white border border-gray-200 hover:border-red-300'} transition-all duration-300 shadow-sm`}
                          >
                            <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-md mb-3 flex items-center justify-center">
                              <span className="text-gray-400 dark:text-gray-500">Product Image</span>
                            </div>
                            <h3 className={`font-medium font-['Kantumruy_Pro'] ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                              Product {product}
                            </h3>
                            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Description of product {product}
                            </p>
                            <div className="mt-3 flex justify-between items-center">
                              <span className={`font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>${(product * 19.99).toFixed(2)}</span>
                              <button
                                className={`px-3 py-1 rounded text-sm font-medium ${darkMode 
                                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                                  : 'bg-red-100 hover:bg-red-200 text-red-600'}`}
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <button
                          className={`px-4 py-2 rounded-md font-medium ${darkMode 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-red-600 hover:bg-red-700 text-white'} shadow-sm`}
                        >
                          Add New Product
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-red-50 border border-red-100'}`}>
                      <h2 className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Billing Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Billing Summary */}
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
                          <h3 className={`font-medium font-['Kantumruy_Pro'] mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            Current Plan
                          </h3>
                          <div className={`p-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-4`}>
                            <div className="flex justify-between items-center">
                              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Premium Plan</span>
                              <span className={`font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>$29.99/month</span>
                            </div>
                          </div>
                          <button
                            className={`w-full py-2 rounded-md font-medium ${darkMode 
                              ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600' 
                              : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-300'} shadow-sm`}
                          >
                            Change Plan
                          </button>
                        </div>

                        {/* Payment Method */}
                        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
                          <h3 className={`font-medium font-['Kantumruy_Pro'] mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            Payment Method
                          </h3>
                          <div className={`p-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-4 flex items-center justify-between`}>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-blue-500 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div>
                                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Visa ending in 4242</p>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Expires 12/2024</p>
                              </div>
                            </div>
                            <button className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                              Edit
                            </button>
                          </div>
                          <button
                            className={`w-full py-2 rounded-md font-medium ${darkMode 
                              ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600' 
                              : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-300'} shadow-sm`}
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
                        <div className={`rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                              <tr>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                  Date
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                  Description
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                  Amount
                                </th>
                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
                              {[1, 2, 3].map((invoice) => (
                                <tr key={invoice}>
                                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                    {new Date().toLocaleDateString()}
                                  </td>
                                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Premium Plan Subscription
                                  </td>
                                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
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
                )}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;