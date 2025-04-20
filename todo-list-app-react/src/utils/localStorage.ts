import { Task } from '../types';

export const saveTasks = (tasks: Task[]): void => {
  try {
    // Convert Date objects to strings for JSON serialization
    const tasksToSave = tasks.map(task => ({
      ...task,
      createdAt: task.createdAt.toISOString()
    }));
    
    localStorage.setItem('tasks', JSON.stringify(tasksToSave));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const loadTasks = (): Task[] => {
  try {
    const tasksJson = localStorage.getItem('tasks');
    
    if (!tasksJson) {
      return [];
    }
    
    // Convert string dates back to Date objects
    return JSON.parse(tasksJson).map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt)
    }));
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};