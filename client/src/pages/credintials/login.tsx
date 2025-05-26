import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { motion, MotionProps } from 'framer-motion';
import { Particles } from '@/components/magicui/particles';
import { BorderBeam } from '@/components/magicui/border-beam';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import font
import '@fontsource/kantumruy-pro/400.css';
import '@fontsource/kantumruy-pro/600.css';
import '@fontsource/kantumruy-pro/700.css';


function Login() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-white to-pink-50'}`}>
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
              ? "radial-gradient(circle at center, transparent, rgba(0, 0, 0, 0.7))" 
              : "radial-gradient(circle at center, transparent, rgba(255,113,154,0.1))",
            filter: "blur(80px)",
            transform: "translateZ(0)",
          }}
        />
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-4 right-4 z-20 p-2 rounded-full ${darkMode ? 'bg-gray-800 text-pink-400 border border-gray-700' : 'bg-white text-pink-600'} shadow-md hover:scale-105 transition-transform`}
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
        <LoginForm darkMode={darkMode} />
      </div>
    </div>
  );
}

export default Login;

interface LoginFormProps extends MotionProps {
  className?: string;
  darkMode?: boolean;
}

function LoginForm({
  className,
  darkMode = false,
  ...props
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return 'Email is required';
    }
    if (!emailRegex.test(value)) {
      return 'Email is not valid';
    }
    return '';
  };

  // Password validation function
  const validatePassword = (value: string) => {
    if (!value.trim()) {
      return 'Password is required';
    }
    if (value.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return 'Password must include uppercase, lowercase, and number';
    }
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoginError('');

    const emailValidationError = validateEmail(email);
    setEmailError(emailValidationError);

    const passwordValidationError = validatePassword(password);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Login successful', response.data);

      if (response && response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email
        }));

        navigate('/dashboard');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setLoginError(error.response.data.message || 'Login failed');
        } else if (error.request) {
          setLoginError('No response from server');
        } else {
          setLoginError('An unexpected error occurred');
        }
      } else {
        console.error('Login error:', error);
        setLoginError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        `w-full max-w-md rounded-xl shadow-lg p-8 relative overflow-hidden ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`,
        className
      )}
      {...props}
    >
      {/* Border Beam Effect */}
      <BorderBeam
        duration={6}
        size={300}
        className={`from-transparent ${darkMode ? 'via-pink-500' : 'via-pink-400'} to-transparent`}
      />
      
      <div className="flex flex-col items-center mb-6">
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-2xl font-['Kantumruy_Pro'] text-pink-500 font-bold">WEZ-</div>
          <span className={`text-2xl font-['Kantumruy_Pro'] ${darkMode ? 'text-white' : 'text-gray-800'}`}>ER</span>
        </motion.div>
        <motion.h1 
          className={`text-2xl font-bold text-center mt-4 font-['Kantumruy_Pro']`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className={darkMode ? 'text-white' : 'text-gray-800'}>
            Login Your Account
          </span>
        </motion.h1>
      </div>
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6 mx-auto max-w-xs">
        <div>
          <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Email Address
          </label>
          <input
            id="email"
            type="text"
            placeholder="your@email.com"
            className={`rounded-lg px-4 py-3 h-12 text-base block w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500' 
                : 'border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-pink-500 focus:border-pink-500'
            } border ${emailError ? 'border-red-500' : ''}`}
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">
              {emailError}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="password" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="your password"
              className={`rounded-lg px-4 py-3 h-12 text-base block w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 pr-10 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500' 
                  : 'border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-pink-500 focus:border-pink-500'
              } border ${passwordError ? 'border-red-500' : ''}`}
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className={`absolute right-3 top-3 ${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-500 hover:text-pink-600'} opacity-70`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-500 text-xs mt-1">
              {passwordError}
            </p>
          )}
        </div>

        <div className="flex justify-end -mt-1">
          <a
            href="#"
            className={`text-xs ${darkMode ? 'text-gray-300 hover:text-pink-400' : 'text-gray-600 hover:text-pink-600'} underline-offset-4 hover:underline font-['Kantumruy_Pro']`}
          >
            Forgot password?
          </a>
        </div>

        {loginError && (
          <div className="flex justify-center -mt-2">
            <p className="text-red-500 text-xs text-center">{loginError}</p>
          </div>
        )}

        <div>
          <button 
            type="submit"
            className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d]' 
                : 'bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d]'
            } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} relative overflow-hidden group`}
            disabled={isLoading}
          >
            <span className="relative z-10">
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
            </span>
            {/* Animated background for extra effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF719A] to-[#ea384c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>

        <div className={`text-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={() => navigate('/register')}
            className={`font-medium ${darkMode ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-500'} font-['Kantumruy_Pro']`}
          >
            Create account
          </button>
        </div>
      </form>
    </motion.div>
  );
}







