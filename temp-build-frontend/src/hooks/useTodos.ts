'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Todo, FilterOption } from '@/types';
import {
  getTodos,
  saveTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  getSettings,
  setFilter,
} from '@/lib/storage';
import { generateId } from '@/lib/utils';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilterState] = useState<FilterOption>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load todos on mount
  useEffect(() => {
    const loadedTodos = getTodos();
    const settings = getSettings();
    setTodos(loadedTodos);
    setFilterState(settings.filter);
    setIsLoading(false);
  }, []);

  // Save filter when changed
  const handleSetFilter = useCallback((newFilter: FilterOption) => {
    setFilterState(newFilter);
    setFilter(newFilter);
  }, []);

  // Add todo
  const add = useCallback((title: string, columnId: Todo['columnId'] = 'todo') => {
    const newTodo: Todo = {
      id: generateId(),
      title,
      completed: false,
      columnId,
      priority: 1, // Medium
      order: Date.now(), // High initial order
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: '', // Will be set by storage or context
    };
    addTodo(newTodo);
    setTodos((prev) => [...prev, newTodo]);
  }, []);

  // Update todo
  const update = useCallback((id: string, updates: Partial<Todo>) => {
    updateTodo(id, updates);
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  }, []);

  // Delete todo
  const remove = useCallback((id: string) => {
    deleteTodo(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // Toggle todo completion
  const toggle = useCallback((id: string) => {
    toggleTodo(id);
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Filtered todos
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Stats
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter: handleSetFilter,
    isLoading,
    stats,
    add,
    update,
    remove,
    toggle,
  };
}
