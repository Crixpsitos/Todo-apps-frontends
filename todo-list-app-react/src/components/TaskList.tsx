import React, { useCallback, memo } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { SortOption } from '../types';
import { SortAsc as SortAscending, Check, Activity } from 'lucide-react';

const TaskList: React.FC = () => {
  const { tasks, sortTasks } = useTasks();

  // Handle sort change
  const handleSortChange = useCallback((sortOption: SortOption) => {
    sortTasks(sortOption);
  }, [sortTasks]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Tasks ({tasks.length})</h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => handleSortChange('date')}
            className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
          >
            <SortAscending size={16} className="mr-1" />
            Date
          </button>
          
          <button
            onClick={() => handleSortChange('status')}
            className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
          >
            <Check size={16} className="mr-1" />
            Status
          </button>
          
          <button
            onClick={() => handleSortChange('priority')}
            className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
          >
            <Activity size={16} className="mr-1" />
            Priority
          </button>
        </div>
      </div>
      
      {tasks.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300 text-center">
          <p className="text-gray-500">No tasks yet. Add a new task to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(TaskList);