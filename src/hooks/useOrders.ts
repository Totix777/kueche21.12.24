import { useState, useEffect } from 'react';
import { Order } from '../types/orders';
import { createOrder, getOrders, updateOrderStatus } from '../lib/orders';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      setError('Failed to load orders');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitOrder = async (items: Map<string, number>) => {
    try {
      setError(null);
      await createOrder(items);
      await loadOrders();
    } catch (err) {
      setError('Failed to submit order');
      throw err;
    }
  };

  const updateStatus = async (orderId: string, status: Order['status']) => {
    try {
      setError(null);
      await updateOrderStatus(orderId, status);
      await loadOrders();
    } catch (err) {
      setError('Failed to update order status');
      throw err;
    }
  };

  return { 
    orders, 
    loading, 
    error,
    submitOrder, 
    updateStatus 
  };
}