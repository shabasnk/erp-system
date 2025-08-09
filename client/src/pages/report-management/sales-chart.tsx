//C:\coding\WEZ-ERP-APP\client\src\pages\report-management\sales-chart.tsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface SalesChartProps {
  data: {
    date: string;
    totalSales: number;
    totalOrders: number;
  }[];
  darkMode: boolean;
}

export const SalesChart: React.FC<SalesChartProps> = ({ data, darkMode }) => {
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    sales: item.totalSales,
    orders: item.totalOrders
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4b5563' : '#e5e7eb'} />
        <XAxis 
          dataKey="date" 
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
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#ea384c"
          strokeWidth={2}
          activeDot={{ r: 8 }}
          name="Sales ($)"
        />
        <Line
          type="monotone"
          dataKey="orders"
          stroke="#8884d8"
          strokeWidth={2}
          name="Orders"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};