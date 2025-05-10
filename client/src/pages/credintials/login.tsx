import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import axios from 'axios';

// import '@fontsource/kantumruy-pro';
import '@fontsource/kantumruy-pro/400.css';
import '@fontsource/kantumruy-pro/600.css';
import '@fontsource/kantumruy-pro/700.css';

function Login() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white p-6 md:p-10 overflow-hidden relative">
      {/* Background dots pattern like in home page */}
      <div className="absolute inset-0 z-0 opacity-10">
        {Array(150).fill(0).map((_, index) => (
          <div 
            key={index} 
            className="absolute rounded-full bg-[#CD2C2C]" 
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>
      
      <div className="w-full max-w-xs">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;

function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        },
        withCredentials: true, // Include cookies in the request
      });
      
      console.log('Login successful', response.data);
      
      // Handle successful login
      if (response.data && response.data.token) {
        // Store token if your application uses it
        localStorage.setItem('token', response.data.token);
      }
      
      // Redirect to dashboard or home page after successful login
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Login error:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setLoginError(error.response.data?.message || 'Login failed. Please check your credentials.');
        } else if (error.request) {
          setLoginError('No response from server. Please try again later.');
        } else {
          setLoginError('An unexpected error occurred. Please try again.');
        }
      } else {
        setLoginError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <Card className="bg-white shadow-lg border border-gray-100 rounded-xl w-[400px] h-[500px] pt-12">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex items-center">
              <div className="text-2xl font-['Kantumruy_Pro'] text-[#CD2C2C] font-bold">WEZ-</div>
              <span className="text-2xl font-['Kantumruy_Pro'] text-[#322D2D]">ERP</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-[#322D2D] pt-3 font-['Kantumruy_Pro'] font-normal">
            Login Your Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 pt-5">
              <div className="grid gap-1">
                <div className="flex flex-col items-center">
                  <div className="relative w-70">
                    <input
                      id="email"
                      type="text"
                      placeholder="email"
                      className={`rounded-lg px-4 py-3 h-12 text-base border ${emailError ? 'border-[#F94040]' : 'border-[#FFCDD2]'} focus:border-[#F8BBD0] focus-visible:ring-[#F8BBD0] focus-visible:ring-1 focus-visible:ring-offset-1 w-full transition-all`}
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {emailError && (
                      <p className="text-[#F94040] text-xs mt-1 pl-1">
                        {emailError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid gap-1">
                <div className="flex flex-col items-center">
                  <div className="relative w-70">
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        className={`rounded-lg px-4 py-3 h-12 text-base border ${passwordError ? 'border-[#F94040]' : 'border-[#FFCDD2]'} focus:border-[#F8BBD0] focus-visible:ring-[#F8BBD0] focus-visible:ring-1 focus-visible:ring-offset-1 w-full transition-all pr-10`}
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 opacity-50 scale-80"
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
                      <p className="text-[#F94040] text-xs mt-1 pl-1">
                        {passwordError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end -mt-1 mr-9">
                <a
                  href="#"
                  className="text-xs text-gray-600 hover:text-rose-500 underline-offset-4 hover:underline font-['Kantumruy_Pro']"
                >
                  forget password?
                </a>
              </div>
              {loginError && (
                <div className="flex justify-center -mt-2">
                  <p className="text-red-500 text-xs w-70 text-center">{loginError}</p>
                </div>
              )}
              <div className="flex justify-center items-center pt-2">
                <Button 
                  type="submit"
                  className={`w-28 rounded-lg py-2 text-base bg-gradient-to-r from-rose-300 to-rose-400 hover:from-rose-400 hover:to-rose-500 text-white transition-all font-['Kantumruy_Pro'] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </div>
            <div className="text-center text-sm text-gray-600 pt-4">
              <a href="/register" className="text-xs font-['Kantumruy_Pro'] text-rose-500 hover:text-rose-600 underline-offset-4 hover:underline">
                create account
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}