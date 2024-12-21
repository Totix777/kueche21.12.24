import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { TemperatureLog } from '../types';

const COLLECTION_NAME = 'coolerTemperatures';

export async function addTemperatureLog(temperatures: Omit<TemperatureLog, 'id' | 'date'>) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...temperatures,
      date: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding temperature log:', error);
    throw error;
  }
}

export async function getTemperatureLogs(): Promise<TemperatureLog[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('date', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: (doc.data().date as Timestamp).toDate()
    })) as TemperatureLog[];
  } catch (error) {
    console.error('Error getting temperature logs:', error);
    throw error;
  }
}