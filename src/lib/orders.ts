import { collection, addDoc, getDocs, query, orderBy, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { Order, OrderItem } from '../types/orders';
import { sendOrderNotification } from './email';
import { orderItems as catalogItems } from '../data/orderItems';

const COLLECTION_NAME = 'orders';

export async function createOrder(items: Map<string, number>) {
  try {
    const orderData = {
      date: Timestamp.now(),
      items: Array.from(items.entries()).map(([articleNumber, quantity]) => ({
        articleNumber,
        quantity
      })),
      status: 'submitted',
      submittedBy: localStorage.getItem('username') || 'Unknown'
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), orderData);

    // Prepare order items for email notification
    const itemsList = Array.from(items.entries()).map(([articleNumber, quantity]) => {
      const item = catalogItems.find(i => i.articleNumber === articleNumber);
      return `${item?.name || articleNumber}: ${quantity} ${item?.orderUnit || 'Stück'}`;
    });

    // Send email notification
    await sendOrderNotification(itemsList, orderData.submittedBy);

    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function getOrders(): Promise<Order[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy('date', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: (doc.data().date as Timestamp).toDate(),
  })) as Order[];
}

export async function updateOrderStatus(orderId: string, status: Order['status']) {
  const orderRef = doc(db, COLLECTION_NAME, orderId);
  await updateDoc(orderRef, { status });
}