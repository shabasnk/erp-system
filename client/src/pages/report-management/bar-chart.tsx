


//C:\coding\WEZ-ERP-APP\client\src\pages\report-management\bar-chart.tsx
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RevenueBarChartProps {
  data: { month: string; revenue: number }[];
  darkMode: boolean;
}

export const RevenueBarChart: React.FC<RevenueBarChartProps> = ({ data, darkMode }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4b5563' : '#e5e7eb'} />
        <XAxis 
          dataKey="month" 
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
          dataKey="revenue" 
          fill="#ea384c" 
          name="Revenue ($)" 
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};