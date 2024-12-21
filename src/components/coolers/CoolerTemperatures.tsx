import React from 'react';
import { Thermometer } from 'lucide-react';
import { TemperatureInput } from './TemperatureInput';
import { TemperatureHistory } from './TemperatureHistory';
import { useCoolerTemperatures } from '../../hooks/useCoolerTemperatures';

export function CoolerTemperatures() {
  const { logs, loading, addTemperatureLog } = useCoolerTemperatures();

  if (loading) {
    return <div>Lädt...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Thermometer className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold">Temperaturkontrolle</h2>
        </div>
        <TemperatureInput onSubmit={addTemperatureLog} />
      </div>
      <TemperatureHistory logs={logs} />
    </div>
  );
}