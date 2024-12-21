import React from 'react';
import { OrderList } from './OrderList';
import { OrderHistory } from './OrderHistory';
import { ShoppingCart } from 'lucide-react';

export function Orders() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <ShoppingCart className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold dark:text-white">Bestellung</h2>
        </div>
        <OrderList />
        <OrderHistory />
      </div>
    </div>
  );
}