import React from 'react';
import { FoodTemperatureLog } from '../../types';

interface FoodTemperatureHistoryProps {
  logs: FoodTemperatureLog[];
}

export function FoodTemperatureHistory({ logs }: FoodTemperatureHistoryProps) {
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
              <th className="text-right py-2">Suppe</th>
              <th className="text-right py-2">Hauptspeise</th>
              <th className="text-right py-2">Beilage</th>
              <th className="text-right py-2">Vegetarisch</th>
              <th className="text-right py-2">Dessert</th>
              <th className="text-left py-2">Anmerkungen</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <React.Fragment key={log.id}>
                <tr className="border-b">
                  <td className="py-2">{formatDate(log.date)}</td>
                  <td className="text-right py-2">{log.soup}°C</td>
                  <td className="text-right py-2">{log.mainDish}°C</td>
                  <td className="text-right py-2">{log.sides}°C</td>
                  <td className="text-right py-2">{log.vegetarianOption}°C</td>
                  <td className="text-right py-2">{log.dessert}°C</td>
                  <td className="py-2">{log.notes}</td>
                </tr>
                {log.additionalItems && log.additionalItems.length > 0 && (
                  <tr className="bg-gray-50">
                    <td colSpan={7} className="py-2 px-4">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Weitere Lebensmittel:</span>
                        {log.additionalItems.map((item, index) => (
                          <span key={item.id} className="ml-2">
                            {item.name}: {item.temperature}°C
                            {index < log.additionalItems!.length - 1 ? ',' : ''}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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