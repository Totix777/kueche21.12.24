import React, { useState } from 'react';
import { OrderItem } from '../../types/orders';
import { orderItems } from '../../data/orderItems';
import { useOrders } from '../../hooks/useOrders';
import { Search, ShoppingCart, Plus, Minus } from 'lucide-react';

export function OrderList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(new Map());
  const { submitOrder } = useOrders();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredItems = orderItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.articleNumber.includes(searchTerm)
  );

  const handleQuantityChange = (articleNumber: string, quantity: string) => {
    const numericQuantity = parseInt(quantity);
    if (numericQuantity > 0) {
      setSelectedItems(new Map(selectedItems.set(articleNumber, numericQuantity)));
    } else {
      const newItems = new Map(selectedItems);
      newItems.delete(articleNumber);
      setSelectedItems(newItems);
    }
  };

  const incrementQuantity = (articleNumber: string) => {
    const currentQuantity = selectedItems.get(articleNumber) || 0;
    handleQuantityChange(articleNumber, (currentQuantity + 1).toString());
  };

  const decrementQuantity = (articleNumber: string) => {
    const currentQuantity = selectedItems.get(articleNumber) || 0;
    if (currentQuantity > 0) {
      handleQuantityChange(articleNumber, (currentQuantity - 1).toString());
    }
  };

  const handleSubmitOrder = async () => {
    try {
      setIsSubmitting(true);
      await submitOrder(selectedItems);
      setSelectedItems(new Map());
      alert('Bestellung erfolgreich aufgegeben');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Fehler beim Aufgeben der Bestellung');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Suche nach Artikelnummer oder Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <button
          onClick={handleSubmitOrder}
          disabled={selectedItems.size === 0 || isSubmitting}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>
            {isSubmitting ? 'Wird gespeichert...' : `Bestellen (${selectedItems.size})`}
          </span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Art.-Nr.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Artikelbezeichnung
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                VE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Bestell-Einheit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Menge
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredItems.map((item) => (
              <tr key={item.articleNumber}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {item.articleNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {item.packageSize}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {item.orderUnit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrementQuantity(item.articleNumber)}
                      className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={selectedItems.get(item.articleNumber) || ''}
                      onChange={(e) => handleQuantityChange(item.articleNumber, e.target.value)}
                      className="w-16 px-2 py-1 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    <button
                      onClick={() => incrementQuantity(item.articleNumber)}
                      className="p-1 text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}