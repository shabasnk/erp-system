import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { Particles } from '@/components/magicui/particles';
import { BorderBeam } from '@/components/magicui/border-beam';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Profile from './profile';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { TextAnimate } from "@/components/magicui/text-animate";

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
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const activeTab = location.pathname.includes('billing') ? 'billing' : 
                   location.pathname.includes('profile') ? 'profile' : 'products';

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isProfileOpen && !target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen w-full flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-white to-pink-50/30'}`}>
      {/* Background Effects - Absolutely positioned with lowest z-index */}
      <div className="fixed inset-0 -z-50">
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

      {/* Navbar Container */}
      <div className="relative z-40">
        <header className="sticky top-0">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mx-4 mt-4 md:mx-8 md:mt-8 rounded-lg shadow-sm"
          >
            <div className={`bg-white border border-gray-100 rounded-lg ${darkMode ? 'dark:bg-gray-800 dark:border-gray-700' : ''}`}>
              <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center">
                  {activeTab !== 'profile' && (
                    <div className="md:hidden mr-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={darkMode ? 'dark:hover:bg-gray-700' : ''}
                      >
                        <Menu className={darkMode ? 'text-pink-400' : 'text-pink-600'} />
                      </Button>
                    </div>
                  )}

                  <motion.div 
                    className="flex"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <TextAnimate
                      animation="blurInUp"
                      by="character"
                      duration={5}
                      className={`text-2xl font-bold ${darkMode ? 'dark:text-white' : 'text-[#ea384c]'}`}
                    >
                      WEZ-ERP
                    </TextAnimate>
                  </motion.div>
                </div>

                {activeTab !== 'profile' && (
                  <nav className="hidden md:flex items-center space-x-8">
                    <Button
                      variant="ghost"
                      onClick={() => navigate('/dashboard/products')}
                      className={`text-base ${activeTab === 'products' ? 
                        (darkMode ? 'dark:text-pink-400' : 'text-pink-600') : 
                        (darkMode ? 'dark:text-gray-300 hover:dark:text-pink-300' : 'text-gray-600 hover:text-pink-600')}`}
                    >
                      Products
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => navigate('/dashboard/billing')}
                      className={`text-base ${activeTab === 'billing' ? 
                        (darkMode ? 'dark:text-pink-400' : 'text-pink-600') : 
                        (darkMode ? 'dark:text-gray-300 hover:dark:text-pink-300' : 'text-gray-600 hover:text-pink-600')}`}
                    >
                      Billing
                    </Button>
                  </nav>
                )}

                {/* Profile Dropdown */}
                <div className="ml-4 flex items-center md:ml-6 relative z-50">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDarkMode(!darkMode)}
                    className={`mr-2 ${darkMode ? 'dark:hover:bg-gray-700 dark:text-pink-400' : 'hover:bg-pink-50 text-pink-500'}`}
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
                  </Button>

                  {activeTab !== 'profile' && (
                    <div className="ml-3 relative profile-dropdown">
                      <div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsProfileOpen(!isProfileOpen)}
                          className="relative"
                          id="user-menu"
                          aria-expanded={isProfileOpen}
                          aria-haspopup="true"
                        >
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full border-2 border-pink-500" src={user.avatar} alt="" />
                        </Button>
                      </div>

                      {/* Dropdown Menu */}
                      {isProfileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`fixed md:absolute right-4 md:right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${darkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'bg-white border border-gray-100'} ring-1 ring-black ring-opacity-5 z-[999]`}
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu"
                        >
                          <div className={`px-4 py-2 border-b ${darkMode ? 'dark:border-gray-700' : 'border-gray-200'}`}>
                            <p className={`text-sm ${darkMode ? 'dark:text-white' : 'text-gray-900'}`}>{user.name}</p>
                            <p className={`text-xs ${darkMode ? 'dark:text-pink-300' : 'text-pink-600'}`}>{user.email}</p>
                          </div>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start text-sm ${darkMode ? 'dark:hover:bg-gray-700' : 'hover:bg-pink-50'}`}
                            onClick={() => {
                              setIsProfileOpen(false);
                              navigate('/dashboard/profile');
                              setMobileMenuOpen(false);
                            }}
                            role="menuitem"
                          >
                            Your Profile
                          </Button>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start text-sm ${darkMode ? 'dark:hover:bg-gray-700' : 'hover:bg-pink-50'}`}
                            role="menuitem"
                          >
                            Settings
                          </Button>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start text-sm ${darkMode ? 'dark:text-pink-400 dark:hover:bg-gray-700' : 'text-pink-600 hover:bg-pink-50'}`}
                            onClick={handleLogout}
                            role="menuitem"
                          >
                            Sign out
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <BorderBeam
              duration={6}
              size={400}
              className="from-transparent via-[#ea384c] to-transparent"
            />
            <BorderBeam
              duration={6}
              delay={3}
              size={400}
              className="from-transparent via-[#FF719A] to-transparent"
            />
          </motion.div>

          {mobileMenuOpen && activeTab !== 'profile' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden ${darkMode ? 'dark:bg-gray-800 dark:border-t dark:border-gray-700' : 'bg-white border-t border-gray-100'}`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-base ${activeTab === 'products' ? 
                    (darkMode ? 'dark:text-pink-400' : 'text-pink-600') : 
                    (darkMode ? 'dark:text-gray-300 hover:dark:bg-gray-700' : 'text-gray-600 hover:bg-pink-50')}`}
                  onClick={() => {
                    navigate('/dashboard/products');
                    setMobileMenuOpen(false);
                  }}
                >
                  Products
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-base ${activeTab === 'billing' ? 
                    (darkMode ? 'dark:text-pink-400' : 'text-pink-600') : 
                    (darkMode ? 'dark:text-gray-300 hover:dark:bg-gray-700' : 'text-gray-600 hover:bg-pink-50')}`}
                  onClick={() => {
                    navigate('/dashboard/billing');
                    setMobileMenuOpen(false);
                  }}
                >
                  Billing
                </Button>
              </div>
            </motion.div>
          )}
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-1 relative z-30">
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
                `rounded-xl shadow-lg p-8 relative overflow-hidden ${darkMode ? 'dark:bg-gray-800/70 dark:border dark:border-gray-700' : 'bg-white/90 border border-gray-200'}`,
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