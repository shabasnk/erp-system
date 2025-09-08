// import React, { useEffect, useState } from "react";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import axios from "axios";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   image: string;
//   discountPrice?: number;
//   sku?: string;
//   barcode?: string;
//   categoryId: number;
//   stockQuantity: number;
//   brand?: string;
//   weight?: number;
//   dimensions?: string;
//   expirationDate?: string;
//   tags?: string[];
//   unitId: number;
//   isActive: boolean;
// }

// const ProductsNav: React.FC = () => {
//   const { darkMode } = useOutletContext<{ darkMode: boolean }>();
//   const navigate = useNavigate();

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Fetch products from the API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           console.error("Token is required");
//           return;
//         }

//         // Make the API request with the token in the headers
//         const response = await axios.get("/api/product/product", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setProducts(response.data.products);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return (
//       <div
//         className={`flex items-center justify-center min-h-screen ${
//           darkMode ? "bg-gray-900" : "bg-white"
//         }`}
//       >
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="mb-8">
//         <h1
//           className={`text-3xl font-bold font-['Kantumruy_Pro'] bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent`}
//         >
//           Your Products
//         </h1>
//         <p className={`mt-2 ${darkMode ? "text-pink-200" : "text-pink-700"}`}>
//           Manage your products here
//         </p>
//       </div>

//       <div>
//         <div
//           className={`p-6 rounded-lg ${
//             darkMode
//               ? "bg-gray-800/50 border border-pink-900"
//               : "bg-pink-50 border border-pink-100"
//           }`}
//         >
//           <h2
//             className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${
//               darkMode ? "text-white" : "text-gray-800"
//             }`}
//           >
//             Your Products
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <div
//                   key={product.id}
//                   className={`p-4 rounded-lg ${
//                     darkMode
//                       ? "bg-gray-800 border border-pink-900 hover:border-pink-500"
//                       : "bg-white border border-pink-200 hover:border-pink-300"
//                   } transition-all duration-300 shadow-sm`}
//                 >
//                   <div
//                     className={`h-40 ${
//                       darkMode ? "bg-gray-700" : "bg-gray-100"
//                     } rounded-md mb-3 flex items-center justify-center`}
//                   >
//                     <span
//                       className={`${
//                         darkMode ? "text-gray-500" : "text-gray-400"
//                       }`}
//                     >
//                       Product Image
//                     </span>
//                   </div>
//                   <h3
//                     className={`font-medium font-['Kantumruy_Pro'] ${
//                       darkMode ? "text-white" : "text-gray-800"
//                     }`}
//                   >
//                     {product.name}
//                   </h3>
//                   <p
//                     className={`text-sm mt-1 ${
//                       darkMode ? "text-pink-300" : "text-pink-600"
//                     }`}
//                   >
//                     {product.description}
//                   </p>
//                   <div className="mt-3 flex justify-between items-center">
//                     <span
//                       className={`font-bold ${
//                         darkMode ? "text-pink-400" : "text-pink-600"
//                       }`}
//                     >
//                       ₹{product.price}
//                     </span>
//                     <button
//                       className={`px-3 py-1 rounded text-sm font-medium ${
//                         darkMode
//                           ? "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
//                           : "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
//                       } shadow-md`}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p
//                 className={`text-center ${
//                   darkMode ? "text-pink-200" : "text-pink-600"
//                 }`}
//               >
//                 No products available
//               </p>
//             )}
//           </div>
//           <div className="mt-6">
//             <button
//               className={`px-4 py-2 rounded-md font-medium ${
//                 darkMode
//                   ? "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
//                   : "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
//               } shadow-md relative overflow-hidden group`}
//               onClick={() => navigate("addProduct")}
//             >
//               <span className="relative z-10">Add New Product</span>
//               <span className="absolute inset-0 bg-gradient-to-r from-[#FF719A] to-[#ea384c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsNav;
















// // fr solvng the issue aftr shpownr bsed rprt
// // src/components/products/ProductsNav.tsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from '@/hooks/useAuth';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   image: string;
//   discountPrice?: number;
//   sku?: string;
//   barcode?: string;
//   categoryId: number;
//   stockQuantity: number;
//   brand?: string;
//   weight?: number;
//   dimensions?: string;
//   expirationDate?: string;
//   tags?: string[];
//   unitId: number;
//   isActive: boolean;
// }

