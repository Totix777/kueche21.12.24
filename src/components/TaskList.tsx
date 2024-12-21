import React from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { CleaningTask } from '../types';

interface TaskListProps {
  tasks: CleaningTask[];
  onTaskComplete: (taskId: string) => void;
}

export function TaskList({ tasks, onTaskComplete }: TaskListProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onTaskComplete(task.id)}
              className="text-gray-600 hover:text-red-600"
            >
              {task.completed ? (
                <CheckSquare className="w-6 h-6 text-green-600" />
              ) : (
                <Square className="w-6 h-6" />
              )}
            </button>
            <div>
              <h3 className="font-medium">{task.task}</h3>
              <p className="text-sm text-gray-500">
                Häufigkeit: {task.frequency === 'daily' ? 'Täglich' : 
                           task.frequency === 'weekly' ? 'Wöchentlich' : 'Monatlich'}
              </p>
              {task.completed && task.completedBy && task.completedAt && (
                <p className="text-sm text-gray-500">
                  Erledigt von {task.completedBy} am {formatDate(task.completedAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}