// import React, { useState, useEffect } from 'react';
// import { cn } from "@/lib/utils";
// import { motion, MotionProps } from 'framer-motion';
// import { Particles } from '@/components/magicui/particles';
// import { BorderBeam } from '@/components/magicui/border-beam';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '@/hooks/useAuth';

// // Import font
// import '@fontsource/kantumruy-pro/400.css';
// import '@fontsource/kantumruy-pro/600.css';
// import '@fontsource/kantumruy-pro/700.css';

// function Login() {
//   const [darkMode, setDarkMode] = useState(false);
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Redirect if already authenticated
//   useEffect(() => {
//     if (isAuthenticated) {
//       const from = location.state?.from?.pathname || '/dashboard';
//       navigate(from, { replace: true });
//     }
//   }, [isAuthenticated, location, navigate]);

//   return (
//     <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-white to-pink-50'}`}>
//       {/* Background Effects */}
//       <div className="absolute inset-0 overflow-hidden">
//         <Particles        
//           className="absolute inset-0"
//           quantity={300}
//           ease={80}
//           color={darkMode ? "#FF4B4B" : "#FF719A"} 
//           refresh={false}
//         />
//         <motion.div
//           className="absolute inset-0"
//           style={{
//             background: darkMode 
//               ? "radial-gradient(circle at center, transparent, rgba(0, 0, 0, 0.7))" 
//               : "radial-gradient(circle at center, transparent, rgba(255,113,154,0.1))",
//             filter: "blur(80px)",
//             transform: "translateZ(0)",
//           }}
//         />
//       </div>

//       {/* Dark Mode Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className={`absolute top-4 right-4 z-20 p-2 rounded-full ${darkMode ? 'bg-gray-800 text-pink-400 border border-gray-700' : 'bg-white text-pink-600'} shadow-md hover:scale-105 transition-transform`}
//       >
//         {darkMode ? (
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
//           </svg>
//         ) : (
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//           </svg>
//         )}
//       </button>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
//         <LoginForm darkMode={darkMode} />
//       </div>
//     </div>
//   );
// }

// export default Login;

// interface LoginFormProps extends MotionProps {
//   className?: string;
//   darkMode?: boolean;
// }

// function LoginForm({
//   className,
//   darkMode = false,
//   ...props
// }: LoginFormProps) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [loginError, setLoginError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const { syncAuthState } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Email validation regex
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   // Email validation function
//   const validateEmail = (value: string) => {
//     if (!value.trim()) {
//       return 'Email is required';
//     }
//     if (!emailRegex.test(value)) {
//       return 'Email is not valid';
//     }
//     return '';
//   };

//   // Password validation function
//   const validatePassword = (value: string) => {
//     if (!value.trim()) {
//       return 'Password is required';
//     }
//     if (value.length < 8) {
//       return 'Password must be at least 8 characters long';
//     }
//     if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
//       return 'Password must include uppercase, lowercase, and number';
//     }
//     return '';
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmail(value);
//     setEmailError(validateEmail(value));
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setPassword(value);
//     setPasswordError(validatePassword(value));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     setLoginError('');

//     const emailValidationError = validateEmail(email);
//     setEmailError(emailValidationError);

//     const passwordValidationError = validatePassword(password);
//     setPasswordError(passwordValidationError);

//     if (emailValidationError || passwordValidationError) {
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       const response = await axios.post('http://localhost:8080/api/auth/login', {
//         email,
//         password
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       if (response && response.data?.token) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('user', JSON.stringify({
//           id: response.data.id,
//           name: response.data.name,
//           email: response.data.email
//         }));

//         // Sync auth state immediately
//         syncAuthState();

//         // Redirect to dashboard or previous location
//         const from = location.state?.from?.pathname || '/dashboard';
//         navigate(from, { replace: true });
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           setLoginError(error.response.data.message || 'Login failed');
//         } else if (error.request) {
//           setLoginError('No response from server');
//         } else {
//           setLoginError('An unexpected error occurred');
//         }
//       } else {
//         console.error('Login error:', error);
//         setLoginError('An unexpected error occurred');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className={cn(
//         `w-full max-w-md rounded-xl shadow-lg p-8 relative overflow-hidden ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`,
//         className
//       )}
//       {...props}
//     >
//       {/* Border Beam Effect */}
//       <BorderBeam
//         duration={6}
//         size={300}
//         className={`from-transparent ${darkMode ? 'via-pink-500' : 'via-pink-400'} to-transparent`}
//       />
      
//       <div className="flex flex-col items-center mb-6">
//         <motion.div 
//           className="flex justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.1 }}
//         >
//           <div className="text-2xl font-['Kantumruy_Pro'] text-pink-500 font-bold">WEZ-</div>
//           <span className={`text-2xl font-['Kantumruy_Pro'] ${darkMode ? 'text-white' : 'text-gray-800'}`}>ER</span>
//         </motion.div>
//         <motion.h1 
//           className={`text-2xl font-bold text-center mt-4 font-['Kantumruy_Pro']`}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <span className={darkMode ? 'text-white' : 'text-gray-800'}>
//             Login Your Account
//           </span>
//         </motion.h1>
//       </div>
      
//       <form onSubmit={handleSubmit} className="mt-8 space-y-6 mx-auto max-w-xs">
//         <div>
//           <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Email Address
//           </label>
//           <input
//             id="email"
//             type="text"
//             placeholder="your@email.com"
//             className={`rounded-lg px-4 py-3 h-12 text-base block w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
//               darkMode 
//                 ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500' 
//                 : 'border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-pink-500 focus:border-pink-500'
//             } border ${emailError ? 'border-red-500' : ''}`}
//             value={email}
//             onChange={handleEmailChange}
//           />
//           {emailError && (
//             <p className="text-red-500 text-xs mt-1">
//               {emailError}
//             </p>
//           )}
//         </div>
        
//         <div>
//           <label htmlFor="password" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//             Password
//           </label>
//           <div className="relative">
//             <input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="your password"
//               className={`rounded-lg px-4 py-3 h-12 text-base block w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 pr-10 ${
//                 darkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500' 
//                   : 'border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-pink-500 focus:border-pink-500'
//               } border ${passwordError ? 'border-red-500' : ''}`}
//               value={password}
//               onChange={handlePasswordChange}
//             />
//             <button
//               type="button"
//               className={`absolute right-3 top-3 ${darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-500 hover:text-pink-600'} opacity-70`}
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                 </svg>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//               )}
//             </button>
//           </div>
//           {passwordError && (
//             <p className="text-red-500 text-xs mt-1">
//               {passwordError}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-end -mt-1">
//           <a
//             href="#"
//             className={`text-xs ${darkMode ? 'text-gray-300 hover:text-pink-400' : 'text-gray-600 hover:text-pink-600'} underline-offset-4 hover:underline font-['Kantumruy_Pro']`}
//           >
//             Forgot password?
//           </a>
//         </div>

//         {loginError && (
//           <div className="flex justify-center -mt-2">
//             <p className="text-red-500 text-xs text-center">{loginError}</p>
//           </div>
//         )}

//         <div>
//           <button 
//             type="submit"
//             className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all duration-300 ${
//               darkMode 
//                 ? 'bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d]' 
//                 : 'bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d]'
//             } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} relative overflow-hidden group`}
//             disabled={isLoading}
//           >
//             <span className="relative z-10">
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   <span>Logging in...</span>
//                 </div>
//               ) : (
//                 'Login'
//               )}
//             </span>
//             {/* Animated background for extra effect */}
//             <span className="absolute inset-0 bg-gradient-to-r from-[#FF719A] to-[#ea384c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//           </button>
//         </div>

//         <div className={`text-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//           Don't have an account?{' '}
//           <button 
//             type="button"
//             onClick={() => navigate('/register')}
//             className={`font-medium ${darkMode ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-500'} font-['Kantumruy_Pro']`}
//           >
//             Create account
//           </button>
//         </div>
//       </form>
//     </motion.div>
//   );
// }