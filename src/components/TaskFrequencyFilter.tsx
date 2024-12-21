import React from 'react';
import { Clock, Calendar, CalendarClock } from 'lucide-react';

interface TaskFrequencyFilterProps {
  selectedFrequency: 'all' | 'daily' | 'weekly' | 'monthly';
  onFrequencyChange: (frequency: 'all' | 'daily' | 'weekly' | 'monthly') => void;
}

export function TaskFrequencyFilter({ selectedFrequency, onFrequencyChange }: TaskFrequencyFilterProps) {
  const frequencies = [
    { id: 'all', label: 'Alle', icon: null },
    { id: 'daily', label: 'Täglich', icon: Clock },
    { id: 'weekly', label: 'Wöchentlich', icon: Calendar },
    { id: 'monthly', label: 'Monatlich', icon: CalendarClock }
  ] as const;

  return (
    <div className="flex space-x-2 mb-6">
      {frequencies.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onFrequencyChange(id as typeof selectedFrequency)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            selectedFrequency === id
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {Icon && <Icon className="w-4 h-4" />}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}