// const ProductsNav: React.FC = () => {
//   const { darkMode } = useOutletContext<{ darkMode: boolean }>();
//   const navigate = useNavigate();
//   const { getAuthHeaders, isAuthenticated } = useAuth();

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // API client with auth headers
//   const authAxios = axios.create({
//     baseURL: '/api',
//     headers: getAuthHeaders()
//   });

//   // Fetch products from the API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         // Use your authAxios instance instead of manual token handling
//         const response = await authAxios.get("/product/product");
        
//         setProducts(response.data.products);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         if (axios.isAxiosError(error)) {
//           if (error.response?.status === 401) {
//             setError("Authentication failed. Please login again.");
//           } else if (error.response?.status === 403) {
//             setError("You don't have permission to view products.");
//           } else {
//             setError("Failed to load products. Please try again.");
//           }
//         } else {
//           setError("An unexpected error occurred.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isAuthenticated) {
//       fetchProducts();
//     } else {
//       setLoading(false);
//       setError("Please login to view products");
//     }
//   }, [isAuthenticated]);

//   if (loading) {
//     return (
//       <div
//         className={`flex items-center justify-center min-h-screen ${
//           darkMode ? "bg-gray-900" : "bg-white"
//         }`}
//       >
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div>
//         <div className="mb-8">
//           <h1
//             className={`text-3xl font-bold font-['Kantumruy_Pro'] bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent`}
//           >
//             Your Products
//           </h1>
//           <p className={`mt-2 ${darkMode ? "text-pink-200" : "text-pink-700"}`}>
//             Manage your products here
//           </p>
//         </div>

//         <div
//           className={`p-6 rounded-lg ${
//             darkMode
//               ? "bg-gray-800/50 border border-pink-900"
//               : "bg-pink-50 border border-pink-100"
//           }`}
//         >
//           <div className="text-center py-8">
//             <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
//             {error.includes("login") && (
//               <button
//                 onClick={() => navigate("/login")}
//                 className={`px-4 py-2 rounded-md font-medium ${
//                   darkMode
//                     ? "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
//                     : "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
//                 } shadow-md`}
//               >
//                 Go to Login
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="mb-8">
//         <h1
//           className={`text-3xl font-bold font-['Kantumruy_Pro'] bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent`}
//         >
//           Your Products
//         </h1>
//         <p className={`mt-2 ${darkMode ? "text-pink-200" : "text-pink-700"}`}>
//           Manage your products here
//         </p>
//       </div>

//       <div>
//         <div
//           className={`p-6 rounded-lg ${
//             darkMode
//               ? "bg-gray-800/50 border border-pink-900"
//               : "bg-pink-50 border border-pink-100"
//           }`}
//         >
//           <div className="flex justify-between items-center mb-6">
//             <h2
//               className={`text-xl font-bold font-['Kantumruy_Pro'] ${
//                 darkMode ? "text-white" : "text-gray-800"
//               }`}
//             >
//               Your Products ({products.length})
//             </h2>
//             <button
//               className={`px-4 py-2 rounded-md font-medium ${
//                 darkMode
//                   ? "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
//                   : "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
//               } shadow-md relative overflow-hidden group`}
//               onClick={() => navigate("addProduct")}
//             >
//               <span className="relative z-10">Add New Product</span>
//               <span className="absolute inset-0 bg-gradient-to-r from-[#FF719A] to-[#ea384c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <div
//                   key={product.id}
//                   className={`p-4 rounded-lg ${
//                     darkMode
//                       ? "bg-gray-800 border border-pink-900 hover:border-pink-500"
//                       : "bg-white border border-pink-200 hover:border-pink-300"
//                   } transition-all duration-300 shadow-sm`}
//                 >
//                   <div
//                     className={`h-40 ${
//                       darkMode ? "bg-gray-700" : "bg-gray-100"
//                     } rounded-md mb-3 flex items-center justify-center`}
//                   >
//                     {product.image ? (
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="h-full w-full object-cover rounded-md"
//                       />
//                     ) : (
//                       <span
//                         className={`${
//                           darkMode ? "text-gray-500" : "text-gray-400"
//                         }`}
//                       >
//                         No Image
//                       </span>
//                     )}
//                   </div>
//                   <h3
//                     className={`font-medium font-['Kantumruy_Pro'] ${
//                       darkMode ? "text-white" : "text-gray-800"
//                     }`}
//                   >
//                     {product.name}
//                   </h3>
//                   <p
//                     className={`text-sm mt-1 ${
//                       darkMode ? "text-pink-300" : "text-pink-600"
//                     }`}
//                   >
//                     {product.description}
//                   </p>
//                   <div className="mt-3 flex justify-between items-center">
//                     <div className="flex flex-col">
//                       <span
//                         className={`font-bold ${
//                           darkMode ? "text-pink-400" : "text-pink-600"
//                         }`}
//                       >
//                         ₹{product.price}
//                       </span>
//                       {product.discountPrice && (
//                         <span
//                           className={`text-xs ${
//                             darkMode ? "text-gray-400" : "text-gray-500"
//                           } line-through`}
//                         >
//                           ₹{product.discountPrice}
//                         </span>
//                       )}
//                     </div>
//                     <span
//                       className={`text-sm ${
//                         darkMode ? "text-gray-400" : "text-gray-600"
//                       }`}
//                     >
//                       Stock: {product.stockQuantity}
//                     </span>
//                   </div>
//                   <div className="mt-3">
//                     <button
//                       className={`w-full px-3 py-2 rounded text-sm font-medium ${
//                         darkMode
//                           ? "bg-gray-700 hover:bg-gray-600 text-white"
//                           : "bg-gray-200 hover:bg-gray-300 text-gray-800"
//                       } transition-colors`}
//                       onClick={() => navigate(`editProduct/${product.id}`)}
//                     >
//                       Edit Product
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-12">
//                 <div
//                   className={`text-2xl mb-4 ${
//                     darkMode ? "text-pink-300" : "text-pink-600"
//                   }`}
//                 >
//                   📦
//                 </div>
//                 <p
//                   className={`text-lg font-medium ${
//                     darkMode ? "text-pink-200" : "text-pink-600"
//                   } mb-4`}
//                 >
//                   No products yet
//                 </p>
//                 <p
//                   className={`mb-6 ${
//                     darkMode ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   Get started by adding your first product
//                 </p>
//                 <button
//                   className={`px-6 py-3 rounded-md font-medium ${
//                     darkMode
//                       ? "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
//                       : "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
//                   } shadow-md`}
//                   onClick={() => navigate("addProduct")}
//                 >
//                   Add Your First Product
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsNav;












