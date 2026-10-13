// src/components/billing/ProductTable.tsx
import React from 'react';
import { SelectedProduct } from './types';
import { formatCurrency } from './utils';

interface ProductTableProps {
  selectedProducts: SelectedProduct[];
  updateQuantity: (id: number, newQuantity: number) => void;
  removeProduct: (id: number) => void;
  darkMode: boolean;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  selectedProducts,
  updateQuantity,
  removeProduct,
  darkMode
}) => {
  return (
    <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-pink-100'}`}>
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map(product => (
              <tr key={product.id} className={`border-t ${darkMode ? 'border-gray-700' : 'border-pink-100'}`}>
                <td className="p-3">
                  <div>
                    <p className={darkMode ? 'text-white' : 'text-gray-800'}>{product.name}</p>
                    {product.description && (
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {product.description.length > 30 
                          ? `${product.description.substring(0, 30)}...` 
                          : product.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <span className={`font-medium ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                    {formatCurrency(product.discountPrice || product.price)}
                  </span>
                  {product.discountPrice && (
                    <span className={`text-xs line-through ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatCurrency(product.price)}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity - 1)}
                      className={`p-1 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-pink-100 hover:bg-pink-200'}`}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                      className={`w-12 mx-2 p-1 text-center rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white border border-pink-200'}`}
                    />
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity + 1)}
                      className={`p-1 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-pink-100 hover:bg-pink-200'}`}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`font-medium ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                    {formatCurrency((product.discountPrice || product.price) * product.quantity)}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => removeProduct(product.id)}
                    className={`p-1 rounded-md ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-pink-100'}`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};