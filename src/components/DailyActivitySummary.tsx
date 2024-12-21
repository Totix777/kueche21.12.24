import React from 'react';
import { ClipboardCheck, ListTodo } from 'lucide-react';
import { CleaningTask, FoodTemperatureLog, TodoItem } from '../types';

interface DailyActivitySummaryProps {
  tasks: Array<{ area: string; task: CleaningTask }>;
  temperatureLogs: FoodTemperatureLog[];
  todos: TodoItem[];
}

export function DailyActivitySummary({ tasks, todos }: DailyActivitySummaryProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedTasks = tasks.filter(
    ({ task }) => task.completed && task.completedAt && task.completedAt >= today
  );

  const todaysTodos = todos.filter(
    todo => todo.completed && todo.createdAt >= today
  );

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 dark:text-white">Tagesaktivitäten</h2>
      
      <div className="space-y-6">
        {/* Completed Tasks */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <ClipboardCheck className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold dark:text-white">Erledigte Aufgaben</h3>
          </div>
          {completedTasks.length > 0 ? (
            <ul className="space-y-2">
              {completedTasks.map(({ area, task }) => (
                <li key={task.id} className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                  <div>
                    <p className="font-medium dark:text-white">{task.task}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{area}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {task.completedAt && formatTime(task.completedAt)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {task.completedBy}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Keine erledigten Aufgaben heute</p>
          )}
        </section>

        {/* Completed Todos */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <ListTodo className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold dark:text-white">Erledigte Todos</h3>
          </div>
          {todaysTodos.length > 0 ? (
            <ul className="space-y-2">
              {todaysTodos.map((todo) => (
                <li key={todo.id} className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                  <p className="dark:text-white">{todo.text}</p>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {formatTime(todo.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Keine erledigten Todos heute</p>
          )}
        </section>
      </div>
    </div>
  );
}