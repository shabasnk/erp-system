import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { Particles } from '@/components/magicui/particles';
import { BorderBeam } from '@/components/magicui/border-beam';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Profile from './profile';

// Import font
import '@fontsource/kantumruy-pro/400.css';
import '@fontsource/kantumruy-pro/600.css';
import '@fontsource/kantumruy-pro/700.css';

interface User {
  name: string;
  email: string;
  avatar: string;
  phone?: string;
}

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab based on route
  const activeTab = location.pathname.includes('billing') ? 'billing' : 
                   location.pathname.includes('profile') ? 'profile' : 'products';

  // Get user data when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser({
          name: userData.name || userData.email.split('@')[0],
          email: userData.email,
          avatar: userData.avatar || "https://randomuser.me/api/portraits/men/1.jpg",
          phone: userData.phone
        });
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen w-full flex flex-col overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-white to-pink-50/30'}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <Particles        
          className="absolute inset-0"
          quantity={300}
          ease={80}
          color={darkMode ? "#FF4B4B" : "#FF719A"} 
          refresh={false}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: darkMode 
              ? "radial-gradient(circle at center, transparent, rgba(0, 0, 0, 0.5))" 
              : "radial-gradient(circle at center, transparent, rgba(255,113,154,0.03))",
            filter: "blur(80px)",
            transform: "translateZ(0)",
          }}
        />
      </div>

      {/* Navbar */}
      <nav className={`relative z-20 ${darkMode ? 'bg-gray-900/80 border-b border-pink-900' : 'bg-white/80 backdrop-blur-sm'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {/* Mobile menu button */}
              {activeTab !== 'profile' && (
                <div className="md:hidden mr-2">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`p-2 rounded-md ${darkMode ? 'text-pink-400 hover:bg-gray-700' : 'text-pink-600 hover:bg-pink-50'} focus:outline-none`}
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {mobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                </div>
              )}

              {/* Logo */}
              <motion.div 
                className="flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-xl font-['Kantumruy_Pro'] bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent font-bold">WEZ-</div>
                <span className={`text-xl font-['Kantumruy_Pro'] ${darkMode ? 'text-white' : 'text-gray-900'}`}>ER</span>
              </motion.div>
            </div>

            {/* Navigation Links - Desktop */}
            {activeTab !== 'profile' && (
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4">
                  <button
                    onClick={() => navigate('/dashboard/products')}
                    className={`px-3 py-2 rounded-md text-sm font-medium font-['Kantumruy_Pro'] ${activeTab === 'products' ? 
                      (darkMode ? 'bg-gray-800 text-pink-400' : 'bg-pink-100 text-pink-600') : 
                      (darkMode ? 'text-gray-300 hover:text-pink-300 hover:bg-gray-700' : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50')}`}
                  >
                    Products
                  </button>
                  <button
                    onClick={() => navigate('/dashboard/billing')}
                    className={`px-3 py-2 rounded-md text-sm font-medium font-['Kantumruy_Pro'] ${activeTab === 'billing' ? 
                      (darkMode ? 'bg-gray-800 text-pink-400' : 'bg-pink-100 text-pink-600') : 
                      (darkMode ? 'text-gray-300 hover:text-pink-300 hover:bg-gray-700' : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50')}`}
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
                className={`p-2 rounded-full mr-2 ${darkMode ? 'bg-gray-800 text-pink-400 border border-gray-700' : 'bg-white text-pink-500'} shadow-md`}
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
              {activeTab !== 'profile' && (
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full border-2 border-pink-500" src={user.avatar} alt="" />
                    </button>
                  </div>

                  {/* Profile dropdown panel */}
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${darkMode ? 'bg-gray-800 border border-pink-900' : 'bg-white'} ring-1 ring-black ring-opacity-5 focus:outline-none z-30`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-pink-900">
                        <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
                        <p className={`text-xs ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate('/dashboard/profile');
                          setMobileMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-pink-300 hover:bg-gray-700' : 'text-pink-600 hover:bg-pink-50'}`}
                        role="menuitem"
                      >
                        Your Profile
                      </button>
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-pink-50'}`}
                        role="menuitem"
                      >
                        Settings
                      </a>
                      <button
                        onClick={handleLogout}
                        className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-pink-400 hover:bg-gray-700' : 'text-pink-600 hover:bg-pink-50'}`}
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

        {/* Mobile menu */}
        {mobileMenuOpen && activeTab !== 'profile' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${darkMode ? 'bg-gray-900/90' : 'bg-white/90'}`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => {
                  navigate('/dashboard/products');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium font-['Kantumruy_Pro'] ${activeTab === 'products' ? 
                  (darkMode ? 'text-pink-300 hover:bg-gray-700' : 'text-pink-600 hover:bg-pink-50') : 
                  (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-pink-50')}`}
              >
                Products
              </button>
              <button
                onClick={() => {
                  navigate('/dashboard/billing');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium font-['Kantumruy_Pro'] ${activeTab === 'billing' ? 
                  (darkMode ? 'text-pink-300 hover:bg-gray-700' : 'text-pink-600 hover:bg-pink-50') : 
                  (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-pink-50')}`}
              >
                Billing
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'profile' ? (
            <Profile 
              darkMode={darkMode} 
              user={user} 
              onBack={() => {
                navigate('/dashboard/products');
                setMobileMenuOpen(false);
              }} 
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={cn(
                `rounded-xl shadow-lg p-8 relative overflow-hidden ${darkMode ? 'bg-gray-900/70 border border-pink-900' : 'bg-white/90 border border-pink-200'}`,
              )}
            >
              <BorderBeam
                duration={6}
                size={300}
                className={`from-transparent ${darkMode ? 'via-pink-500' : 'via-pink-400'} to-transparent`}
              />
              
              <Outlet context={{ darkMode }} />
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;