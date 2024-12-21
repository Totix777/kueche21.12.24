import { useState, useEffect } from 'react';
import { TemperatureLog } from '../types';
import { addTemperatureLog, getTemperatureLogs } from '../lib/coolerTemperatures';

export function useCoolerTemperatures() {
  const [logs, setLogs] = useState<TemperatureLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const fetchedLogs = await getTemperatureLogs();
      setLogs(fetchedLogs);
    } catch (error) {
      console.error('Error loading temperature logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLog = async (temperatures: Omit<TemperatureLog, 'id' | 'date'>) => {
    try {
      await addTemperatureLog(temperatures);
      await loadLogs();
    } catch (error) {
      console.error('Error adding temperature log:', error);
    }
  };

  return { logs, loading, addTemperatureLog: handleAddLog };
}