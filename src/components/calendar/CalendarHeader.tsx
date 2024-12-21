import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

interface CalendarHeaderProps {
  weekDates: Date[];
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

export function CalendarHeader({ weekDates, onPrevWeek, onNextWeek }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <CalendarIcon className="w-6 h-6 text-red-600" />
        <h2 className="text-xl font-bold">Wochenkalender</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={onPrevWeek} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-medium">
          {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
        </span>
        <button 
          onClick={onNextWeek} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}