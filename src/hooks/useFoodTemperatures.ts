import { useState, useEffect } from 'react';
import { FoodTemperatureLog } from '../types';
import { addFoodTemperatureLog, getFoodTemperatureLogs } from '../lib/foodTemperatures';

export function useFoodTemperatures() {
  const [logs, setLogs] = useState<FoodTemperatureLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const fetchedLogs = await getFoodTemperatureLogs();
      setLogs(fetchedLogs);
    } catch (error) {
      console.error('Error loading food temperature logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTemperatureLog = async (temperatures: Omit<FoodTemperatureLog, 'id' | 'date'>) => {
    try {
      await addFoodTemperatureLog(temperatures);
      await loadLogs(); // Reload logs after adding new one
    } catch (error) {
      console.error('Error adding food temperature log:', error);
    }
  };

  return { logs, loading, addTemperatureLog };
}