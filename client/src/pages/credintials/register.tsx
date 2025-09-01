// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Particles } from '@/components/magicui/particles';
// import StepsIndicator from '@/pages/credintials/components/StepIndicator';
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';
// import { BorderBeam } from '@/components/magicui/border-beam';

// const RegisterPage: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       navigate('/verify-email'); // Adjust this to your verification route
//     }, 1500);
//   };
//   return (
//     <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${darkMode ? 'bg-black' : 'bg-gradient-to-b from-white to-gray-50/30'}`}>
//       {/* Background Effects */}
//       <div className="absolute inset-0 overflow-hidden">
//         <Particles        
//           className="absolute inset-0"
//           quantity={300}
//           ease={80}
//           color={darkMode ? "#FF4B4B" : "#FF4B4B"} 
//           refresh={false}
//         />
//         <motion.div
//           className="absolute inset-0"
//           style={{
//             background: darkMode 
//               ? "radial-gradient(circle at center, transparent, rgba(0, 0, 0, 0.5))" 
//               : "radial-gradient(circle at center, transparent, rgba(255,75,75,0.03))",
//             filter: "blur(80px)",
//             transform: "translateZ(0)",
//           }}
//         />
//       </div>
//       {/* Dark Mode Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className={`absolute top-4 right-4 z-20 p-2 rounded-full ${darkMode ? 'bg-black text-red-600' : 'bg-white text-red-400'} shadow-md`}
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
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className={`w-full max-w-md rounded-xl shadow-lg p-8 relative overflow-hidden ${darkMode ? 'bg-black border border-gray-800' : 'bg-white'}`}
//         >
//           {/* Border Beam Effect */}
//           <BorderBeam
//             duration={6}
//             size={300}
//             className={`from-transparent ${darkMode ? 'via-red-500' : 'via-red-500'} to-transparent`}
//           />
          
//           <div className="flex flex-col items-center mb-6">
//             <motion.h1 
//               className="text-2xl font-bold text-center mb-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.1 }}
//             >
//               <span className={darkMode ? 'text-white' : 'text-gray-900'}>
//                 Create Your Shop Account
//               </span>
//             </motion.h1>
//             <motion.p
//               className={`text-center ${darkMode ? 'text-white' : 'text-gray-600'}`}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               Email Verification
//             </motion.p>
//           </div>
          
//           <StepsIndicator currentStep={1} darkMode={darkMode} />
          
//           <form onSubmit={handleSubmit} className="mt-8 space-y-6 mx-auto max-w-xs">
//             <div>
//               <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="your@email.com"
//               />
//             </div>

//             <div>
//               <Button
//                 type="submit"
//                 className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all duration-300 ${darkMode ? 
//                   'bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600' : 
//                   'bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600'
//                 }`}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                 ) : null}
//                 {isLoading ? 'Processing...' : 'Continue'}
//               </Button>
//             </div>

//             <div className={`text-center text-sm ${darkMode ? 'text-white' : 'text-gray-600'}`}>
//               Already have an account?{' '}
//               <button 
//                 type="button"
//                 onClick={() => navigate('/login')}
//                 className={`font-medium ${darkMode ? 'text-red-600 hover:text-red-500' : 'text-red-600 hover:text-red-500'}`}
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;









// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Particles } from '@/components/magicui/particles';
// import StepsIndicator from '@/pages/credintials/components/StepIndicator';
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';
// import { BorderBeam } from '@/components/magicui/border-beam';
// import { toast } from 'react-hot-toast'; // Install with: npm install react-hot-toast

// const RegisterPage: React.FC = () => {
//   const [formData, setFormData] = useState({
//     shopName: '',
//     ownerName: '',
//     email: '',
//     phoneNumber: '',
//     whatsappNumber: '',
//     address: '',
//     type: 'retail',
//     password: '',
//     confirmPassword: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validation
//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }
    
//     if (formData.password.length < 6) {
//       toast.error('Password must be at least 6 characters long');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       const response = await fetch('http://localhost:8080/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Registration successful! Please check your email for verification.');
//         navigate('/verify-email', { state: { email: formData.email } });
//       } else {
//         toast.error(data.message || 'Registration failed');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const nextStep = () => {
//     if (currentStep < 3) setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   const renderStep = () => {
//     switch(currentStep) {
//       case 1:
//         return (
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="shopName" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Shop Name
//               </label>
//               <input
//                 id="shopName"
//                 name="shopName"
//                 type="text"
//                 required
//                 value={formData.shopName}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="Enter your shop name"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="ownerName" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Owner Name
//               </label>
//               <input
//                 id="ownerName"
//                 name="ownerName"
//                 type="text"
//                 required
//                 value={formData.ownerName}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="Enter owner's name"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="your@email.com"
//               />
//             </div>
            
