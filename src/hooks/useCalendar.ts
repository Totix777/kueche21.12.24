import { useState, useEffect } from 'react';
import { WeeklyTask } from '../types';
import { addCalendarTask, getCalendarTasks } from '../lib/calendar';

export function useCalendar() {
  const [tasks, setTasks] = useState<WeeklyTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await getCalendarTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error loading calendar tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (date: Date, text: string) => {
    try {
      await addCalendarTask(date, text);
      await loadTasks();
    } catch (error) {
      console.error('Error adding calendar task:', error);
    }
  };

  return { tasks, loading, addTask: handleAddTask };
}