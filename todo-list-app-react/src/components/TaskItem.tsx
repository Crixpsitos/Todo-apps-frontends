import React, { useState, useCallback, memo } from 'react';
import { Trash2, Edit, Check, X, Save } from 'lucide-react';
import { Task } from '../types';
import { useTasks } from '../context/TaskContext';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask, toggleTaskCompletion } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Format date to a readable string
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit', 
    minute: '2-digit'
  }).format(task.createdAt);

  // Get color based on priority
  const getPriorityColor = useCallback((priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }, []);

  // Handle toggle completion
  const handleToggleCompletion = useCallback(() => {
    toggleTaskCompletion(task.id);
  }, [task.id, toggleTaskCompletion]);

  // Handle edit mode
  const handleEditClick = useCallback(() => {
    setIsEditing(true);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority);
  }, [task]);

  // Cancel edit mode
  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  // Save edited task
  const handleSaveEdit = useCallback(() => {
    if (editTitle.trim().length >= 3 && editTitle.trim().length <= 50) {
      updateTask(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        priority: editPriority,
      });
      setIsEditing(false);
    }
  }, [task.id, editTitle, editDescription, editPriority, updateTask]);

  // Handle delete confirmation
  const handleDeleteClick = useCallback(() => {
    setShowDeleteConfirm(true);
  }, []);

  // Confirm delete
  const handleConfirmDelete = useCallback(() => {
    deleteTask(task.id);
  }, [task.id, deleteTask]);

  // Cancel delete
  const handleCancelDelete = useCallback(() => {
    setShowDeleteConfirm(false);
  }, []);

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 transform hover:shadow-lg
      ${task.completed ? 'border-l-4 border-green-500' : ''}`}>
      {isEditing ? (
        // Edit Mode
        <div className="p-4">
          <div className="mb-3">
            <label htmlFor={`edit-title-${task.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id={`edit-title-${task.id}`}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {editTitle.trim().length < 3 && (
              <p className="mt-1 text-sm text-red-500">Title must be at least 3 characters</p>
            )}
          </div>
          
          <div className="mb-3">
            <label htmlFor={`edit-description-${task.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id={`edit-description-${task.id}`}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor={`edit-priority-${task.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id={`edit-priority-${task.id}`}
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleSaveEdit}
              disabled={editTitle.trim().length < 3}
              className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Save size={16} className="mr-1" />
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="flex items-center px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              <X size={16} className="mr-1" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.title}
              </h3>
              <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
          
          {task.description && (
            <p className={`text-gray-600 text-sm mb-3 ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex justify-between items-center pt-2 border-t">
            <div>
              <button
                onClick={handleToggleCompletion}
                className={`flex items-center mr-2 px-3 py-1 rounded-md text-sm font-medium transition-colors
                  ${task.completed 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <Check size={16} className="mr-1" />
                {task.completed ? 'Completed' : 'Mark Complete'}
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleEditClick}
                className="flex items-center px-2 py-1 text-gray-500 hover:text-blue-500 transition-colors"
              >
                <Edit size={16} />
              </button>
              
              <button
                onClick={handleDeleteClick}
                className="flex items-center px-2 py-1 text-gray-500 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="mt-3 p-3 bg-red-50 rounded-md border border-red-100">
              <p className="text-sm text-red-700 mb-2">Are you sure you want to delete this task?</p>
              <div className="flex space-x-2">
                <button
                  onClick={handleConfirmDelete}
                  className="flex items-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="flex items-center px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  <X size={16} className="mr-1" />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(TaskItem);