//             <Button
//               type="button"
//               onClick={nextStep}
//               className="w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 shadow-md transition-all duration-300"
//             >
//               Next
//             </Button>
//           </div>
//         );
      
//       case 2:
//         return (
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="phoneNumber" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Phone Number
//               </label>
//               <input
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 type="tel"
//                 required
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="Enter phone number"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="whatsappNumber" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 WhatsApp Number (Optional)
//               </label>
//               <input
//                 id="whatsappNumber"
//                 name="whatsappNumber"
//                 type="tel"
//                 value={formData.whatsappNumber}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="Enter WhatsApp number"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="address" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Address
//               </label>
//               <textarea
//                 id="address"
//                 name="address"
//                 required
//                 value={formData.address}
//                 onChange={handleChange}
//                 rows={3}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="Enter your shop address"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="type" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Business Type
//               </label>
//               <select
//                 id="type"
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//               >
//                 <option value="retail">Retail</option>
//                 <option value="wholesale">Wholesale</option>
//                 <option value="both">Both</option>
//               </select>
//             </div>
            
//             <div className="flex space-x-4">
//               <Button
//                 type="button"
//                 onClick={prevStep}
//                 className="w-1/2 py-3 px-4 rounded-lg font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 shadow-md transition-all duration-300"
//               >
//                 Back
//               </Button>
//               <Button
//                 type="button"
//                 onClick={nextStep}
//                 className="w-1/2 py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 shadow-md transition-all duration-300"
//               >
//                 Next
//               </Button>
//             </div>
//           </div>
//         );
      
//       case 3:
//         return (
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="Enter password (min. 6 characters)"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="confirmPassword" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="Confirm your password"
//               />
//             </div>
            
//             <div className="flex space-x-4">
//               <Button
//                 type="button"
//                 onClick={prevStep}
//                 className="w-1/2 py-3 px-4 rounded-lg font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 shadow-md transition-all duration-300"
//               >
//                 Back
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-1/2 py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 shadow-md transition-all duration-300 disabled:opacity-50"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </>
//                 ) : 'Register'}
//               </Button>
//             </div>
//           </div>
//         );
      
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${darkMode ? 'bg-black' : 'bg-gradient-to-b from-white to-gray-50/30'}`}>
//       {/* Background Effects */}
//       <div className="absolute inset-0 overflow-hidden">
//         <Particles        
//           className="absolute inset-0"
//           quantity={300}
//           ease={80}
//           color={darkMode ? "#FF4B4B" : "#FF4B4B"} 
//           refresh={false}
//         />
//         <motion.div
//           className="absolute inset-0"
//           style={{
//             background: darkMode 
//               ? "radial-gradient(circle at center, transparent, rgba(0, 0, 0, 0.5))" 
//               : "radial-gradient(circle at center, transparent, rgba(255,75,75,0.03))",
//             filter: "blur(80px)",
//             transform: "translateZ(0)",
//           }}
//         />
//       </div>
      
//       {/* Dark Mode Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className={`absolute top-4 right-4 z-20 p-2 rounded-full ${darkMode ? 'bg-black text-red-600' : 'bg-white text-red-400'} shadow-md`}
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
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className={`w-full max-w-md rounded-xl shadow-lg p-8 relative overflow-hidden ${darkMode ? 'bg-black border border-gray-800' : 'bg-white'}`}
//         >
//           {/* Border Beam Effect */}
//           <BorderBeam
//             duration={6}
//             size={300}
//             className={`from-transparent ${darkMode ? 'via-red-500' : 'via-red-500'} to-transparent`}
//           />
          
//           <div className="flex flex-col items-center mb-6">
//             <motion.h1 
//               className="text-2xl font-bold text-center mb-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.1 }}
//             >
//               <span className={darkMode ? 'text-white' : 'text-gray-900'}>
//                 Create Your Shop Account
//               </span>
//             </motion.h1>
//             <motion.p
//               className={`text-center ${darkMode ? 'text-white' : 'text-gray-600'}`}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               Step {currentStep} of 3
//             </motion.p>
//           </div>
          
//           <StepsIndicator currentStep={currentStep} darkMode={darkMode} />
          
//           <form onSubmit={handleSubmit} className="mt-8 space-y-6 mx-auto max-w-xs">
//             {renderStep()}
//           </form>

//           <div className={`text-center text-sm mt-4 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
//             Already have an account?{' '}
//             <button 
//               type="button"
//               onClick={() => navigate('/login')}
//               className={`font-medium ${darkMode ? 'text-red-600 hover:text-red-500' : 'text-red-600 hover:text-red-500'}`}
//             >
//               Sign in
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
















// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Particles } from '@/components/magicui/particles';
// import StepsIndicator from '@/pages/credintials/components/StepIndicator';
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';
// import { BorderBeam } from '@/components/magicui/border-beam';
// import { toast } from 'react-hot-toast';
// import { useAuth } from '@/hooks/useAuth'; // Import the useAuth hook

// const RegisterPage: React.FC = () => {
//   const [formData, setFormData] = useState({
//     shopName: '',
//     ownerName: '',
//     email: '',
//     phoneNumber: '',
//     whatsappNumber: '',
//     address: '',
//     type: 'retail',
//     password: '',
//     confirmPassword: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const navigate = useNavigate();
//   const { handleRegisterSuccess } = useAuth(); // Get the register success handler

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validation
//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }
    
//     if (formData.password.length < 6) {
//       toast.error('Password must be at least 6 characters long');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       const response = await fetch('http://localhost:8080/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Check if the backend returns a token directly
//         if (data.token) {
//           // If backend returns token directly, use it
//           handleRegisterSuccess(data.user, data.token);
//           toast.success('Registration successful!');
//           navigate('/dashboard');
//         } else {
//           // If backend doesn't return token, try to auto-login
//           toast.success('Registration successful! Logging you in...');
          
//           try {
//             const loginResponse = await fetch('http://localhost:8080/api/auth/login', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 email: formData.email,
//                 password: formData.password
//               }),
//             });
            
//             const loginData = await loginResponse.json();
            
//             if (loginResponse.ok) {
//               handleRegisterSuccess(loginData.user, loginData.token);
//               navigate('/dashboard');
//             } else {
//               // If auto-login fails, redirect to login page
//               toast.success('Registration successful! Please login.');
//               navigate('/login');
//             }
//           } catch (loginError) {
//             console.error('Auto-login error:', loginError);
//             toast.success('Registration successful! Please login.');
//             navigate('/login');
//           }
//         }
//       } else {
//         toast.error(data.message || 'Registration failed');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const nextStep = () => {
//     if (currentStep < 3) setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   const renderStep = () => {
//     switch(currentStep) {
//       case 1:
//         return (
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="shopName" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Shop Name
//               </label>
//               <input
//                 id="shopName"
//                 name="shopName"
//                 type="text"
//                 required
//                 value={formData.shopName}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="Enter your shop name"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="ownerName" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Owner Name
//               </label>
//               <input
//                 id="ownerName"
//                 name="ownerName"
//                 type="text"
//                 required
//                 value={formData.ownerName}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="Enter owner's name"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="your@email.com"
//               />
//             </div>
            
//             <Button
//               type="button"
//               onClick={nextStep}
//               className="w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 shadow-md transition-all duration-300"
//             >
//               Next
//             </Button>
//           </div>
//         );
      
//       case 2:
//         return (
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="phoneNumber" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Phone Number
//               </label>
//               <input
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 type="tel"
//                 required
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="Enter phone number"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="whatsappNumber" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 WhatsApp Number (Optional)
//               </label>
//               <input
//                 id="whatsappNumber"
//                 name="whatsappNumber"
//                 type="tel"
//                 value={formData.whatsappNumber}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="Enter WhatsApp number"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="address" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Address
//               </label>
//               <textarea
//                 id="address"
//                 name="address"
//                 required
//                 value={formData.address}
//                 onChange={handleChange}
//                 rows={3}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="Enter your shop address"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="type" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Business Type
//               </label>
//               <select
//                 id="type"
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//               >
//                 <option value="retail">Retail</option>
//                 <option value="wholesale">Wholesale</option>
//                 <option value="both">Both</option>
//               </select>
//             </div>
            
