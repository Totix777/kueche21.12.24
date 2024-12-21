import { Area } from '../types';

// Group tasks by frequency for better organization
const dailyTasks = {
  'food-cart-room': [
    { id: 'cart-eg', task: 'Reinigung Speisewagen EG (Am Schloßpark)' },
    { id: 'cart-1og', task: 'Reinigung Speisewagen 1.OG (Am Ebertpark)' },
    { id: 'cart-2og', task: 'Reinigung Speisewagen 2.OG (Am Rheinufer)' },
    { id: 'cart-3og', task: 'Reinigung Speisewagen 3.OG (An den Seen)' },
    { id: 'floor-cart-room', task: 'Bodenreinigung' }
  ],
  'dishwashing': [
    { id: 'dishwasher', task: 'Spülmaschine reinigen' },
    { id: 'sink', task: 'Spülbecken säubern' },
    { id: 'floor-dishwashing', task: 'Bodenreinigung' }
  ],
  'main-kitchen': [
    { id: 'floor-main', task: 'Bodenreinigung' },
    { id: 'surfaces', task: 'Oberflächen reinigen' },
    { id: 'combi-steamer', task: 'Kombi-Dämpfer (klein und groß) reinigen' }
  ]
};

const weeklyTasks = {
  'dry-storage': [
    { id: 'floor-storage', task: 'Bodenreinigung' }
  ]
};

const monthlyTasks = {
  'main-kitchen': [
    { id: 'fridge', task: 'Kühlschrank (interne Reinigung)' }
  ],
  'dry-storage': [
    { id: 'shelves', task: 'Regalreinigung' }
  ],
  'cold-storage': [
    { id: 'vegetable-cooler', task: 'Gemüse-Kühlhaus Reinigung' },
    { id: 'front-cooler', task: 'Vorderes Kühlhaus Reinigung' },
    { id: 'back-cooler', task: 'Hinteres Kühlhaus Reinigung' },
    { id: 'freezer', task: 'Froster Reinigung' }
  ],
  'supplies': [
    { id: 'supplies-check', task: 'Kontrolle und Reinigung' }
  ]
};

// Area definitions with names
const areaNames = {
  'food-cart-room': 'Speisenwägenraum',
  'dishwashing': 'Spülküche',
  'main-kitchen': 'Hauptküche',
  'dry-storage': 'Trockenlager',
  'cold-storage': 'Kühlhaus',
  'supplies': 'Küchenbedarf-Lager'
};

// Create the areas array with organized tasks
export const areas: Area[] = Object.entries(areaNames).map(([id, name]) => ({
  id,
  name,
  tasks: [
    ...(dailyTasks[id as keyof typeof dailyTasks] || []).map(task => ({
      ...task,
      area: name,
      frequency: 'daily' as const,
      completed: false
    })),
    ...(weeklyTasks[id as keyof typeof weeklyTasks] || []).map(task => ({
      ...task,
      area: name,
      frequency: 'weekly' as const,
      completed: false
    })),
    ...(monthlyTasks[id as keyof typeof monthlyTasks] || []).map(task => ({
      ...task,
      area: name,
      frequency: 'monthly' as const,
      completed: false
    }))
  ]
}));