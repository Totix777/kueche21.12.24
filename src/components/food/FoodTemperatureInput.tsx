import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { FoodTemperatureLog } from '../../types';

const FOOD_ITEMS = {
  soup: { min: 65, max: 85, name: 'Suppe' },
  mainDish: { min: 65, max: 85, name: 'Hauptspeise' },
  sides: { min: 65, max: 85, name: 'Beilage' },
  vegetarianOption: { min: 65, max: 85, name: 'Vegetarisches Gericht' },
  dessert: { min: 4, max: 7, name: 'Dessert' },
};

interface FoodTemperatureInputProps {
  onSubmit: (temperatures: Omit<FoodTemperatureLog, 'id' | 'date'>) => void;
}

export function FoodTemperatureInput({ onSubmit }: FoodTemperatureInputProps) {
  const [temperatures, setTemperatures] = useState({
    soup: '',
    mainDish: '',
    sides: '',
    vegetarianOption: '',
    dessert: '',
    notes: '',
  });

  const [additionalItems, setAdditionalItems] = useState<Array<{id: string, name: string, temperature: string}>>([]);
  const [newItem, setNewItem] = useState({ name: '', temperature: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const values = {
      soup: parseFloat(temperatures.soup),
      mainDish: parseFloat(temperatures.mainDish),
      sides: parseFloat(temperatures.sides),
      vegetarianOption: parseFloat(temperatures.vegetarianOption),
      dessert: parseFloat(temperatures.dessert),
      notes: temperatures.notes,
      additionalItems: additionalItems.map(item => ({
        id: item.id,
        name: item.name,
        temperature: parseFloat(item.temperature)
      }))
    };

    onSubmit(values);
    setTemperatures({
      soup: '',
      mainDish: '',
      sides: '',
      vegetarianOption: '',
      dessert: '',
      notes: '',
    });
    setAdditionalItems([]);
  };

  const addAdditionalItem = () => {
    if (newItem.name && newItem.temperature) {
      setAdditionalItems([
        ...additionalItems,
        { ...newItem, id: Date.now().toString() }
      ]);
      setNewItem({ name: '', temperature: '' });
    }
  };

  const removeAdditionalItem = (id: string) => {
    setAdditionalItems(additionalItems.filter(item => item.id !== id));
  };

  const isTemperatureWarning = (value: string, limits: { min: number; max: number }) => {
    const temp = parseFloat(value);
    return temp < limits.min || temp > limits.max;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(FOOD_ITEMS).map(([key, limits]) => (
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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Weitere Lebensmittel</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Name"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="number"
              step="0.1"
              value={newItem.temperature}
              onChange={(e) => setNewItem({ ...newItem, temperature: e.target.value })}
              placeholder="°C"
              className="w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="button"
              onClick={addAdditionalItem}
              className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {additionalItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span>{item.name}</span>
            <div className="flex items-center gap-4">
              <span>{item.temperature}°C</span>
              <button
                type="button"
                onClick={() => removeAdditionalItem(item.id)}
                className="text-gray-400 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
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