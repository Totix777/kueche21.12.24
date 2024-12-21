import { useState, useEffect } from 'react';
import { TodoItem } from '../types';
import { addTodo, getTodos, updateTodo, deleteTodo } from '../lib/todos';

export function useTodos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (text: string) => {
    try {
      await addTodo(text);
      await loadTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await updateTodo(id, !todo.completed);
        await loadTodos();
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleRemoveTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      await loadTodos();
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  return { 
    todos, 
    loading, 
    addTodo: handleAddTodo, 
    toggleTodo: handleToggleTodo, 
    removeTodo: handleRemoveTodo 
  };
}