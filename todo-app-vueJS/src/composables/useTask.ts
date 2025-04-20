import { ref, computed, watchEffect } from "vue";
import type { Task } from "../types/Task";

export const useTask = () => {
  const tasks = ref<Task[]>([]);

  const loadTask = (): void => {
    const savedTask = localStorage.getItem("tasks");
    if (savedTask) {
      tasks.value = JSON.parse(savedTask);
    } else {
        tasks.value = []
    }
  };

  const saveTask = (): void => {
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  };

  loadTask();

  watchEffect(() => {
    if (tasks.value.length > 0) {
      saveTask();
    }
  });

  const sortedTasks = computed(() => {
    return [...tasks.value].sort((a, b) => {
      if (a.completed === b.completed) {
        return a.createdAt - b.createdAt;
      }

      return a.completed ? 1 : -1;
    });
  });

  const addTask = (title: string, description: string): void => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    tasks.value.push(newTask);
  };

  const toggleTaskStatus = (id: string): void => {
    const task = tasks.value.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  };

  const deleteTask = (id: string): void => {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  };

  return {
    tasks: sortedTasks,
    addTask,
    toggleTaskStatus,
    deleteTask,
  };
};
