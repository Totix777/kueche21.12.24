import React from 'react';
import { Home, ClipboardList, Thermometer, Apple, ShoppingCart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ExportButton } from './ExportButton';
import { LogoutButton } from './LogoutButton';
import { UserDisplay } from './UserDisplay';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Start', icon: Home },
    { id: 'tasks', label: 'Aufgaben', icon: ClipboardList },
    { id: 'coolers', label: 'Kühlhäuser', icon: Thermometer },
    { id: 'food', label: 'Lebensmittel', icon: Apple },
    { id: 'orders', label: 'Bestellung', icon: ShoppingCart },
  ];

  return (
    <nav className="bg-red-700 dark:bg-red-900 text-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center space-x-2 px-6 py-3 transition-colors ${
                    currentSection === item.id
                      ? 'bg-red-800 dark:bg-red-950'
                      : 'hover:bg-red-600 dark:hover:bg-red-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center space-x-4 px-4">
            <UserDisplay />
            <ExportButton />
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}