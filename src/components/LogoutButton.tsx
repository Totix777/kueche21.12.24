import React from 'react';
import { LogOut } from 'lucide-react';
import { logout } from '../lib/auth';

export function LogoutButton() {
  const handleLogout = () => {
    logout();
    window.location.reload(); // Reload to show login screen
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 px-4 py-2 bg-white text-red-600 rounded-md hover:bg-gray-100"
      title="Abmelden"
    >
      <LogOut className="w-5 h-5" />
      <span>Abmelden</span>
    </button>
  );
}