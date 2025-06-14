import React, { memo, useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { 
  Package, 
  DollarSign, 
  FileText, 
  Hash, 
  Barcode, 
  Weight, 
  Calendar, 
  Tag, 
  Image,
  Sparkles,
  CheckCircle,
  Plus
} from "lucide-react";
import { Particles } from '@/components/magicui/particles';
import { BorderBeam } from '@/components/magicui/border-beam';
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

// TypeScript Interfaces
interface ProductData {
  name: string;
  price: string;
  description: string;
  categoryId: string;
  stockQuantity: string;
  image: string;
  discountPrice: string;
  sku: string;
  serialNumber: string;
  barcode: string;
  brand: string;
  weight: string;
  dimensions: string;
  expirationDate: string;
  tags: string;
  unitId: string;
  isActive: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

interface InputFieldProps {
  label: string;
  name: keyof ProductData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  icon?: React.ComponentType<{ size?: number }>;
  rows?: number;
  isTextarea?: boolean;
  placeholder?: string;
  darkMode?: boolean;
  error?: string;
  touched?: boolean;
}

interface SubmitButtonProps {
  isSubmitting: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  darkMode?: boolean;
}

interface FormField {
  name: keyof ProductData;
  label: string;
  icon?: React.ComponentType<{ size?: number }>;
  type?: string;
  required?: boolean;
  rows?: number;
  isTextarea?: boolean;
  placeholder?: string;
}

interface FormSection {
  title: string;
  fields: FormField[];
}

const InputField = memo<InputFieldProps>(({ 
  label, 
  name, 
  value, 
  onChange, 
  onBlur,
  type = "text", 
  required = false, 
  icon: Icon,
  rows,
  isTextarea = false,
  placeholder,
  darkMode = false,
  error,
  touched
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const InputComponent = isTextarea ? "textarea" : "input";
  
  const placeholderText = placeholder || " ";
  
  const hasError = touched && error;
  
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <InputComponent
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          rows={rows}
          onFocus={() => setIsFocused(true)}
          onBlurCapture={() => setIsFocused(false)}
          className={`
            w-full px-4 py-3 pl-12 rounded-2xl border transition-all duration-300
            ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/10 backdrop-blur-md border-white/20'}
            ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'}
            focus:outline-none focus:ring-2 focus:ring-[#ea384c]/20
            ${darkMode ? 'focus:bg-gray-700/60 focus:border-[#ea384c]/50' : 'focus:bg-white/20 focus:border-[#ea384c]/50'}
            ${darkMode ? 'hover:bg-gray-700/40 hover:border-gray-600' : 'hover:bg-white/15 hover:border-white/30'}
            ${isTextarea ? 'resize-none min-h-[100px]' : ''}
            ${hasError ? (darkMode ? 'border-red-500 focus:border-red-500' : 'border-red-400 focus:border-red-400') : ''}
          `}
          placeholder={placeholderText}
        />
        
        {Icon && (
          <motion.div
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
              isFocused ? 'text-[#ea384c]' : 
              hasError ? (darkMode ? 'text-red-400' : 'text-red-500') : 
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
            animate={{ scale: isFocused ? 1.1 : 1 }}
          >
            <Icon size={18} />
          </motion.div>
        )}
        
        {!placeholder && (
          <motion.label
            className={`
              absolute left-12 transition-all duration-300 pointer-events-none
              ${value || isFocused 
                ? 'text-xs -top-2 left-4 px-2 rounded-full font-medium' 
                : 'top-1/2 transform -translate-y-1/2'
              }
              ${darkMode 
                ? value || isFocused 
                  ? hasError
                    ? 'bg-gray-700 text-red-400'
                    : 'bg-gray-700 text-[#ea384c]' 
                  : hasError
                    ? 'text-red-400'
                    : 'text-gray-400'
                : value || isFocused 
                  ? hasError
                    ? 'bg-white/80 text-red-500'
                    : 'bg-white/80 text-[#ea384c]' 
                  : hasError
                    ? 'text-red-500'
                    : 'text-gray-500'
              }
            `}
            animate={{
              y: value || isFocused ? -24 : 0,
              x: value || isFocused ? -8 : 0,
              scale: value || isFocused ? 0.85 : 1
            }}
          >
            {label} {required && <span className="text-[#ea384c]">*</span>}
          </motion.label>
        )}
        
        {placeholder && (
          <div className={`text-xs font-medium mb-1 px-2 ${
            hasError ? (darkMode ? 'text-red-400' : 'text-red-500') : 'text-[#ea384c]'
          }`}>
            {label} {required && <span className="text-[#ea384c]">*</span>}
          </div>
        )}
        
        {hasError && (
          <motion.p 
            className={`text-xs mt-1 px-2 ${darkMode ? 'text-red-400' : 'text-red-500'}`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.p>
        )}
      </div>
      
      <motion.div
        className={`absolute inset-0 rounded-2xl pointer-events-none ${
          hasError 
            ? darkMode 
              ? 'bg-gradient-to-r from-red-500/10 to-red-600/10' 
              : 'bg-gradient-to-r from-red-400/10 to-red-500/10'
            : 'bg-gradient-to-r from-[#ea384c]/20 to-[#FF719A]/20'
        }`}
        animate={{ opacity: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
});

InputField.displayName = 'InputField';

const SubmitButton = memo<SubmitButtonProps>(({ isSubmitting, onClick, darkMode = false }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={isSubmitting}
      className="relative w-full py-4 rounded-2xl font-semibold text-white overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
      style={{
        background: "linear-gradient(135deg, #ea384c 0%, #FF719A 100%)"
      }}
      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      
      <div className="relative flex items-center justify-center gap-3">
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Creating Product...</span>
            </motion.div>
          ) : (
            <motion.div
              key="submit"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Plus size={20} />
              <span>Create Product</span>
              <Sparkles size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#FF719A] to-[#ea384c] opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
});

SubmitButton.displayName = 'SubmitButton';

const AddProduct: React.FC = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const { token, getAuthHeaders } = useAuth();
  const [product, setProduct] = useState<ProductData>({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    stockQuantity: "",
    image: "",
    discountPrice: "",
    sku: "",
    serialNumber: "",
    barcode: "",
    brand: "",
    weight: "",
    dimensions: "",
    expirationDate: "",
    tags: "",
    unitId: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auto-dismiss messages after 5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (submitSuccess) {
      timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }
    
    if (submitError) {
      timer = setTimeout(() => {
        setSubmitError(null);
      }, 5000);
    }
    
    return () => clearTimeout(timer);
  }, [submitSuccess, submitError]);

  const validateField = useCallback((name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Product name is required";
        if (value.trim().length < 2) return "Product name must be at least 2 characters";
        if (value.trim().length > 100) return "Product name must be less than 100 characters";
        return "";

      case "price":
        if (!value) return "Price is required";
        const price = parseFloat(value);
        if (isNaN(price)) return "Price must be a valid number";
        if (price <= 0) return "Price must be greater than 0";
        if (price > 999999.99) return "Price must be less than 1,000,000";
        return "";

      case "discountPrice":
        if (value) {
          const discountPrice = parseFloat(value);
          const regularPrice = parseFloat(product.price);
          if (isNaN(discountPrice)) return "Discount price must be a valid number";
          if (discountPrice < 0) return "Discount price cannot be negative";
          if (regularPrice && discountPrice >= regularPrice) {
            return "Discount price must be less than regular price";
          }
        }
        return "";

      case "description":
        if (value.length > 1000) return "Description must be less than 1000 characters";
        return "";

      case "categoryId":
        if (!value) return "Category ID is required";
        const categoryId = parseInt(value);
        if (isNaN(categoryId)) return "Category ID must be a number";
        if (categoryId <= 0) return "Category ID must be a positive number";
        return "";

      case "unitId":
        if (!value) return "Unit ID is required";
        const unitId = parseInt(value);
        if (isNaN(unitId)) return "Unit ID must be a number";
        if (unitId <= 0) return "Unit ID must be a positive number";
        return "";

      case "stockQuantity":
        if (!value) return "Stock quantity is required";
        const stock = parseInt(value);
        if (isNaN(stock)) return "Stock quantity must be a number";
        if (stock < 0) return "Stock quantity cannot be negative";
        if (stock > 999999) return "Stock quantity must be less than 1,000,000";
        return "";

      case "image":
        if (!value.trim()) return "Image URL is required";
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlPattern.test(value)) return "Please enter a valid URL";
        return "";

      case "sku":
        if (value && value.trim() !== "") {
          if (value.length < 3 || value.length > 50) {
            return "SKU must be between 3 and 50 characters";
          }
        }
        return "";

      case "barcode":
        if (value && value.trim() !== "") {
          const barcodePattern = /^[0-9]{8,13}$/;
          if (!barcodePattern.test(value)) return "Barcode must be 8-13 digits";
        }
        return "";

      case "brand":
        if (value && value.length > 50) return "Brand name must be less than 50 characters";
        return "";

      case "weight":
        if (value && value.trim() !== "") {
          const weight = parseFloat(value);
          if (isNaN(weight)) return "Weight must be a number";
          if (weight <= 0) return "Weight must be greater than 0";
          if (weight > 10000) return "Weight must be less than 10,000 kg";
        }
        return "";

      case "dimensions":
        if (value && value.trim() !== "") {
          const dimensionPattern = /^\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*x\s*\d+(\.\d+)?$/i;
          if (!dimensionPattern.test(value)) {
            return "Dimensions must be in format: LengthxWidthxHeight (e.g., 10x5x3)";
          }
        }
        return "";

      case "expirationDate":
        if (value && value.trim() !== "") {
          const expiryDate = new Date(value);
          if (isNaN(expiryDate.getTime())) return "Invalid date format";
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (expiryDate <= today) return "Expiration date must be in the future";
        }
        return "";

      case "tags":
        if (value && value.trim() !== "") {
          const tags = value.split(",").map(tag => tag.trim());
          if (tags.some(tag => tag.length > 30)) {
            return "Each tag must be less than 30 characters";
          }
          if (tags.length > 10) return "Maximum 10 tags allowed";
        }
        return "";

      default:
        return "";
    }
  }, [product.price]);

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    
    Object.keys(product).forEach(key => {
      if (key !== "isActive") {
        const error = validateField(key, product[key as keyof ProductData] as string);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [product, validateField]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      setProduct(prev => ({ ...prev, [name]: value }));
      
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      setTouched(prev => ({ ...prev, [name]: true }));
      
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    },
    [validateField]
  );

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!token) {
      setSubmitError("Your session has expired. Please log in again.");
      localStorage.removeItem('token');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    const allTouched = Object.keys(product).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);

    if (validateForm()) {
      try {
        const submissionData = {
          ...product,
          tags: product.tags ? product.tags.split(",").map(t => t.trim()) : [],
          price: parseFloat(product.price),
          discountPrice: product.discountPrice ? parseFloat(product.discountPrice) : null,
          categoryId: parseInt(product.categoryId),
          unitId: parseInt(product.unitId),
          stockQuantity: parseInt(product.stockQuantity),
          weight: product.weight ? parseFloat(product.weight) : null,
          expirationDate: product.expirationDate || null,
          sku: product.sku || null,
          serialNumber: product.serialNumber || null,
          barcode: product.barcode || null,
          isActive: product.isActive,
        };

        const response = await axios.post(
          "http://localhost:8080/api/product/product",
          submissionData,
          {
            headers: {
              "Content-Type": "application/json",
              ...getAuthHeaders()
            },
          }
        );
        
        setProduct({
          name: "",
          price: "",
          description: "",
          categoryId: "",
          stockQuantity: "",
          image: "",
          discountPrice: "",
          sku: "",
          serialNumber: "",
          barcode: "",
          brand: "",
          weight: "",
          dimensions: "",
          expirationDate: "",
          tags: "",
          unitId: "",
          isActive: true,
        });
        setTouched({});
        setErrors({});
        setSubmitSuccess(true);
      } catch (error) {
        console.error("Error submitting product:", error);
        
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setSubmitError("Session expired. Please log in again.");
            localStorage.removeItem('token');
            setTimeout(() => window.location.href = '/login', 2000);
          } else {
            setSubmitError(
              error.response?.data?.message || 
              error.response?.data?.error || 
              "Error submitting product. Please try again."
            );
          }
        } else {
          setSubmitError("An unexpected error occurred. Please try again.");
        }
      }
    }
    
    setIsSubmitting(false);
  };

  const formSections: FormSection[] = [
    {
      title: "Basic Information",
      fields: [
        { name: "name", label: "Product Name", icon: Package, required: true },
        { name: "description", label: "Description", icon: FileText, isTextarea: true, rows: 3 },
        { name: "brand", label: "Brand", icon: Tag }
      ]
    },
    {
      title: "Pricing & Inventory",
      fields: [
        { name: "price", label: "Price", icon: DollarSign, type: "number", required: true },
        { name: "discountPrice", label: "Discount Price", icon: DollarSign, type: "number" },
        { name: "stockQuantity", label: "Stock Quantity", icon: Hash, type: "number", required: true }
      ]
    },
    {
      title: "Product Details",
      fields: [
        { name: "sku", label: "SKU", icon: Hash },
        { name: "barcode", label: "Barcode", icon: Barcode },
        { name: "serialNumber", label: "Serial Number", icon: Hash },
        { name: "weight", label: "Weight (kg)", icon: Weight, type: "number" },
        { name: "dimensions", label: "Dimensions (L×W×H)", icon: Package }
      ]
    },
    {
      title: "Additional Information",
      fields: [
        { name: "categoryId", label: "Category ID", icon: Hash, type: "number", required: true },
        { name: "unitId", label: "Unit ID", icon: Hash, type: "number", required: true },
        { name: "image", label: "Image URL", icon: Image, required: true },
        { name: "expirationDate", label: "Expiration Date", icon: Calendar, type: "date", placeholder: "dd-mm-yyyy (Expiration Date)" },
        { name: "tags", label: "Tags (comma separated)", icon: Tag }
      ]
    }
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      darkMode 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" 
        : "bg-gradient-to-br from-pink-50 via-white to-purple-50"
    }`}>
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <Particles        
          className="absolute inset-0"
          quantity={150}
          ease={80}
          color={darkMode ? "#ea384c" : "#FF4B4B"}
          refresh={false}
        />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            background: darkMode
              ? "radial-gradient(circle at center, transparent, rgba(234, 56, 76, 0.08))"
              : "radial-gradient(circle at center, transparent, rgba(234, 56, 76, 0.05))",
            filter: "blur(80px)",
            transform: "translateZ(0)",
          }}
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className={`inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border shadow-lg ${
              darkMode 
                ? "bg-gray-800/60 border-gray-700" 
                : "bg-white/60 border-white/30"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-[#ea384c]" />
            <span className="text-sm font-medium bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent">
              Product Management
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent">
              Add New Product
            </span>
          </motion.h1>
          
          <motion.p 
            className={`text-lg max-w-2xl mx-auto ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Create and manage your products with our intuitive form system
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className={`rounded-3xl border shadow-2xl p-8 relative overflow-hidden ${
            darkMode 
              ? "bg-gray-800/50 border-gray-700 shadow-[#ea384c]/10" 
              : "bg-white/40 border-white/30 shadow-[#ea384c]/5"
          }`}>
            {/* Border Beam Effects */}
            <BorderBeam
              duration={6}
              size={300}
              delay={0.3}
              className="from-transparent via-[#ea384c] to-transparent"
            />
            <BorderBeam
              duration={8}
              size={350}
              delay={1.5}
              className="from-transparent via-[#FF719A] to-transparent"
            />

            {/* Error/Success Messages */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-6 p-4 rounded-md ${
                    darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"
                  }`}
                >
                  Product added successfully!
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-6 p-4 rounded-md ${
                    darkMode ? "bg-red-900/50 text-red-300" : "bg-red-100 text-red-700"
                  }`}
                >
                  {submitError}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-8 relative z-10">
              {formSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ea384c] to-[#FF719A] flex items-center justify-center text-white text-sm font-bold">
                      {sectionIndex + 1}
                    </div>
                    <h3 className={`text-xl font-semibold ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}>
                      {section.title}
                    </h3>
                    <div className={`flex-1 h-px ${
                      darkMode 
                        ? "bg-gradient-to-r from-[#ea384c]/20 to-transparent" 
                        : "bg-gradient-to-r from-[#ea384c]/10 to-transparent"
                    }`} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map((field) => (
                      <div key={field.name} className={field.isTextarea ? "md:col-span-2" : ""}>
                        <InputField
                          label={field.label}
                          name={field.name}
                          value={product[field.name] as string}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type={field.type}
                          required={field.required}
                          icon={field.icon}
                          rows={field.rows}
                          isTextarea={field.isTextarea}
                          placeholder={field.placeholder}
                          darkMode={darkMode}
                          error={errors[field.name]}
                          touched={touched[field.name]}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="pt-6"
              >
                <SubmitButton 
                  isSubmitting={isSubmitting} 
                  onClick={handleSubmit}
                  darkMode={darkMode}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`rounded-3xl p-8 max-w-md mx-4 text-center border relative overflow-hidden ${
                darkMode 
                  ? "bg-gray-800/90 border-gray-700" 
                  : "bg-white/90 border-white/30"
              }`}
            >
              {/* Border Beam for modal */}
              <BorderBeam
                duration={6}
                size={200}
                delay={0.3}
                className="from-transparent via-[#ea384c] to-transparent"
              />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-r from-[#ea384c] to-[#FF719A] rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className={`text-2xl font-bold mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}>
                Success!
              </h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Your product has been created successfully.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddProduct;