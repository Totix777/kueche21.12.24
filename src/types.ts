export interface FoodTemperatureLog {
  id: string;
  date: Date;
  soup: number;
  mainDish: number;
  sides: number;
  vegetarianOption: number;
  dessert: number;
  notes?: string;
  additionalItems?: Array<{
    id: string;
    name: string;
    temperature: number;
  }>;
}

export interface Area {
  id: string;
  name: string;
  tasks: CleaningTask[];
}

export interface CleaningTask {
  id: string;
  area: string;
  task: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  completed: boolean;
  completedBy?: string;
  completedAt?: Date;
}

export interface WeeklyTask {
  id: string;
  date: Date;
  text: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}