//             <div className="flex space-x-4">
//               <Button
//                 type="button"
//                 onClick={prevStep}
//                 className="w-1/2 py-3 px-4 rounded-lg font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 shadow-md transition-all duration-300"
//               >
//                 Back
//               </Button>
//               <Button
//                 type="button"
//                 onClick={nextStep}
//                 className="w-1/2 py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 shadow-md transition-all duration-300"
//               >
//                 Next
//               </Button>
//             </div>
//           </div>
//         );
      
//       case 3:
//         return (
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="Enter password (min. 6 characters)"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="confirmPassword" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//                 placeholder="Confirm your password"
//               />
//             </div>
            
//             <div className="flex space-x-4">
//               <Button
//                 type="button"
//                 onClick={prevStep}
//                 className="w-1/2 py-3 px-4 rounded-lg font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 shadow-md transition-all duration-300"
//               >
//                 Back
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-1/2 py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 shadow-md transition-all duration-300 disabled:opacity-50"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </>
//                 ) : 'Register'}
//               </Button>
//             </div>
//           </div>
//         );
      
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${darkMode ? 'bg-black' : 'bg-gradient-to-b from-white to-gray-50/30'}`}>
//       {/* Background Effects */}
//       <div className="absolute inset-0 overflow-hidden">
//         <Particles        
//           className="absolute inset-0"
//           quantity={300}
//           ease={80}
//           color={darkMode ? "#FF4B4B" : "#FF4B4B"} 
//           refresh={false}
//         />
//         <motion.div
//           className="absolute inset-0"
//           style={{
//             background: darkMode 
//               ? "radial-gradient(circle at center, transparent, rgba(0, 0, 0, 0.5))" 
//               : "radial-gradient(circle at center, transparent, rgba(255,75,75,0.03))",
//             filter: "blur(80px)",
//             transform: "translateZ(0)",
//           }}
//         />
//       </div>
      
//       {/* Dark Mode Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className={`absolute top-4 right-4 z-20 p-2 rounded-full ${darkMode ? 'bg-black text-red-600' : 'bg-white text-red-400'} shadow-md`}
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
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className={`w-full max-w-md rounded-xl shadow-lg p-8 relative overflow-hidden ${darkMode ? 'bg-black border border-gray-800' : 'bg-white'}`}
//         >
//           {/* Border Beam Effect */}
//           <BorderBeam
//             duration={6}
//             size={300}
//             className={`from-transparent ${darkMode ? 'via-red-500' : 'via-red-500'} to-transparent`}
//           />
          
//           <div className="flex flex-col items-center mb-6">
//             <motion.h1 
//               className="text-2xl font-bold text-center mb-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.1 }}
//             >
//               <span className={darkMode ? 'text-white' : 'text-gray-900'}>
//                 Create Your Shop Account
//               </span>
//             </motion.h1>
//             <motion.p
//               className={`text-center ${darkMode ? 'text-white' : 'text-gray-600'}`}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               Step {currentStep} of 3
//             </motion.p>
//           </div>
          
//           <StepsIndicator currentStep={currentStep} darkMode={darkMode} />
          
//           <form onSubmit={handleSubmit} className="mt-8 space-y-6 mx-auto max-w-xs">
//             {renderStep()}
//           </form>

//           <div className={`text-center text-sm mt-4 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
//             Already have an account?{' '}
//             <button 
//               type="button"
//               onClick={() => navigate('/login')}
//               className={`font-medium ${darkMode ? 'text-red-600 hover:text-red-500' : 'text-red-600 hover:text-red-500'}`}
//             >
//               Sign in
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;














