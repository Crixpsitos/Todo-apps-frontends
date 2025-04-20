<script setup lang="ts">
import { TransitionGroup } from "vue";

import type { Task } from "../types/Task";
import TaskItem from "./TaskItem.vue";
const props = defineProps<{
  tasks: Task[];
}>();

console.log(props.task);

const emit = defineEmits<{
  (e: "toggle-status", id: string): void;
  (e: "delete-task", id: string): void;
}>();
</script>

<template>
  <div class="task-list">
    <h2>Tus tareas</h2>

    <div v-if="tasks?.length === 0" class="empty-state">
      <p>No hay tareas disponibles</p>
    </div>

    <TransitionGroup name="task-list" tag="div">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle-status="emit('toggle-status', $event)"
        @delete-task="emit('delete-task', $event)"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.task-list {
  margin-bottom: 24px;
}

h2 {
  margin-top: 0;
  margin-bottom: 16px;
  color: var(--color-text-primary);
  font-size: 1.5rem;
  font-weight: 600;
}

.empty-state {
  background-color: var(--color-card-bg);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  border: 2px dashed var(--color-border);
  color: var(--color-text-secondary);
}

.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.5s ease;
}

.task-list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.task-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.task-list-move {
  transition: transform 0.5s ease;
}
</style>
