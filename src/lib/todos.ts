import { collection, addDoc, getDocs, query, orderBy, Timestamp, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { TodoItem } from '../types';

const COLLECTION_NAME = 'todos';

export async function addTodo(text: string) {
  const todoData = {
    text,
    completed: false,
    createdAt: Timestamp.now()
  };

  const docRef = await addDoc(collection(db, COLLECTION_NAME), todoData);
  return docRef.id;
}

export async function getTodos(): Promise<TodoItem[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: (doc.data().createdAt as Timestamp).toDate(),
  })) as TodoItem[];
}

export async function updateTodo(id: string, completed: boolean) {
  const todoRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(todoRef, { completed });
}

export async function deleteTodo(id: string) {
  const todoRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(todoRef);
}