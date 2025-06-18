import React, {useState } from 'react';
import { cn } from "@/lib/utils";
import { motion, MotionProps } from 'framer-motion';
import { Particles } from '@/components/magicui/particles';
import { BorderBeam } from '@/components/magicui/border-beam';
import { TextAnimate } from '@/components/magicui/text-animate';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import font
import '@fontsource/kantumruy-pro/400.css';
import '@fontsource/kantumruy-pro/600.css';
import '@fontsource/kantumruy-pro/700.css';

function Login() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <Particles        
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={darkMode ? "#FF719A" : "#ea384c"}
          refresh={false}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: darkMode 
              ? "radial-gradient(circle at center, transparent, rgba(255,113,154,0.03))"
              : "radial-gradient(circle at center, transparent, rgba(234,56,76,0.03))",
            filter: "blur(80px)",
            transform: "translateZ(0)",
          }}
        />
      </div>

      {/* Gradient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(
          "absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl",
          darkMode ? "bg-[#FF719A]/5" : "bg-[#ea384c]/5"
        )} />
        <div className={cn(
          "absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-3xl",
          darkMode ? "bg-[#ea384c]/5" : "bg-[#FF719A]/5"
        )} />
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-4 right-4 z-20 p-2 rounded-full ${
          darkMode 
            ? 'bg-gray-800/80 text-pink-400 border border-gray-700/50' 
            : 'bg-white/80 text-pink-600 border border-gray-200'
        } shadow-md hover:scale-105 transition-transform backdrop-blur-sm`}
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard/products";

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return 'Email is required';
    }
    if (!emailRegex.test(value)) {
      return 'Email is not valid';
    }
    return '';
  };

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

      if (response && response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email
        }));

        // Replace the login route in history stack
        navigate(from, { replace: true });
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
        `w-full max-w-md rounded-lg shadow-sm overflow-hidden ${
          darkMode 
            ? 'bg-gray-900/80 border border-gray-700/50' 
            : 'bg-white border border-gray-100'
        }`,
        className
      )}
      {...props}
    >
      {/* <BorderBeam
        duration={6}
        size={300}
        className="from-transparent via-[#ea384c] to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={300}
        className="from-transparent via-[#FF719A] to-transparent"
      /> */}

      <div className="relative z-10 p-8">
        <div className="flex flex-col items-center mb-8">
           <BorderBeam
        duration={6}
        size={300}
        className="from-transparent via-[#ea384c] to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={300}
        className="from-transparent via-[#FF719A] to-transparent"
      />
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <TextAnimate
              animation="blurInUp"
              by="character"
              duration={5}
              className="text-2xl font-['Kantumruy_Pro'] font-bold text-[#ea384c]"
            >
              WEZ-ERP
            </TextAnimate>
          </motion.div>
          <motion.h1 
            className={`text-2xl font-bold text-center mt-4 font-['Kantumruy_Pro']`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TextAnimate
              animation="blurInUp"
              by="word"
              duration={3}
              className={darkMode ? 'text-white' : 'text-gray-900'}
            >
              Login Your Account
            </TextAnimate>
            <motion.div 
              className={cn(
                "h-1 mt-1 rounded-full bg-gradient-to-r from-[#ea384c] to-[#FF719A]"
              )}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.h1>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 mx-auto max-w-xs">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="email" className={`block text-sm font-medium mb-3 ${darkMode ? 'text-pink-200' : 'text-gray-700'}`}>
              Email Address
            </label>
            <input
              id="email"
              type="text"
              placeholder="your@email.com"
              className={`rounded-lg px-4 py-3 h-12 text-base block w-full border shadow-sm focus:outline-none transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700/50 text-white placeholder-pink-300 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500' 
                  : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-pink-500/30 focus:border-pink-300'
              } ${emailError ? 'border-red-500' : ''}`}
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">
                {emailError}
              </p>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="password" className={`block text-sm font-medium mb-3 ${darkMode ? 'text-pink-200' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="your password"
                className={`rounded-lg px-4 py-3 h-12 text-base block w-full border shadow-sm focus:outline-none transition-all duration-200 pr-10 ${
                  darkMode 
                    ? 'bg-gray-800/50 border-gray-700/50 text-white placeholder-pink-300 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500' 
                    : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-pink-500/30 focus:border-pink-300'
                } ${passwordError ? 'border-red-500' : ''}`}
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode 
                    ? 'text-pink-300 hover:text-pink-400' 
                    : 'text-gray-500 hover:text-pink-600'
                } opacity-70`}
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end -mt-1"
          >
            <button
              type="button"
              onClick={() => {}}
              className={`text-xs ${
                darkMode 
                  ? 'text-pink-300 hover:text-pink-400' 
                  : 'text-gray-600 hover:text-pink-600'
              } underline-offset-4 hover:underline font-['Kantumruy_Pro']`}
            >
              Forgot password?
            </button>
          </motion.div>

          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center -mt-2"
            >
              <p className="text-red-500 text-xs text-center">{loginError}</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              type="submit"
              className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-sm transition-all duration-300 bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#ea384c]/90 hover:to-[#FF719A]/90 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              } relative overflow-hidden group`}
              disabled={isLoading}
            >
              <span className="relative z-10">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    <span>Logging in...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#FF719A] to-[#ea384c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`text-center text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={() => navigate('/register')}
              className={`font-medium ${
                darkMode 
                  ? 'text-pink-400 hover:text-pink-300' 
                  : 'text-pink-600 hover:text-pink-500'
              } font-['Kantumruy_Pro']`}
            >
              Create account
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}