import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Particles } from '@/components/magicui/particles';
import StepsIndicator from '@/pages/credintials/components/StepIndicator';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BorderBeam } from '@/components/magicui/border-beam';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    email: '',
    phoneNumber: '',
    whatsappNumber: '',
    address: '',
    type: 'retail',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { handleRegisterSuccess } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Check if the backend returns a token directly
        if (data.token && data.user) {
          // If backend returns token and user data directly, use it
          handleRegisterSuccess(data.user, data.token);
          toast.success('Registration successful!');
          navigate('/dashboard');
        } else if (data.id) {
          // If backend returns user data but no token, try to auto-login
          toast.success('Registration successful! Logging you in...');
          
          try {
            const loginResponse = await fetch('http://localhost:8080/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: formData.email,
                password: formData.password
              }),
            });
            
            const loginData = await loginResponse.json();
            
            if (loginResponse.ok && loginData.token && loginData.user) {
              handleRegisterSuccess(loginData.user, loginData.token);
              navigate('/dashboard');
            } else {
              // If auto-login fails, redirect to login page
              toast.success('Registration successful! Please login.');
              navigate('/login');
            }
          } catch (loginError) {
            console.error('Auto-login error:', loginError);
            toast.success('Registration successful! Please login.');
            navigate('/login');
          }
        } else {
          // If we don't get expected data, redirect to login
          toast.success('Registration successful! Please login.');
          navigate('/login');
        }
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="shopName" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                Shop Name
              </label>
              <input
                id="shopName"
                name="shopName"
                type="text"
                required
                value={formData.shopName}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                placeholder="Enter your shop name"
              />
            </div>
            
            <div>
              <label htmlFor="ownerName" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                Owner Name
              </label>
              <input
                id="ownerName"
                name="ownerName"
                type="text"
                required
                value={formData.ownerName}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                placeholder="Enter owner's name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                placeholder="your@email.com"
              />
            </div>
            
            <Button
              type="button"
              onClick={nextStep}
              className="w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 shadow-md transition-all duration-300"
            >
              Next
            </Button>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="phoneNumber" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                placeholder="Enter phone number"
              />
            </div>
            
            <div>
              <label htmlFor="whatsappNumber" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                WhatsApp Number (Optional)
              </label>
              <input
                id="whatsappNumber"
                name="whatsappNumber"
                type="tel"
                value={formData.whatsappNumber}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                placeholder="Enter WhatsApp number"
              />
            </div>
            
            <div>
              <label htmlFor="address" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                placeholder="Enter your shop address"
              />
            </div>
            
            <div>
              <label htmlFor="type" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                Business Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              >
                <option value="retail">Retail</option>
                <option value="wholesale">Wholesale</option>
                <option value="both">Both</option>
              </select>
            </div>
            
            <div className="flex space-x-4">
              <Button
                type="button"
                onClick={prevStep}
                className="w-1/2 py-3 px-4 rounded-lg font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 shadow-md transition-all duration-300"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="w-1/2 py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 shadow-md transition-all duration-300"
              >
                Next
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                placeholder="Enter password (min. 6 characters)"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                placeholder="Confirm your password"
              />
            </div>
            
            <div className="flex space-x-4">
              <Button
                type="button"
                onClick={prevStep}
                className="w-1/2 py-3 px-4 rounded-lg font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 shadow-md transition-all duration-300"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-1/2 py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 shadow-md transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 极速飞艇公众号飞单【——qq:121406257——】 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Register'}
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${darkMode ? 'bg-black' : 'bg-gradient-to-b from-white to极速飞艇公众号飞单【——qq:121406257——】/30'}`}>
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
      
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-4 right-4 z-20 p-2 rounded-full ${darkMode ? 'bg-black text-red-600' : 'bg-white text-red-400'} shadow-md`}
      >
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1极速飞艇公众号飞单【——qq:121406257——】 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l极速飞艇公众号飞单【——qq:121406257——】07-.707a1 1 极速飞艇公众号飞单【——qq:121406257——】 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2极速飞艇公众号飞单【——qq:121406257——】1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`w-full max-w-md rounded-xl shadow-lg p-8 relative overflow-hidden ${darkMode ? 'bg-black border border-gray-800' : 'bg-white'}`}
        >
          {/* Border Beam Effect */}
          <BorderBeam
            duration={6}
            size={300}
            className={`from-transparent ${darkMode ? 'via-red-500' : 'via-red-500'} to-transparent`}
          />
          
          <div className="flex flex-col items-center mb-6">
            <motion.h1 
              className="text-2xl font-bold text-center mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                Create Your Shop Account
              </span>
            </motion.h1>
            <motion.p
              className={`text-center ${darkMode ? 'text-white' : 'text-gray-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Step {currentStep} of 3
            </motion.p>
          </div>
          
          <StepsIndicator currentStep={currentStep} darkMode={darkMode} />
          
          <form onSubmit={handleSubmit} className="mt-8 space-y极速飞艇公众号飞单【——qq:121406257——】 mx-auto max-w-xs">
            {renderStep()}
          </form>

          <div className={`text-center text-sm mt-4 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <button 
              type="button"
              onClick={() => navigate('/login')}
              className={`font-medium ${darkMode ? 'text-red-600 hover:text-red-500' : 'text-red-600 hover:text-red-500'}`}
            >
              Sign in
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;