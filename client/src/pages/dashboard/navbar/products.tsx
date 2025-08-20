import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

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

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token is required");
          return;
        }

        // Make the API request with the token in the headers
        const response = await axios.get("/api/product/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
          <h2
            className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Your Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className={`p-4 rounded-lg ${
                    darkMode
                      ? "bg-gray-800 border border-pink-900 hover:border-pink-500"
                      : "bg-white border border-pink-200 hover:border-pink-300"
                  } transition-all duration-300 shadow-sm`}
                >
                  <div
                    className={`h-40 ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } rounded-md mb-3 flex items-center justify-center`}
                  >
                    <span
                      className={`${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Product Image
                    </span>
                  </div>
                  <h3
                    className={`font-medium font-['Kantumruy_Pro'] ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={`text-sm mt-1 ${
                      darkMode ? "text-pink-300" : "text-pink-600"
                    }`}
                  >
                    {product.description}
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <span
                      className={`font-bold ${
                        darkMode ? "text-pink-400" : "text-pink-600"
                      }`}
                    >
                      ₹{product.price}
                    </span>
                    <button
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        darkMode
                          ? "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
                          : "bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white"
                      } shadow-md`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p
                className={`text-center ${
                  darkMode ? "text-pink-200" : "text-pink-600"
                }`}
              >
                No products available
              </p>
            )}
          </div>
          <div className="mt-6">
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
      </div>
    </div>
  );
};

export default ProductsNav;
