import React from 'react';
import { useOrders } from '../../hooks/useOrders';
import { orderItems } from '../../data/orderItems';

export function OrderHistory() {
  const { orders, loading, updateStatus } = useOrders();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getItemDetails = (articleNumber: string) => {
    return orderItems.find(item => item.articleNumber === articleNumber);
  };

  if (loading) {
    return <div className="text-center py-4">Lädt...</div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Bestellverlauf</h3>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {formatDate(order.date)}
                </p>
                <p className="text-sm font-medium dark:text-white">
                  Status: {
                    order.status === 'draft' ? 'Entwurf' :
                    order.status === 'submitted' ? 'Bestellt' :
                    'Abgeschlossen'
                  }
                </p>
              </div>
              {order.status !== 'completed' && (
                <button
                  onClick={() => updateStatus(order.id, 'completed')}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Als erledigt markieren
                </button>
              )}
            </div>
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 dark:text-gray-300">
                  <th className="py-2">Artikel</th>
                  <th className="py-2">Menge</th>
                  <th className="py-2">Einheit</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => {
                  const details = getItemDetails(item.articleNumber);
                  return (
                    <tr key={item.articleNumber} className="border-t dark:border-gray-600">
                      <td className="py-2 dark:text-white">
                        {details?.name || item.articleNumber}
                      </td>
                      <td className="py-2 dark:text-white">{item.quantity}</td>
                      <td className="py-2 dark:text-white">{details?.orderUnit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
        {orders.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Keine Bestellungen vorhanden
          </p>
        )}
      </div>
    </div>
  );
}