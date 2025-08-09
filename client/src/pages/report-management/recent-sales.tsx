//C:\coding\WEZ-ERP-APP\client\src\pages\report-management\recent-sales.tsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Order {
  id: number;
  customerName: string;
  totalAmount: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
  date: string;
}

interface RecentSalesProps {
  orders: Order[];
  darkMode: boolean;
}

export const RecentSales: React.FC<RecentSalesProps> = ({ orders, darkMode }) => {
  return (
    <div className="space-y-8">
      {orders.slice(0, 5).map((order) => (
        <div key={order.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${order.id % 5}.png`} alt="Avatar" />
            <AvatarFallback>
              {order.customerName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className={`text-sm font-medium leading-none ${darkMode ? 'text-white' : ''}`}>
              {order.customerName}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              #{order.id}
            </p>
          </div>
          <div className="ml-auto font-medium">
            ${order.totalAmount.toFixed(2)}
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Button 
          variant="ghost" 
          className={darkMode ? 'text-pink-400 hover:bg-gray-700' : 'text-pink-600'}
        >
          View all orders
        </Button>
      </div>
    </div>
  );
};