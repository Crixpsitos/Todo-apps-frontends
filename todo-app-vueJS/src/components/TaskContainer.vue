<script setup lang="ts">
import { useTask } from "../composables/useTask.ts";
import TaskForm from "./TaskForm.vue";
import TaskList from "./TaskList.vue";

const { tasks, addTask, toggleTaskStatus, deleteTask } = useTask();

console.log(tasks.value);

</script>

<template>
    <div class="task-container">
        <div class="task-header">
            <h1>Manejador de tareas</h1>
            <p class="subtitle">Organiza tus tareas aqui UWU</p>
        </div>

        <TaskForm @add-task="addTask"/>
        <TaskList :tasks="tasks" @toggle-status="toggleTaskStatus" @delete-task="deleteTask" />
    </div>
</template>

<style scoped>
.task-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

.task-header {
  text-align: center;
  margin-bottom: 32px;
}

h1 {
  color: var(--color-text-primary);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  margin-top: 0;
}

@media (max-width: 480px) {
  .task-container {
    padding: 16px;
  }
  
  h1 {
    font-size: 2rem;
  }
}
</style>