// import { useState, useEffect, useRef } from 'react';
// import { cn } from "@/lib/utils";
// import { motion, AnimatePresence } from 'framer-motion';
// import { Particles } from '@/components/magicui/particles';
// import { BorderBeam } from '@/components/magicui/border-beam';
// import { useNavigate, Outlet, useLocation } from 'react-router-dom';
// import Profile from './profile';
// import { Button } from "@/components/ui/button";
// import { Menu, X, Moon, Sun, LogOut, User, CreditCard, Package } from "lucide-react";
// import { TextAnimate } from "@/components/magicui/text-animate";

// // Import font
// import '@fontsource/kantumruy-pro/400.css';
// import '@fontsource/kantumruy-pro/600.css';
// import '@fontsource/kantumruy-pro/700.css';

// interface User {
//   name: string;
//   email: string;
//   avatar: string;
//   phone?: string;
// }

// const Dashboard = () => {
//   const [darkMode, setDarkMode] = useState(() => {
//     const savedTheme = localStorage.getItem('theme');
//     return savedTheme === 'dark';
//   });
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const [user, setUser] = useState<User>({
//     name: "",
//     email: "",
//     avatar: "https://randomuser.me/api/portraits/men/1.jpg"
//   });
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Refs for dropdown containers
//   const profileDropdownRef = useRef<HTMLDivElement>(null);
//   const mobileMenuRef = useRef<HTMLDivElement>(null);

//   // Check if device is mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
    
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Toggle dark mode and save to localStorage
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   // Determine active tab based on route
//   const activeTab = location.pathname.includes('billing') ? 'billing' : 
//                    location.pathname.includes('profile') ? 'profile' : 
//                    location.pathname.includes('settings') ? 'settings' : 'products';

//   // Get user data when component mounts
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const userData = JSON.parse(storedUser);
//         setUser({
//           name: userData.name || userData.email.split('@')[0],
//           email: userData.email,
//           avatar: userData.avatar || "https://randomuser.me/api/portraits/men/1.jpg",
//           phone: userData.phone
//         });
//       } catch (e) {
//         console.error("Failed to parse user data", e);
//       }
//     }
//     setLoading(false);
//   }, []);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
//         setIsProfileOpen(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && 
//           !(event.target as HTMLElement).closest('[data-menu-button]')) {
//         setMobileMenuOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   if (loading) {
//     return (
//       <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
//       </div>
//     );
//   }

//   // Different animation variants for mobile and desktop
//   const navbarAnimationVariants = {
//     desktop: {
//       y: [0, -3, 0],
//       rotateX: [0, 1, 0],
//       rotateY: [0, 0.5, 0],
//     },
//     mobile: {
//       // Much more subtle animation for mobile
//       y: [0, -1, 0],
//     }
//   };

//   const shadowAnimationVariants = {
//     desktop: {
//       boxShadow: [
//         "0 4px 20px rgba(234, 56, 76, 0.1)",
//         "0 8px 30px rgba(255, 113, 154, 0.15)",
//         "0 4px 20px rgba(234, 56, 76, 0.1)"
//       ],
//     },
//     mobile: {
//       // Static shadow for mobile
//       boxShadow: "0 4px 20px rgba(234, 56, 76, 0.1)"
//     }
//   };

//   return (
//     <div className={`relative min-h-screen w-full flex flex-col overflow-hidden ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-white to-pink-50/30'}`}>
//       {/* Background Effects */}
//       <div className="fixed inset-0 -z-50">
//         <Particles        
//           className="absolute inset-0"
//           quantity={isMobile ? 150 : 300} // Reduce particles on mobile
//           ease={80}
//           color={darkMode ? "#FF4B4B" : "#FF719A"} 
//           refresh={false}
//         />
//         <motion.div
//           className="absolute inset-0"
//           style={{
//             background: darkMode 
//               ? "radial-gradient(circle at center, transparent, rgba(0, 0, 0, 0.5))" 
//               : "radial-gradient(circle at center, transparent, rgba(255,113,154,0.03))",
//             filter: "blur(80px)",
//             transform: "translateZ(0)",
//           }}
//         />
//       </div>

//       {/* Navbar Container */}
//       <div className="relative z-40">
//         <header className="sticky top-0">
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ 
//               opacity: 1, 
//               y: 0,
//             }}
//             transition={{ duration: 0.5 }}
//             className="relative mx-2 md:mx-8 mt-2 md:mt-8 rounded-lg shadow-sm"
//           >
//             {/* Animated Navbar Container */}
//             <motion.div
//               animate={navbarAnimationVariants[isMobile ? 'mobile' : 'desktop']}
//               transition={{
//                 duration: isMobile ? 6 : 4, // Slower on mobile
//                 repeat: isMobile ? 0 : Infinity, // No repeat on mobile for static feel
//                 ease: "easeInOut",
//                 repeatType: "reverse"
//               }}
//               className={`bg-white/90 backdrop-blur-sm border border-gray-100 rounded-lg relative ${darkMode ? 'dark:bg-gray-800/90 dark:border-gray-700' : ''}`}
//               style={{
//                 transformStyle: isMobile ? "flat" : "preserve-3d", // Flat on mobile
//                 perspective: isMobile ? "none" : "1000px"
//               }}
//             >
//               {/* Conditional shadow animation */}
//               {!isMobile && (
//                 <motion.div
//                   animate={shadowAnimationVariants.desktop}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     repeatType: "reverse"
//                   }}
//                   className="absolute inset-0 rounded-lg"
//                 />
//               )}
              
//               {/* Static shadow for mobile */}
//               {isMobile && (
//                 <div 
//                   className="absolute inset-0 rounded-lg"
//                   style={{
//                     boxShadow: "0 4px 20px rgba(234, 56, 76, 0.1)"
//                   }}
//                 />
//               )}

//               <div className="flex items-center justify-between px-3 py-2 md:px-6 md:py-3 mx-auto max-w-7xl relative z-10">
//                 <div className="flex items-center">
//                   {/* Mobile menu button - only shown on small screens and not on profile page */}
//                   {activeTab !== 'profile' && (
//                     <div className="md:hidden mr-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                         className={`${darkMode ? 'dark:hover:bg-gray-700' : ''} transform-gpu`}
//                         data-menu-button
//                       >
//                         <motion.div
//                           animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
//                           transition={{ duration: 0.2, ease: "easeOut" }} // Faster transition
//                         >
//                           {mobileMenuOpen ? (
//                             <X className={darkMode ? 'text-pink-400' : 'text-pink-600'} size={20} />
//                           ) : (
//                             <Menu className={darkMode ? 'text-pink-400' : 'text-pink-600'} size={20} />
//                           )}
//                         </motion.div>
//                       </Button>
//                     </div>
//                   )}

//                   {/* Logo with subtle hover animation */}
//                   <motion.div 
//                     className="flex"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     whileHover={isMobile ? {} : { 
//                       scale: 1.05,
//                       transition: { duration: 0.2 }
//                     }}
//                   >
//                     <TextAnimate
//                       animation="blurInUp"
//                       by="character"
//                       duration={5}
//                       className={`text-xl md:text-2xl font-bold ${darkMode ? 'dark:text-white' : 'text-[#ea384c]'}`}
//                     >
//                       WEZ-ERP
//                     </TextAnimate>
//                   </motion.div>
//                 </div>

//                 {/* Desktop Navigation - hidden on mobile with hover animations */}
//                 {activeTab !== 'profile' && (
//                   <nav className="hidden md:flex items-center space-x-8">
//                     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                       <Button
//                         variant="ghost"
//                         onClick={() => navigate('/dashboard/products')}
//                         className={`text-sm md:text-base flex items-center gap-2 transition-all duration-200 ${activeTab === 'products' ? 
//                           (darkMode ? 'dark:bg-gray-700 dark:text-pink-400' : 'bg-pink-100 text-pink-600') : 
//                           (darkMode ? 'dark:text-gray-300 hover:dark:text-pink-300' : 'text-gray-600 hover:text-pink-600')}`}
//                       >
//                         <motion.div
//                           animate={{ rotate: activeTab === 'products' ? 360 : 0 }}
//                           transition={{ duration: 0.5 }}
//                         >
//                           <Package size={16} />
//                         </motion.div>
//                         Products
//                       </Button>
//                     </motion.div>
//                     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                       <Button
//                         variant="ghost"
//                         onClick={() => navigate('/dashboard/billing')}
//                         className={`text-sm md:text-base flex items-center gap-2 transition-all duration-200 ${activeTab === 'billing' ? 
//                           (darkMode ? 'dark:bg-gray-700 dark:text-pink-400' : 'bg-pink-100 text-pink-600') : 
//                           (darkMode ? 'dark:text-gray-300 hover:dark:text-pink-300' : 'text-gray-600 hover:text-pink-600')}`}
//                       >
//                         <motion.div
//                           animate={{ rotate: activeTab === 'billing' ? 360 : 0 }}
//                           transition={{ duration: 0.5 }}
//                         >
//                           <CreditCard size={16} />
//                         </motion.div>
//                         Billing
//                       </Button>
//                     </motion.div>
//                   </nav>
//                 )}

//                 {/* Right Side Controls */}
//                 <div className="ml-2 md:ml-4 flex items-center gap-1">
//                   {/* Dark Mode Toggle with rotation animation */}
//                   <motion.div 
//                     whileHover={isMobile ? {} : { scale: 1.1 }} 
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setDarkMode(!darkMode)}
//                       className={`${darkMode ? 'dark:hover:bg-gray-700 dark:text-pink-400' : 'hover:bg-pink-50 text-pink-500'} transform-gpu`}
//                     >
//                       <motion.div
//                         animate={{ rotate: darkMode ? 180 : 0 }}
//                         transition={{ duration: 0.3, ease: "easeOut" }} // Faster transition
//                       >
//                         {darkMode ? (
//                           <Sun size={18} />
//                         ) : (
//                           <Moon size={18} />
//                         )}
//                       </motion.div>
//                     </Button>
//                   </motion.div>

//                   {/* Profile Dropdown - hidden on profile page */}
//                   {activeTab !== 'profile' && (
//                     <div className="ml-1 md:ml-3 relative" ref={profileDropdownRef}>
//                       <motion.div 
//                         whileHover={isMobile ? {} : { scale: 1.05 }} 
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => setIsProfileOpen(!isProfileOpen)}
//                           className="relative transform-gpu"
//                           id="user-menu"
//                           aria-expanded={isProfileOpen}
//                           aria-haspopup="true"
//                         >
//                           <span className="sr-only">Open user menu</span>
//                           <motion.img 
//                             className="h-7 w-7 md:h-8 md:w-8 rounded-full border-2 border-pink-500" 
//                             src={user.avatar} 
//                             alt="User avatar"
//                             whileHover={isMobile ? {} : { 
//                               borderWidth: "3px",
//                               transition: { duration: 0.2 }
//                             }}
//                           />
//                         </Button>
//                       </motion.div>

