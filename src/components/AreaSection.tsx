import React from 'react';
import { TaskList } from './TaskList';
import { Area } from '../types';

interface AreaSectionProps {
  area: Area;
  onTaskComplete: (taskId: string) => void;
}

export function AreaSection({ area, onTaskComplete }: AreaSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{area.name}</h2>
      <TaskList tasks={area.tasks} onTaskComplete={onTaskComplete} />
    </div>
  );
}