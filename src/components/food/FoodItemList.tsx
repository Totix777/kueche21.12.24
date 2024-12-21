import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  temperature: number;
}

export function FoodItemList() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [newItem, setNewItem] = useState({ name: '', temperature: '' });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && newItem.temperature) {
      setFoodItems([...foodItems, {
        id: Date.now().toString(),
        name: newItem.name,
        temperature: parseFloat(newItem.temperature)
      }]);
      setNewItem({ name: '', temperature: '' });
    }
  };

  const handleRemoveItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold">Weitere Lebensmittel</h3>
      
      <form onSubmit={handleAddItem} className="flex gap-2">
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Lebensmittel Name"
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="number"
          step="0.1"
          value={newItem.temperature}
          onChange={(e) => setNewItem({ ...newItem, temperature: e.target.value })}
          placeholder="Temperatur °C"
          className="w-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      <div className="space-y-2">
        {foodItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <span>{item.name}</span>
            <div className="flex items-center gap-4">
              <span>{item.temperature}°C</span>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-gray-400 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}