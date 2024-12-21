import React from 'react';
import { Thermometer } from 'lucide-react';
import { useCoolerTemperatures } from '../../hooks/useCoolerTemperatures';

export function DailyCoolerTemperatures() {
  const { logs, loading } = useCoolerTemperatures();

  // Get today's logs
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaysLogs = logs.filter(log => log.date >= today);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return <div>Lädt...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Thermometer className="w-6 h-6 text-red-600" />
        <h2 className="text-xl font-bold dark:text-white">Kühlhäuser Temperaturen</h2>
      </div>
      
      {todaysLogs.length > 0 ? (
        <div className="space-y-4">
          {todaysLogs.map((log) => (
            <div key={log.id} className="border-b dark:border-gray-700 pb-4 last:pb-0 last:border-0">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {formatTime(log.date)}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm dark:text-white">
                    Froster: <span className="font-medium">{log.freezer}°C</span>
                  </p>
                  <p className="text-sm dark:text-white">
                    Vorderes KH: <span className="font-medium">{log.frontCooler}°C</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm dark:text-white">
                    Hinteres KH: <span className="font-medium">{log.backCooler}°C</span>
                  </p>
                  <p className="text-sm dark:text-white">
                    Gemüse KH: <span className="font-medium">{log.vegetableCooler}°C</span>
                  </p>
                </div>
              </div>
              {log.notes && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{log.notes}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Heute noch keine Temperaturaufzeichnungen
        </p>
      )}
    </div>
  );
}