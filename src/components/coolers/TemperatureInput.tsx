import React, { useState } from 'react';
import { TemperatureLog } from '../../types';

const COOLER_LIMITS = {
  freezer: { min: -22, max: -18, name: 'Froster' },
  frontCooler: { min: 2, max: 7, name: 'Vorderes Kühlhaus' },
  backCooler: { min: 2, max: 7, name: 'Hinteres Kühlhaus' },
  vegetableCooler: { min: 4, max: 8, name: 'Gemüse-Kühlhaus' },
};

interface TemperatureInputProps {
  onSubmit: (temperatures: Omit<TemperatureLog, 'id' | 'date'>) => void;
}

export function TemperatureInput({ onSubmit }: TemperatureInputProps) {
  const [temperatures, setTemperatures] = useState({
    freezer: '',
    frontCooler: '',
    backCooler: '',
    vegetableCooler: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const values = {
      freezer: parseFloat(temperatures.freezer),
      frontCooler: parseFloat(temperatures.frontCooler),
      backCooler: parseFloat(temperatures.backCooler),
      vegetableCooler: parseFloat(temperatures.vegetableCooler),
      notes: temperatures.notes,
    };

    onSubmit(values);
    setTemperatures({
      freezer: '',
      frontCooler: '',
      backCooler: '',
      vegetableCooler: '',
      notes: '',
    });
  };

  const isTemperatureWarning = (value: string, limits: { min: number; max: number }) => {
    const temp = parseFloat(value);
    return temp < limits.min || temp > limits.max;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(COOLER_LIMITS).map(([key, limits]) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {limits.name} ({limits.min}°C bis {limits.max}°C)
            </label>
            <input
              type="number"
              step="0.1"
              value={temperatures[key as keyof typeof temperatures]}
              onChange={(e) => setTemperatures({ ...temperatures, [key]: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                temperatures[key as keyof typeof temperatures] && 
                isTemperatureWarning(temperatures[key as keyof typeof temperatures], limits)
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
              }`}
              required
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Anmerkungen
        </label>
        <textarea
          value={temperatures.notes}
          onChange={(e) => setTemperatures({ ...temperatures, notes: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Temperaturen speichern
      </button>
    </form>
  );
}