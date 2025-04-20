export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

export type SortOption = 'date' | 'status' | 'priority';

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updatedTask: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  sortTasks: (sortBy: SortOption) => void;
}

export interface FormErrors {
  title?: string;
  description?: string;
}