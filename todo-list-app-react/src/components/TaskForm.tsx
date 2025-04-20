import React, { useState, useCallback, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { FormErrors } from '../types';

// Prop type for the TaskForm component
interface TaskFormProps {
  onSuccess?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSuccess }) => {
  const { addTask } = useTasks();
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isTouched, setIsTouched] = useState({
    title: false,
    description: false
  });

  // Validate form fields
  const validateField = useCallback((field: 'title' | 'description', value: string) => {
    if (field === 'title') {
      if (!value.trim()) {
        return 'Title is required';
      } else if (value.trim().length < 3) {
        return 'Title must be at least 3 characters';
      } else if (value.trim().length > 50) {
        return 'Title must be less than 50 characters';
      }
    } else if (field === 'description') {
      if (value.trim().length > 200) {
        return 'Description must be less than 200 characters';
      }
    }
    return undefined;
  }, []);

  // Handle input changes
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'title') {
      setTitle(value);
      setIsTouched(prev => ({ ...prev, title: true }));
    } else if (name === 'description') {
      setDescription(value);
      setIsTouched(prev => ({ ...prev, description: true }));
    } else if (name === 'priority') {
      setPriority(value as 'low' | 'medium' | 'high');
    }
    
    // Validate the field
    if (name === 'title' || name === 'description') {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name as 'title' | 'description', value)
      }));
    }
  }, [validateField]);

  // Check if form is valid
  const isFormValid = useMemo(() => {
    const titleError = validateField('title', title);
    const descriptionError = validateField('description', description);
    return !titleError && !descriptionError;
  }, [title, description, validateField]);

  // Handle form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Set all fields as touched for validation
    setIsTouched({ title: true, description: true });
    
    // Final validation before submission
    const titleError = validateField('title', title);
    const descriptionError = validateField('description', description);
    
    const formErrors: FormErrors = {};
    if (titleError) formErrors.title = titleError;
    if (descriptionError) formErrors.description = descriptionError;
    
    setErrors(formErrors);
    
    // If no errors, submit the form
    if (isFormValid) {
      addTask({
        title: title.trim(),
        description: description.trim() || undefined,
        completed: false,
        priority
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setIsTouched({ title: false, description: false });
      setErrors({});
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [title, description, priority, validateField, isFormValid, addTask, onSuccess]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Task</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${errors.title && isTouched.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Meta su titulo aquí"
          />
          {errors.title && isTouched.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {title.length}/50 characters
          </p>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripcion (optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${errors.description && isTouched.description ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Meta su description aquí"
          />
          {errors.description && isTouched.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {description.length}/200 characters
          </p>
        </div>
        
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition duration-200 
              ${isFormValid 
                ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(TaskForm);