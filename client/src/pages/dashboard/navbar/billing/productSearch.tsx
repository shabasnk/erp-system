// src/components/billing/ProductSearch.tsx
import React from 'react';
import { Product } from './types';
import { formatCurrency } from './utils';

interface ProductSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  handleProductSelect: (product: Product) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  darkMode: boolean;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  handleProductSelect,
  showSuggestions,
  setShowSuggestions,
  darkMode
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search products..."
        className={`w-full p-3 rounded-lg border ${
          darkMode 
            ? 'bg-gray-700 border-pink-900 text-white focus:border-pink-500' 
            : 'bg-white border-pink-200 focus:border-pink-300'
        } transition-colors duration-300`}
      />
      
      {showSuggestions && searchResults.length > 0 && (
        <div className={`absolute z-10 w-full mt-1 rounded-lg shadow-lg ${
          darkMode ? 'bg-gray-800 border border-pink-900' : 'bg-white border border-pink-200'
        }`}>
          {searchResults.map(product => (
            <div
              key={product.id}
              onClick={() => {
                handleProductSelect(product);
                setShowSuggestions(false);
              }}
              className={`p-3 cursor-pointer hover:${
                darkMode ? 'bg-gray-700' : 'bg-pink-50'
              } transition-colors duration-200`}
            >
              <div className="flex justify-between items-center">
                <span className={darkMode ? 'text-white' : 'text-gray-800'}>{product.name}</span>
                <span className={`font-medium ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                  {formatCurrency(product.discountPrice || product.price)}
                </span>
              </div>
              {product.description && (
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {product.description.length > 50 
                    ? `${product.description.substring(0, 50)}...` 
                    : product.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};