//                       <AnimatePresence>
//                         {isProfileOpen && (
//                           <motion.div
//                             initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                             animate={{ opacity: 1, y: 0, scale: 1 }}
//                             exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                             transition={{ duration: 0.15, ease: "easeOut" }} // Faster transition
//                             className={`fixed md:absolute right-2 md:right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${darkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'bg-white border border-gray-100'} ring-1 ring-black ring-opacity-5 z-[999]`}
//                             role="menu"
//                             aria-orientation="vertical"
//                             aria-labelledby="user-menu"
//                           >
//                             <div className={`px-4 py-2 border-b ${darkMode ? 'dark:border-gray-700' : 'border-gray-200'}`}>
//                               <p className={`text-sm ${darkMode ? 'dark:text-white' : 'text-gray-900'}`}>{user.name}</p>
//                               <p className={`text-xs ${darkMode ? 'dark:text-pink-300' : 'text-pink-600'}`}>{user.email}</p>
//                             </div>
//                             <motion.div 
//                               whileHover={isMobile ? {} : { backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(252, 231, 243, 0.5)' }}
//                             >
//                               <Button
//                                 variant="ghost"
//                                 className={`w-full justify-start text-sm flex items-center gap-2 ${darkMode ? 'dark:hover:bg-gray-700' : 'hover:bg-pink-50'}`}
//                                 onClick={() => {
//                                   setIsProfileOpen(false);
//                                   navigate('/dashboard/profile');
//                                 }}
//                                 role="menuitem"
//                               >
//                                 <User size={16} />
//                                 Your Profile
//                               </Button>
//                             </motion.div>
//                             <motion.div 
//                               whileHover={isMobile ? {} : { backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(252, 231, 243, 0.5)' }}
//                             >
//                               <Button
//                                 variant="ghost"
//                                 className={`w-full justify-start text-sm flex items-center gap-2 ${darkMode ? 'dark:text-pink-400 dark:hover:bg-gray-700' : 'text-pink-600 hover:bg-pink-50'}`}
//                                 onClick={handleLogout}
//                                 role="menuitem"
//                               >
//                                 <LogOut size={16} />
//                                 Sign out
//                               </Button>
//                             </motion.div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               {/* Enhanced BorderBeam with conditional rendering */}
//               {!isMobile && (
//                 <>
//                   <BorderBeam
//                     duration={6}
//                     size={200}
//                     className="from-transparent via-[#ea384c] to-transparent absolute inset-0 rounded-lg"
//                   />
//                   <BorderBeam
//                     duration={8}
//                     delay={2}
//                     size={150}
//                     className="from-transparent via-[#FF719A] to-transparent absolute inset-0 rounded-lg opacity-70"
//                   />
//                 </>
//               )}
              
//               {/* Simple border for mobile */}
//               {isMobile && (
//                 <div className="absolute inset-0 rounded-lg border border-pink-200 dark:border-pink-800 opacity-50" />
//               )}
//             </motion.div>
//           </motion.div>

//           {/* Mobile Menu - Enhanced with animations but optimized for mobile */}
//           <AnimatePresence>
//             {mobileMenuOpen && activeTab !== 'profile' && (
//               <motion.div 
//                 ref={mobileMenuRef}
//                 initial={{ opacity: 0, height: 0, y: -10 }}
//                 animate={{ opacity: 1, height: 'auto', y: 0 }}
//                 exit={{ opacity: 0, height: 0, y: -10 }}
//                 transition={{ duration: 0.2, ease: "easeOut" }} // Faster transition
//                 className={`md:hidden ${darkMode ? 'dark:bg-gray-800/95 dark:border-t dark:border-gray-700' : 'bg-white/95 border-t border-gray-100'} mx-2 md:mx-8 rounded-b-lg backdrop-blur-sm`}
//               >
//                 <div className="px-2 pt-2 pb-3 space-y-1">
//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.05, duration: 0.2 }} // Faster transition
//                   >
//                     <Button
//                       variant="ghost"
//                       className={`w-full justify-start text-sm flex items-center gap-2 transition-all duration-200 ${activeTab === 'products' ? 
//                         (darkMode ? 'dark:bg-gray-700 dark:text-pink-400' : 'bg-pink-100 text-pink-600') : 
//                         (darkMode ? 'dark:text-gray-300 hover:dark:bg-gray-700' : 'text-gray-600 hover:bg-pink-50')}`}
//                       onClick={() => {
//                         navigate('/dashboard/products');
//                         setMobileMenuOpen(false);
//                       }}
//                     >
//                       <Package size={16} />
//                       Products
//                     </Button>
//                   </motion.div>
//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1, duration: 0.2 }} // Faster transition
//                   >
//                     <Button
//                       variant="ghost"
//                       className={`w-full justify-start text-sm flex items-center gap-2 transition-all duration-200 ${activeTab === 'billing' ? 
//                         (darkMode ? 'dark:bg-gray-700 dark:text-pink-400' : 'bg-pink-100 text-pink-600') : 
//                         (darkMode ? 'dark:text-gray-300 hover:dark:bg-gray-700' : 'text-gray-600 hover:bg-pink-50')}`}
//                       onClick={() => {
//                         navigate('/dashboard/billing');
//                         setMobileMenuOpen(false);
//                       }}
//                     >
//                       <CreditCard size={16} />
//                       Billing
//                     </Button>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </header>
//       </div>

//       {/* Main Content */}
//       <main className="flex-1 relative z-30">
//         <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8">
//           {activeTab === 'profile' ? (
//             <Profile 
//               darkMode={darkMode} 
//               user={user} 
//               onBack={() => {
//                 navigate('/dashboard/products');
//                 setMobileMenuOpen(false);
//               }} 
//             />
//           ) : (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }} // Faster transition
//               className={cn(
//                 `rounded-xl shadow-lg p-4 md:p-8 relative ${darkMode ? 'dark:bg-gray-800/80 dark:border dark:border-gray-700' : 'bg-white/90 border border-gray-200'}`,
//                 "min-h-[calc(100vh-200px)]"
//               )}
//             >
//               <div className="h-full">
//                 <Outlet context={{ darkMode }} />
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;













// for changing profileDropdown from dashboard

import { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import { Particles } from '@/components/magicui/particles';
import { BorderBeam } from '@/components/magicui/border-beam';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Profile from './profile';
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, Package, CreditCard } from "lucide-react";
import { TextAnimate } from "@/components/magicui/text-animate";
import ProfileDropdown from '@/pages/dashboard/profileDropdown';

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
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Refs for dropdown containers
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle dark mode and save to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Determine active tab based on route
  const activeTab = location.pathname.includes('billing') ? 'billing' : 
                   location.pathname.includes('profile') ? 'profile' : 
                   location.pathname.includes('settings') ? 'settings' : 'products';

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && 
          !(event.target as HTMLElement).closest('[data-menu-button]')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // Different animation variants for mobile and desktop
  const navbarAnimationVariants = {
    desktop: {
      y: [0, -3, 0],
      rotateX: [0, 1, 0],
      rotateY: [0, 0.5, 0],
    },
    mobile: {
      y: [0, -1, 0],
    }
  };

  const shadowAnimationVariants = {
    desktop: {
      boxShadow: [
        "0 4px 20px rgba(234, 56, 76, 0.1)",
        "0 8px 30px rgba(255, 113, 154, 0.15)",
        "0 4px 20px rgba(234, 56, 76, 0.1)"
      ],
    },
    mobile: {
      boxShadow: "0 4px 20px rgba(234, 56, 76, 0.1)"
    }
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col overflow-hidden ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-white to-pink-50/30'}`}>
      {/* Background Effects */}
      <div className="fixed inset-0 -z-50">
        <Particles        
          className="absolute inset-0"
          quantity={isMobile ? 150 : 300}
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
            className="relative mx-2 md:mx-8 mt-2 md:mt-8 rounded-lg shadow-sm"
          >
            {/* Animated Navbar Container */}
            <motion.div
              animate={navbarAnimationVariants[isMobile ? 'mobile' : 'desktop']}
              transition={{
                duration: isMobile ? 6 : 4,
                repeat: isMobile ? 0 : Infinity,
                ease: "easeInOut",
                repeatType: "reverse"
              }}
              className={`bg-white/90 backdrop-blur-sm border border-gray-100 rounded-lg relative ${darkMode ? 'dark:bg-gray-800/90 dark:border-gray-700' : ''}`}
              style={{
                transformStyle: isMobile ? "flat" : "preserve-3d",
                perspective: isMobile ? "none" : "1000px"
              }}
            >
              {!isMobile && (
                <motion.div
                  animate={shadowAnimationVariants.desktop}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                  }}
                  className="absolute inset-0 rounded-lg"
                />
              )}
              
              {isMobile && (
                <div 
                  className="absolute inset-0 rounded-lg"
                  style={{ boxShadow: "0 4px 20px rgba(234, 56, 76, 0.1)" }}
                />
              )}

              <div className="flex items-center justify-between px-3 py-2 md:px-6 md:py-3 mx-auto max-w-7xl relative z-10">
                <div className="flex items-center">
                  {activeTab !== 'profile' && (
                    <div className="md:hidden mr-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`${darkMode ? 'dark:hover:bg-gray-700' : ''} transform-gpu`}
                        data-menu-button
                      >
                        <motion.div
                          animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          {mobileMenuOpen ? (
                            <X className={darkMode ? 'text-pink-400' : 'text-pink-600'} size={20} />
                          ) : (
                            <Menu className={darkMode ? 'text-pink-400' : 'text-pink-600'} size={20} />
                          )}
                        </motion.div>
                      </Button>
                    </div>
                  )}

                  <motion.div 
                    className="flex"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={isMobile ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <TextAnimate
                      animation="blurInUp"
                      by="character"
                      duration={5}
                      className={`text-xl md:text-2xl font-bold ${darkMode ? 'dark:text-white' : 'text-[#ea384c]'}`}
                    >
                      WEZ-ERP
                    </TextAnimate>
                  </motion.div>
                </div>

                {activeTab !== 'profile' && (
                  <nav className="hidden md:flex items-center space-x-8">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        onClick={() => navigate('/dashboard/products')}
                        className={`text-sm md:text-base flex items-center gap-2 transition-all duration-200 ${activeTab === 'products' ? 
                          (darkMode ? 'dark:bg-gray-700 dark:text-pink-400' : 'bg-pink-100 text-pink-600') : 
                          (darkMode ? 'dark:text-gray-300 hover:dark:text-pink-300' : 'text-gray-600 hover:text-pink-600')}`}
                      >
                        <motion.div
                          animate={{ rotate: activeTab === 'products' ? 360 : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Package size={16} />
                        </motion.div>
                        Products
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        onClick={() => navigate('/dashboard/billing')}
                        className={`text-sm md:text-base flex items-center gap-2 transition-all duration-200 ${activeTab === 'billing' ? 
                          (darkMode ? 'dark:bg-gray-700 dark:text-pink-400' : 'bg-pink-100 text-pink-600') : 
                          (darkMode ? 'dark:text-gray-300 hover:dark:text-pink-300' : 'text-gray-600 hover:text-pink-600')}`}
                      >
                        <motion.div
                          animate={{ rotate: activeTab === 'billing' ? 360 : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <CreditCard size={16} />
                        </motion.div>
                        Billing
                      </Button>
                    </motion.div>
                  </nav>
                )}

                <div className="ml-2 md:ml-4 flex items-center gap-1">
                  <motion.div 
                    whileHover={isMobile ? {} : { scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDarkMode(!darkMode)}
                      className={`${darkMode ? 'dark:hover:bg-gray-700 dark:text-pink-400' : 'hover:bg-pink-50 text-pink-500'} transform-gpu`}
                    >
                      <motion.div
                        animate={{ rotate: darkMode ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        {darkMode ? (
                          <Sun size={18} />
                        ) : (
                          <Moon size={18} />
                        )}
                      </motion.div>
                    </Button>
                  </motion.div>

                  {activeTab !== 'profile' && (
                    <div className="ml-1 md:ml-3 relative" ref={profileDropdownRef}>
                      <motion.div 
                        whileHover={isMobile ? {} : { scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsProfileOpen(!isProfileOpen)}
                          className="relative transform-gpu"
                          id="user-menu"
                          aria-expanded={isProfileOpen}
                          aria-haspopup="true"
                        >
                          <span className="sr-only">Open user menu</span>
                          <motion.img 
                            className="h-7 w-7 md:h-8 md:w-8 rounded-full border-2 border-pink-500" 
                            src={user.avatar} 
                            alt="User avatar"
                            whileHover={isMobile ? {} : { 
                              borderWidth: "3px",
                              transition: { duration: 0.2 }
                            }}
                          />
                        </Button>
                      </motion.div>

                      <ProfileDropdown
                        user={user}
                        darkMode={darkMode}
                        isMobile={isMobile}
                        isOpen={isProfileOpen}
                        onClose={() => setIsProfileOpen(false)}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {!isMobile && (
                <>
                  <BorderBeam
                    duration={6}
                    size={200}
                    className="from-transparent via-[#ea384c] to-transparent absolute inset-0 rounded-lg"
                  />
                  <BorderBeam
                    duration={8}
                    delay={2}
                    size={150}
                    className="from-transparent via-[#FF719A] to-transparent absolute inset-0 rounded-lg opacity-70"
                  />
                </>
              )}
              
              {isMobile && (
                <div className="absolute inset-0 rounded-lg border border-pink-200 dark:border-pink-800 opacity-50" />
              )}
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {mobileMenuOpen && activeTab !== 'profile' && (
              <motion.div 
                ref={mobileMenuRef}
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`md:hidden ${darkMode ? 'dark:bg-gray-800/95 dark:border-t dark:border-gray-700' : 'bg-white/95 border-t border-gray-100'} mx-2 md:mx-8 rounded-b-lg backdrop-blur-sm`}
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05, duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-sm flex items-center gap-2 transition-all duration-200 ${activeTab === 'products' ? 
                        (darkMode ? 'dark:bg-gray-700 dark:text-pink-400' : 'bg-pink-100 text-pink-600') : 
                        (darkMode ? 'dark:text-gray-300 hover:dark:bg-gray-700' : 'text-gray-600 hover:bg-pink-50')}`}
                      onClick={() => {
                        navigate('/dashboard/products');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Package size={16} />
                      Products
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-sm flex items-center gap-2 transition-all duration-200 ${activeTab === 'billing' ? 
                        (darkMode ? 'dark:bg-gray-700 dark:text-pink-400' : 'bg-pink-100 text-pink-600') : 
                        (darkMode ? 'dark:text-gray-300 hover:dark:bg-gray-700' : 'text-gray-600 hover:bg-pink-50')}`}
                      onClick={() => {
                        navigate('/dashboard/billing');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <CreditCard size={16} />
                      Billing
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      <main className="flex-1 relative z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8">
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
              transition={{ duration: 0.3 }}
              className={cn(
                `rounded-xl shadow-lg p-4 md:p-8 relative ${darkMode ? 'dark:bg-gray-800/80 dark:border dark:border-gray-700' : 'bg-white/90 border border-gray-200'}`,
                "min-h-[calc(100vh-200px)]"
              )}
            >
              <div className="h-full">
                <Outlet context={{ darkMode }} />
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;