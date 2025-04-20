import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskContextType, SortOption } from '../types';
import { loadTasks, saveTasks } from '../utils/localStorage';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('date');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Add a new task
  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);

  // Update an existing task
  const updateTask = useCallback((id: string, updatedTask: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  }, []);

  // Delete a task
  const deleteTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  // Toggle task completion status
  const toggleTaskCompletion = useCallback((id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  // Sort tasks based on the specified criteria
  const sortTasks = useCallback((sortOption: SortOption) => {
    setSortBy(sortOption);
  }, []);

  // Memoize the sorted tasks to prevent unnecessary re-renders
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else if (sortBy === 'status') {
        return Number(a.completed) - Number(b.completed);
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });
  }, [tasks, sortBy]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    tasks: sortedTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    sortTasks
  }), [sortedTasks, addTask, updateTask, deleteTask, toggleTaskCompletion, sortTasks]);

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};