import React from 'react';
import { WeekCalendar } from './calendar/WeekCalendar';
import { StaffTodoList } from './todo/StaffTodoList';
import { DailyActivitySummary } from './DailyActivitySummary';
import { DailyCoolerTemperatures } from './coolers/DailyCoolerTemperatures';
import { DailyFoodTemperatures } from './food/DailyFoodTemperatures';
import { useFoodTemperatures } from '../hooks/useFoodTemperatures';
import { useTasks } from '../hooks/useTasks';
import { useTodos } from '../hooks/useTodos';

export function Home() {
  const { logs: temperatureLogs } = useFoodTemperatures();
  const { areas } = useTasks();
  const { todos } = useTodos();

  const allTasks = areas.flatMap(area =>
    area.tasks.map(task => ({ area: area.name, task }))
  );

  return (
    <div className="space-y-6">
      {/* Calendar at the top */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <WeekCalendar />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column with activity summary */}
        <div className="lg:col-span-2">
          <DailyActivitySummary
            tasks={allTasks}
            todos={todos}
          />
        </div>

        {/* Right column with temperature controls and todos */}
        <div className="space-y-6">
          <DailyCoolerTemperatures />
          <DailyFoodTemperatures />
          <StaffTodoList />
        </div>
      </div>
    </div>
  );
}