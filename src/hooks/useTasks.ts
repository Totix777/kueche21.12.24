import { useState, useEffect } from 'react';
import { fetchTasks, updateTask } from '../lib/tasks';
import { Area } from '../types';

export function useTasks() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const tasks = await fetchTasks();
      setAreas(tasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskComplete = async (areaId: string, taskId: string) => {
    try {
      const username = localStorage.getItem('username') || 'Unknown';
      const area = areas.find(a => a.id === areaId);
      const task = area?.tasks.find(t => t.id === taskId);
      
      if (!task) return;

      const completed = !task.completed;

      await updateTask(areaId, taskId, {
        completed,
        completedBy: username
      });

      await loadTasks(); // Reload tasks to get updated state
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return { areas, loading, handleTaskComplete };
}