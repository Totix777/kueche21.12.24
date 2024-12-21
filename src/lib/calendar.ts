import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { WeeklyTask } from '../types';

const COLLECTION_NAME = 'calendar';

export async function addCalendarTask(date: Date, text: string) {
  const taskData = {
    date: Timestamp.fromDate(date),
    text,
    createdAt: Timestamp.now()
  };

  const docRef = await addDoc(collection(db, COLLECTION_NAME), taskData);
  return docRef.id;
}

export async function getCalendarTasks(): Promise<WeeklyTask[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy('date', 'asc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: (doc.data().date as Timestamp).toDate(),
  })) as WeeklyTask[];
}