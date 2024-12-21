import React, { useState } from 'react';
import { formatDate } from '../../utils/dateUtils';

interface TaskFormProps {
  selectedDate: Date | null;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

export function TaskForm({ selectedDate, onSubmit, onCancel }: TaskFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
    }
  };

  if (!selectedDate) return null;

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Neue Aufgabe für {formatDate(selectedDate)}
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Aufgabenbeschreibung..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          rows={3}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          disabled={!text.trim()}
        >
          Hinzufügen
        </button>
      </div>
    </form>
  );
}