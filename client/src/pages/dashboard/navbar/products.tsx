import React from 'react';

interface ProductsNavProps {
  darkMode: boolean;
  setActiveTab?: (tab: string) => void;
}

const ProductsNav: React.FC<ProductsNavProps> = ({ darkMode, setActiveTab }) => {
  return (
    <>
      {setActiveTab && (
        <button
          onClick={() => setActiveTab('products')}
          className={`px-3 py-2 rounded-md text-sm font-medium font-['Kantumruy_Pro'] ${darkMode ? 'bg-gray-800 text-pink-400' : 'bg-pink-100 text-pink-600'}`}
        >
          Products
        </button>
      )}
      {setActiveTab && (
        <button
          onClick={() => setActiveTab('billing')}
          className={`px-3 py-2 rounded-md text-sm font-medium font-['Kantumruy_Pro'] ${darkMode ? 'text-gray-300 hover:text-pink-300 hover:bg-gray-700' : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'}`}
        >
          Billing
        </button>
      )}
      
      {!setActiveTab && (
        <div>
          <div className="mb-8">
            <h1 className={`text-3xl font-bold font-['Kantumruy_Pro'] bg-gradient-to-r from-[#ea384c] to-[#FF719A] bg-clip-text text-transparent`}>
              Your Products
            </h1>
            <p className={`mt-2 ${darkMode ? 'text-pink-200' : 'text-pink-700'}`}>
              Manage your products here
            </p>
          </div>

          <div>
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/50 border border-pink-900' : 'bg-pink-50 border border-pink-100'}`}>
              <h2 className={`text-xl font-bold font-['Kantumruy_Pro'] mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Your Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Product Cards */}
                {[1, 2, 3].map((product) => (
                  <div 
                    key={product}
                    className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 border border-pink-900 hover:border-pink-500' : 'bg-white border border-pink-200 hover:border-pink-300'} transition-all duration-300 shadow-sm`}
                  >
                    <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-md mb-3 flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500">Product Image</span>
                    </div>
                    <h3 className={`font-medium font-['Kantumruy_Pro'] ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Product {product}
                    </h3>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                      Description of product {product}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className={`font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>${(product * 19.99).toFixed(2)}</span>
                      <button
                        className={`px-3 py-1 rounded text-sm font-medium ${darkMode 
                          ? 'bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white' 
                          : 'bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white'} shadow-md`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button
                  className={`px-4 py-2 rounded-md font-medium ${darkMode 
                    ? 'bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white' 
                    : 'bg-gradient-to-r from-[#ea384c] to-[#FF719A] hover:from-[#d83245] hover:to-[#e6688d] text-white'} shadow-md relative overflow-hidden group`}
                >
                  <span className="relative z-10">Add New Product</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FF719A] to-[#ea384c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsNav;