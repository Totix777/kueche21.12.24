import React, { useState } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import { getWeekDates } from '../../utils/dateUtils';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { TaskForm } from './TaskForm';

export function WeekCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { tasks, loading, addTask } = useCalendar();

  const weekDates = getWeekDates(currentDate);

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleAddTask = async (text: string) => {
    if (selectedDate) {
      await addTask(selectedDate, text);
      setSelectedDate(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Lädt Kalender...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <CalendarHeader
        weekDates={weekDates}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
      />
      <CalendarGrid
        weekDates={weekDates}
        tasks={tasks}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
      <TaskForm
        selectedDate={selectedDate}
        onSubmit={handleAddTask}
        onCancel={() => setSelectedDate(null)}
      />
    </div>
  );
}