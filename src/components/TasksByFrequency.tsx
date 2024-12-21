import React, { useState } from 'react';
import { Calendar, Clock, CalendarClock } from 'lucide-react';
import { TaskList } from './TaskList';
import { useTasks } from '../hooks/useTasks';
import { TaskFrequencyFilter } from './TaskFrequencyFilter';

export function TasksByFrequency() {
  const { areas, loading, handleTaskComplete } = useTasks();
  const [selectedFrequency, setSelectedFrequency] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all');

  const filterTasksByFrequency = (frequency: 'daily' | 'weekly' | 'monthly') => {
    return areas.flatMap(area => 
      area.tasks
        .filter(task => task.frequency === frequency)
        .map(task => ({ area, task }))
    );
  };

  const getFilteredTasks = () => {
    if (selectedFrequency === 'all') {
      return areas.flatMap(area => 
        area.tasks.map(task => ({ area, task }))
      );
    }
    return filterTasksByFrequency(selectedFrequency);
  };

  if (loading) {
    return <div>Lädt...</div>;
  }

  const filteredTasks = getFilteredTasks();

  return (
    <div className="space-y-8">
      <TaskFrequencyFilter
        selectedFrequency={selectedFrequency}
        onFrequencyChange={setSelectedFrequency}
      />
      
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          {selectedFrequency === 'daily' && <Clock className="w-6 h-6 text-red-600" />}
          {selectedFrequency === 'weekly' && <Calendar className="w-6 h-6 text-red-600" />}
          {selectedFrequency === 'monthly' && <CalendarClock className="w-6 h-6 text-red-600" />}
          <h2 className="text-xl font-bold dark:text-white">
            {selectedFrequency === 'all' ? 'Alle Aufgaben' :
             selectedFrequency === 'daily' ? 'Tägliche Aufgaben' :
             selectedFrequency === 'weekly' ? 'Wöchentliche Aufgaben' :
             'Monatliche Aufgaben'}
          </h2>
        </div>

        <div className="space-y-4">
          {filteredTasks.map(({ area, task }) => (
            <div key={task.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{area.name}</div>
              <TaskList
                tasks={[task]}
                onTaskComplete={(taskId) => handleTaskComplete(area.id, taskId)}
              />
            </div>
          ))}
          {filteredTasks.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 italic">Keine Aufgaben in dieser Kategorie</p>
          )}
        </div>
      </section>
    </div>
  );
}