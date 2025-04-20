<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '../types';

// Define props with types
const props = defineProps<{
  task: Task
}>();

console.log(props.task);

// Define emits with types
const emit = defineEmits<{
  (e: 'toggle-status', id: string): void
  (e: 'delete-task', id: string): void
}>();

// estado reactivo para mostrar la confirmación de eliminación
const showDeleteConfirm = ref(false);


// Esta función toma un timestamp y lo convierte a una cadena de fecha legible
const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// cambio de estado de la tarea 
const toggleDeleteConfirm = (): void => {
  showDeleteConfirm.value = !showDeleteConfirm.value;
};

// Confirmar la eliminación de la tarea
const confirmDelete = (): void => {
  emit('delete-task', props.task.id);
  showDeleteConfirm.value = false;
};
</script>

<template>
  <div 
    class="task-item" 
    :class="{ 'completed': task.completed }"
  >
    <div class="task-content">
      <div class="task-header">
        <div class="task-title-group">
          <div 
            class="checkbox"
            @click="emit('toggle-status', task.id)"
            :class="{ 'checked': task.completed }"
          >
            <svg v-if="task.completed" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 class="task-title">{{ task.title }}</h3>
        </div>
        
        <div class="task-actions" v-if="!showDeleteConfirm">
          <button 
            class="delete-button"
            @click="toggleDeleteConfirm"
            aria-label="Delete task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
        
        <div class="delete-confirm" v-else>
          <span>Delete?</span>
          <button 
            class="confirm-yes"
            @click="confirmDelete"
          >
            Yes
          </button>
          <button 
            class="confirm-no"
            @click="toggleDeleteConfirm"
          >
            No
          </button>
        </div>
      </div>
      
      <p class="task-description" v-if="task.description">
        {{ task.description }}
      </p>
      
      <div class="task-date">
        Created: {{ formatDate(task.createdAt) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  background-color: var(--color-card-bg);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  border-left: 4px solid var(--color-primary);
}

.task-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.task-item.completed {
  border-left-color: var(--color-success);
  opacity: 0.8;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.task-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.checkbox {
  width: 22px;
  height: 22px;
  border: 2px solid var(--color-border-dark);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.checkbox:hover {
  border-color: var(--color-primary);
  background-color: var(--color-primary-light);
}

.checkbox.checked {
  background-color: var(--color-success);
  border-color: var(--color-success);
  color: white;
}

.task-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  transition: all 0.2s ease;
  word-break: break-word;
}

.completed .task-title {
  text-decoration: line-through;
  color: var(--color-text-secondary);
}

.task-description {
  margin: 8px 0 12px 0;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  white-space: pre-line;
  word-break: break-word;
}

.task-date {
  font-size: 0.8rem;
  color: var(--color-text-tertiary);
  text-align: right;
}

.task-actions button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-tertiary);
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.task-actions button:hover {
  color: var(--color-error);
  background-color: var(--color-error-light);
}

.delete-confirm {
  display: flex;
  align-items: center;
  gap: 8px;
}

.delete-confirm span {
  font-size: 0.9rem;
  color: var(--color-error);
}

.delete-confirm button {
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.confirm-yes {
  background-color: var(--color-error);
  color: white;
}

.confirm-yes:hover {
  background-color: var(--color-error-dark);
}

.confirm-no {
  background-color: var(--color-border);
  color: var(--color-text-primary);
}

.confirm-no:hover {
  background-color: var(--color-border-dark);
}

@media (max-width: 480px) {
  .task-item {
    padding: 12px;
  }
  
  .task-title {
    font-size: 1rem;
  }
}
</style>