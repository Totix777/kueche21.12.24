import React from 'react';
import { WeeklyTask } from '../../types';

interface CalendarGridProps {
  weekDates: Date[];
  tasks: WeeklyTask[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export function CalendarGrid({ weekDates, tasks, selectedDate, onDateSelect }: CalendarGridProps) {
  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => 
      task.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
        <div key={day} className="text-center font-semibold text-sm text-gray-600 py-2">
          {day}
        </div>
      ))}
      {weekDates.map((date) => (
        <div
          key={date.toISOString()}
          onClick={() => onDateSelect(date)}
          className={`min-h-[100px] p-2 border rounded-lg cursor-pointer transition-colors ${
            selectedDate?.toDateString() === date.toDateString()
              ? 'border-red-500 bg-red-50'
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="text-right text-sm text-gray-600">{date.getDate()}</div>
          <div className="mt-1 space-y-1">
            {getTasksForDate(date).map((task) => (
              <div 
                key={task.id} 
                className="text-sm p-1 bg-red-100 rounded break-words"
              >
                {task.text}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}