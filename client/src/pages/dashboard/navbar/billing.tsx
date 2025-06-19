import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  // Add other product fields as needed
}

const BillingNav: React.FC = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product/products'); // Adjust this endpoint as needed
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products || data); // Adjust based on your API response structure
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold font-['Kantumruy_Pro'] bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent`}>
          Billing Information
        </h1>
        <p className={`mt-2 ${darkMode ? 'text-pink-200' : 'text-pink-700'}`}>
          View and manage your billing information
        </p>
      </div>

      <div>
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/50 border border-pink-900' : 'bg-pink-50 border border-pink-100'}`}>
          {/* ... existing billing sections ... */}

          {/* Add a new section for Products */}
          <div className="mt-8">
            <h2 className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Your Products
            </h2>
            
            {loading ? (
              <div className="text-center py-4">
                <p className={darkMode ? 'text-pink-300' : 'text-pink-600'}>Loading products...</p>
              </div>
            ) : error ? (
              <div className={`p-4 rounded-md ${darkMode ? 'bg-red-900/50' : 'bg-red-100'} mb-4`}>
                <p className={darkMode ? 'text-red-300' : 'text-red-600'}>Error: {error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className={`p-4 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-pink-100'} mb-4`}>
                <p className={darkMode ? 'text-pink-300' : 'text-pink-600'}>No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 border border-pink-900 hover:border-pink-500' : 'bg-white border border-pink-200 hover:border-pink-300'} transition-all duration-300 shadow-sm`}
                  >
                    <h3 className={`font-medium font-['Kantumruy_Pro'] mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {product.name}
                    </h3>
                    <p className={`text-sm mb-2 ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                      ${product.price.toFixed(2)}
                    </p>
                    {product.description && (
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {product.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingNav;