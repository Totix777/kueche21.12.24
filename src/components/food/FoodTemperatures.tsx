import React from 'react';
import { Thermometer } from 'lucide-react';
import { FoodTemperatureInput } from './FoodTemperatureInput';
import { FoodTemperatureHistory } from './FoodTemperatureHistory';
import { useFoodTemperatures } from '../../hooks/useFoodTemperatures';

export function FoodTemperatures() {
  const { logs, addTemperatureLog } = useFoodTemperatures();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Thermometer className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold">Lebensmittel Temperaturkontrolle</h2>
        </div>
        <FoodTemperatureInput onSubmit={addTemperatureLog} />
      </div>
      <FoodTemperatureHistory logs={logs} />
    </div>
  );
}