// src/components/products/ProductsNav.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  discountPrice?: number;
  sku?: string;
  barcode?: string;
  categoryId: number;
  stockQuantity: number;
  brand?: string;
  weight?: number;
  dimensions?: string;
  expirationDate?: string;
  tags?: string[];
  unitId: number;
  isActive: boolean;
}

const ProductsNav: React.FC = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const navigate = useNavigate();
  const { getAuthHeaders, isAuthenticated } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("name");

  // API client with auth headers
  const authAxios = axios.create({
    baseURL: '/api',
    headers: getAuthHeaders()
  });

  // Filter products based on search term
  useEffect(() => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch(sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "priceHigh":
          return b.price - a.price;
        case "priceLow":
          return a.price - b.price;
        case "stock":
          return b.stockQuantity - a.stockQuantity;
        default:
          return 0;
      }
    });
    
    setFilteredProducts(sorted);
  }, [products, searchTerm, sortBy]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use your authAxios instance instead of manual token handling
        const response = await authAxios.get("/product/product");
        
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setError("Authentication failed. Please login again.");
          } else if (error.response?.status === 403) {
            setError("You don't have permission to view products.");
          } else {
            setError("Failed to load products. Please try again.");
          }
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProducts();
    } else {
      setLoading(false);
      setError("Please login to view products");
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold font-['Kantumruy_Pro'] bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent`}
          >
            Your Products
          </h1>
          <p className={`mt-2 ${darkMode ? "text-pink-200" : "text-pink-700"}`}>
            Manage your products here
          </p>
        </div>

        <div
          className={`p-6 rounded-lg ${
            darkMode
              ? "bg-gray-800/50 border border-pink-900"
              : "bg-pink-50 border border-pink-100"
          }`}
        >
          <div className="text-center py-8">
            <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
            {error.includes("login") && (
              <button
                onClick={() => navigate("/login")}
                className={`px-4 py-2 rounded-md font-medium ${
                  darkMode
                    ? "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
                    : "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
                } shadow-md`}
              >
                Go to Login
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1
          className={`text-3xl font-bold font-['Kantumruy_Pro'] bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent`}
        >
          Your Products
        </h1>
        <p className={`mt-2 ${darkMode ? "text-pink-200" : "text-pink-700"}`}>
          Manage your products here
        </p>
      </div>

      <div>
        <div
          className={`p-6 rounded-lg ${
            darkMode
              ? "bg-gray-800/50 border border-pink-900"
              : "bg-pink-50 border border-pink-100"
          }`}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <h2
              className={`text-xl font-bold font-['Kantumruy_Pro'] ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Your Products ({filteredProducts.length})
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-md border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-pink-500`}
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 rounded-md border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                } focus:outline-none focus:ring-2 focus:ring-pink-500`}
              >
                <option value="name">Sort by Name</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="stock">Stock: High to Low</option>
              </select>
              
              <button
                className={`px-4 py-2 rounded-md font-medium ${
                  darkMode
                    ? "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
                    : "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
                } shadow-md relative overflow-hidden group`}
                onClick={() => navigate("addProduct")}
              >
                <span className="relative z-10">Add New Product</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#FF719A] to-[#ea384c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`p-4 rounded-lg ${
                    darkMode
                      ? "bg-gray-800 border border-pink-900 hover:border-pink-500"
                      : "bg-white border border-pink-200 hover:border-pink-300"
                  } transition-all duration-300 shadow-sm hover:shadow-md`}
                >
                  <div
                    className={`h-40 ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } rounded-md mb-3 flex items-center justify-center overflow-hidden`}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover rounded-md"
                      />
                    ) : (
                      <span
                        className={`${
                          darkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        No Image
                      </span>
                    )}
                  </div>
                  <h3
                    className={`font-medium font-['Kantumruy_Pro'] truncate ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={`text-sm mt-1 line-clamp-2 ${
                      darkMode ? "text-pink-300" : "text-pink-600"
                    }`}
                  >
                    {product.description}
                  </p>
                  
                  {product.brand && (
                    <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Brand: {product.brand}
                    </p>
                  )}
                  
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span
                        className={`font-bold ${
                          darkMode ? "text-pink-400" : "text-pink-600"
                        }`}
                      >
                        ₹{product.price}
                      </span>
                      {product.discountPrice && product.discountPrice > 0 && (
                        <span
                          className={`text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          } line-through`}
                        >
                          ₹{product.discountPrice}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        product.stockQuantity > 10
                          ? darkMode
                            ? "bg-green-900/30 text-green-400"
                            : "bg-green-100 text-green-800"
                          : product.stockQuantity > 0
                          ? darkMode
                            ? "bg-yellow-900/30 text-yellow-400"
                            : "bg-yellow-100 text-yellow-800"
                          : darkMode
                          ? "bg-red-900/30 text-red-400"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      Stock: {product.stockQuantity}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      className={`flex-1 px-3 py-2 rounded text-sm font-medium ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                      } transition-colors`}
                      onClick={() => navigate(`editProduct/${product.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className={`px-3 py-2 rounded text-sm font-medium ${
                        darkMode
                          ? "bg-pink-900 hover:bg-pink-800 text-white"
                          : "bg-pink-100 hover:bg-pink-200 text-pink-800"
                      } transition-colors`}
                      onClick={() => navigate(`viewProduct/${product.id}`)}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            ) : searchTerm ? (
              <div className="col-span-full text-center py-12">
                <div
                  className={`text-2xl mb-4 ${
                    darkMode ? "text-pink-300" : "text-pink-600"
                  }`}
                >
                  🔍
                </div>
                <p
                  className={`text-lg font-medium ${
                    darkMode ? "text-pink-200" : "text-pink-600"
                  } mb-4`}
                >
                  No products found
                </p>
                <p
                  className={`mb-6 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Try a different search term or add a new product
                </p>
                <button
                  className={`px-6 py-3 rounded-md font-medium ${
                    darkMode
                      ? "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
                      : "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
                  } shadow-md`}
                  onClick={() => {
                    setSearchTerm("");
                    navigate("addProduct");
                  }}
                >
                  Add New Product
                </button>
              </div>
            ) : (
              <div className="col-span-full text-center py-12">
                <div
                  className={`text-2xl mb-4 ${
                    darkMode ? "text-pink-300" : "text-pink-600"
                  }`}
                >
                  📦
                </div>
                <p
                  className={`text-lg font-medium ${
                    darkMode ? "text-pink-200" : "text-pink-600"
                  } mb-4`}
                >
                  No products yet
                </p>
                <p
                  className={`mb-6 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Get started by adding your first product
                </p>
                <button
                  className={`px-6 py-3 rounded-md font-medium ${
                    darkMode
                      ? "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
                      : "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
                  } shadow-md`}
                  onClick={() => navigate("addProduct")}
                >
                  Add Your First Product
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsNav;