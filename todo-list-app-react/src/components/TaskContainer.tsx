import React from 'react';
import { TaskProvider } from '../context/TaskContext';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { ClipboardList } from 'lucide-react';

const TaskContainer: React.FC = () => {
  return (
    <TaskProvider>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <ClipboardList size={32} className="text-blue-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Manejador de tareas</h1>
          </div>
          <p className="text-gray-600">Hecho por su servidor crixpsitos</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <TaskForm />
          </div>
          
          <div className="md:col-span-2">
            <TaskList />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
};

export default TaskContainer;