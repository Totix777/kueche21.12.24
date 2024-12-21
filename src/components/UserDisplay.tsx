import React from 'react';
import { User } from 'lucide-react';

export function UserDisplay() {
  const username = localStorage.getItem('username');

  return (
    <div className="flex items-center space-x-2 px-4 py-2 bg-white text-red-600 rounded-md">
      <User className="w-5 h-5" />
      <span>{username}</span>
    </div>
  );
}