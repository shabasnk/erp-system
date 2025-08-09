//C:\coding\WEZ-ERP-APP\client\src\pages\report-management\inventory-status.tsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
   CartesianGrid 
} from 'recharts';

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  currentStock: number;
  lowStockThreshold: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface InventoryStatusProps {
  items: InventoryItem[];
  darkMode: boolean;
}

export const InventoryStatus: React.FC<InventoryStatusProps> = ({ items, darkMode }) => {
  // Group items by status for the chart
  const statusCounts = items.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = [
    { name: 'In Stock', value: statusCounts['In Stock'] || 0 },
    { name: 'Low Stock', value: statusCounts['Low Stock'] || 0 },
    { name: 'Out of Stock', value: statusCounts['Out of Stock'] || 0 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : ''}`}>
          Inventory Overview
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4b5563' : '#e5e7eb'} />
              <XAxis 
                dataKey="name" 
                stroke={darkMode ? '#9ca3af' : '#6b7280'} 
              />
              <YAxis 
                stroke={darkMode ? '#9ca3af' : '#6b7280'} 
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                  borderRadius: '0.5rem'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="#ea384c" 
                name="Products" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div>
        <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : ''}`}>
          Stock Status
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className={darkMode ? 'text-gray-300' : ''}>In Stock</span>
            </div>
            <span className="font-medium">
              {statusCounts['In Stock'] || 0} products
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className={darkMode ? 'text-gray-300' : ''}>Low Stock</span>
            </div>
            <span className="font-medium">
              {statusCounts['Low Stock'] || 0} products
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className={darkMode ? 'text-gray-300' : ''}>Out of Stock</span>
            </div>
            <span className="font-medium">
              {statusCounts['Out of Stock'] || 0} products
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};