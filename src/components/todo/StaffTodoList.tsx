import React, { useState } from 'react';
import { ListTodo, Plus, X } from 'lucide-react';
import { useTodos } from '../../hooks/useTodos';

export function StaffTodoList() {
  const [newTodo, setNewTodo] = useState('');
  const { todos, loading, addTodo, toggleTodo, removeTodo } = useTodos();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      await addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  if (loading) {
    return <div>Lädt...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <ListTodo className="w-6 h-6 text-red-600" />
        <h2 className="text-xl font-bold">Mitarbeiter Todo-Liste</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Neue Aufgabe hinzufügen..."
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <label className="flex items-center space-x-2 flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="rounded text-red-600 focus:ring-red-500"
              />
              <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                {todo.text}
              </span>
            </label>
            <button
              onClick={() => removeTodo(todo.id)}
              className="text-gray-400 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}