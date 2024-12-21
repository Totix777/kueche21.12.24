import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCiNF7X3PKihqpC2K9u55CgGYzLQR1iQT4",
  authDomain: "kueche-neu.firebaseapp.com",
  projectId: "kueche-neu",
  storageBucket: "kueche-neu.firebasestorage.app",
  messagingSenderId: "344488268036",
  appId: "1:344488268036:web:bc770d0f58de210a260051",
  measurementId: "G-NCF6W0M2HP"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);