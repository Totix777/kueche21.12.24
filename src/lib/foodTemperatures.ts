import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { FoodTemperatureLog } from '../types';

const COLLECTION_NAME = 'foodTemperatures';

export async function addFoodTemperatureLog(log: Omit<FoodTemperatureLog, 'id' | 'date'>) {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...log,
    date: Timestamp.now(),
  });
  return docRef.id;
}

export async function getFoodTemperatureLogs(): Promise<FoodTemperatureLog[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy('date', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: (doc.data().date as Timestamp).toDate(),
  })) as FoodTemperatureLog[];
}