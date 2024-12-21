import { collection, doc, getDocs, updateDoc, addDoc, Timestamp, query, orderBy, where } from 'firebase/firestore';
import { db } from './firebase';
import { Area, CleaningTask } from '../types';

const COLLECTION_NAME = 'tasks';

export async function fetchTasks(): Promise<Area[]> {
  try {
    const tasksQuery = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(tasksQuery);
    
    // Use a Map to prevent duplicates, keyed by areaId
    const tasksByArea = new Map<string, Area>();
    
    // Use a Set to track unique task IDs within each area
    const taskIds = new Set<string>();
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const areaId = data.areaId;
      const taskId = doc.id;
      
      // Skip if we've already seen this task
      if (taskIds.has(taskId)) {
        return;
      }
      taskIds.add(taskId);
      
      if (!tasksByArea.has(areaId)) {
        tasksByArea.set(areaId, {
          id: areaId,
          name: data.areaName,
          tasks: []
        });
      }
      
      const area = tasksByArea.get(areaId)!;
      area.tasks.push({
        id: taskId,
        area: data.areaName,
        task: data.task,
        frequency: data.frequency,
        completed: data.completed || false,
        completedBy: data.completedBy,
        completedAt: data.completedAt ? data.completedAt.toDate() : undefined
      });
    });
    
    return Array.from(tasksByArea.values());
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export async function updateTask(areaId: string, taskId: string, updates: { completed: boolean; completedBy: string }) {
  try {
    const taskRef = doc(db, COLLECTION_NAME, taskId);
    await updateDoc(taskRef, {
      ...updates,
      completedAt: updates.completed ? Timestamp.now() : null
    });
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export async function initializeAreasIfNeeded(initialAreas: Area[]) {
  try {
    // Check if tasks already exist
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    
    if (snapshot.empty) {
      console.log('Initializing tasks...');
      const batch = [];
      
      // Create a Set to track unique task combinations
      const uniqueTasks = new Set<string>();
      
      for (const area of initialAreas) {
        for (const task of area.tasks) {
          // Create a unique key for this task
          const taskKey = `${area.id}-${task.task}`;
          
          // Skip if we've already added this task
          if (uniqueTasks.has(taskKey)) {
            continue;
          }
          uniqueTasks.add(taskKey);
          
          batch.push(addDoc(collection(db, COLLECTION_NAME), {
            areaId: area.id,
            areaName: area.name,
            task: task.task,
            frequency: task.frequency,
            completed: false,
            createdAt: Timestamp.now()
          }));
        }
      }
      
      await Promise.all(batch);
      console.log('Tasks initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing tasks:', error);
    throw error;
  }
}