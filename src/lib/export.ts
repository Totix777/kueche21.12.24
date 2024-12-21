import { collection, getDocs, query, where, Timestamp, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export type ExportType = 'tasks' | 'coolers' | 'food' | 'todos';

export async function exportData(type: ExportType, startDate: Date, endDate: Date): Promise<string> {
  // Adjust end date to include the entire day
  const adjustedEndDate = new Date(endDate);
  adjustedEndDate.setHours(23, 59, 59, 999);

  switch (type) {
    case 'tasks':
      return exportTasks(startDate, adjustedEndDate);
    case 'coolers':
      return exportCoolerTemperatures(startDate, adjustedEndDate);
    case 'food':
      return exportFoodTemperatures(startDate, adjustedEndDate);
    case 'todos':
      return exportTodos(startDate, adjustedEndDate);
    default:
      throw new Error('Ungültiger Export-Typ');
  }
}

async function exportTasks(startDate: Date, endDate: Date): Promise<string> {
  const tasksRef = collection(db, 'tasks');
  const q = query(
    tasksRef,
    orderBy('completedAt'),
    where('completedAt', '>=', Timestamp.fromDate(startDate)),
    where('completedAt', '<=', Timestamp.fromDate(endDate))
  );
  
  const snapshot = await getDocs(q);
  console.log(`Found ${snapshot.docs.length} tasks`);
  
  const data = snapshot.docs.map(doc => {
    const taskData = doc.data();
    return {
      area: taskData.areaName,
      task: taskData.task,
      frequency: taskData.frequency,
      completed: taskData.completed,
      completedBy: taskData.completedBy,
      completedAt: taskData.completedAt?.toDate()
    };
  });

  const headers = ['Bereich', 'Aufgabe', 'Häufigkeit', 'Status', 'Erledigt von', 'Erledigt am'];
  const rows = data.map(item => [
    item.area || '',
    item.task || '',
    item.frequency === 'daily' ? 'Täglich' : 
    item.frequency === 'weekly' ? 'Wöchentlich' : 'Monatlich',
    item.completed ? 'Erledigt' : 'Offen',
    item.completedBy || '',
    item.completedAt ? formatDate(item.completedAt) : ''
  ]);

  return createCSV(headers, rows);
}

async function exportCoolerTemperatures(startDate: Date, endDate: Date): Promise<string> {
  const logsRef = collection(db, 'coolerTemperatures');
  const q = query(
    logsRef,
    orderBy('date'),
    where('date', '>=', Timestamp.fromDate(startDate)),
    where('date', '<=', Timestamp.fromDate(endDate))
  );

  const snapshot = await getDocs(q);
  console.log(`Found ${snapshot.docs.length} cooler temperatures`);
  
  const data = snapshot.docs.map(doc => {
    const logData = doc.data();
    return {
      date: logData.date.toDate(),
      freezer: logData.freezer,
      frontCooler: logData.frontCooler,
      backCooler: logData.backCooler,
      vegetableCooler: logData.vegetableCooler,
      notes: logData.notes
    };
  });

  const headers = ['Datum', 'Froster', 'Vorderes KH', 'Hinteres KH', 'Gemüse KH', 'Anmerkungen'];
  const rows = data.map(item => [
    formatDate(item.date),
    item.freezer || '',
    item.frontCooler || '',
    item.backCooler || '',
    item.vegetableCooler || '',
    item.notes || ''
  ]);

  return createCSV(headers, rows);
}

async function exportFoodTemperatures(startDate: Date, endDate: Date): Promise<string> {
  const logsRef = collection(db, 'foodTemperatures');
  const q = query(
    logsRef,
    orderBy('date'),
    where('date', '>=', Timestamp.fromDate(startDate)),
    where('date', '<=', Timestamp.fromDate(endDate))
  );

  const snapshot = await getDocs(q);
  console.log(`Found ${snapshot.docs.length} food temperatures`);
  
  const data = snapshot.docs.map(doc => {
    const logData = doc.data();
    return {
      date: logData.date.toDate(),
      soup: logData.soup,
      mainDish: logData.mainDish,
      sides: logData.sides,
      vegetarianOption: logData.vegetarianOption,
      dessert: logData.dessert,
      notes: logData.notes
    };
  });

  const headers = ['Datum', 'Suppe', 'Hauptspeise', 'Beilage', 'Vegetarisch', 'Dessert', 'Anmerkungen'];
  const rows = data.map(item => [
    formatDate(item.date),
    item.soup || '',
    item.mainDish || '',
    item.sides || '',
    item.vegetarianOption || '',
    item.dessert || '',
    item.notes || ''
  ]);

  return createCSV(headers, rows);
}

async function exportTodos(startDate: Date, endDate: Date): Promise<string> {
  const todosRef = collection(db, 'todos');
  const q = query(
    todosRef,
    orderBy('createdAt'),
    where('createdAt', '>=', Timestamp.fromDate(startDate)),
    where('createdAt', '<=', Timestamp.fromDate(endDate))
  );

  const snapshot = await getDocs(q);
  console.log(`Found ${snapshot.docs.length} todos`);
  
  const data = snapshot.docs.map(doc => {
    const todoData = doc.data();
    return {
      text: todoData.text,
      completed: todoData.completed,
      createdAt: todoData.createdAt.toDate()
    };
  });

  const headers = ['Datum', 'Aufgabe', 'Status'];
  const rows = data.map(item => [
    formatDate(item.createdAt),
    item.text || '',
    item.completed ? 'Erledigt' : 'Offen'
  ]);

  return createCSV(headers, rows);
}

function createCSV(headers: string[], rows: (string | number)[][]): string {
  if (rows.length === 0) {
    // Return headers even if there's no data
    return headers.join(';');
  }
  
  return [
    headers.join(';'),
    ...rows.map(row => row.join(';'))
  ].join('\n');
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}