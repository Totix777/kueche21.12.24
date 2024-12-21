import React from 'react';
import { TemperatureLog } from '../../types';

interface TemperatureHistoryProps {
  logs: TemperatureLog[];
}

export function TemperatureHistory({ logs }: TemperatureHistoryProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Temperaturverlauf</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Datum</th>
              <th className="text-right py-2">Froster</th>
              <th className="text-right py-2">Vorderes KH</th>
              <th className="text-right py-2">Hinteres KH</th>
              <th className="text-right py-2">Gemüse KH</th>
              <th className="text-left py-2">Anmerkungen</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b">
                <td className="py-2">{formatDate(log.date)}</td>
                <td className="text-right py-2">{log.freezer}°C</td>
                <td className="text-right py-2">{log.frontCooler}°C</td>
                <td className="text-right py-2">{log.backCooler}°C</td>
                <td className="text-right py-2">{log.vegetableCooler}°C</td>
                <td className="py-2">{log.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            Noch keine Temperaturaufzeichnungen vorhanden
          </p>
        )}
      </div>
    </div>
  );
}