<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "addTask", title: string, description: string): void;
}>();

const title = ref("");
const description = ref("");
const titleError = ref("");
const descriptionError = ref("");

const validateForm = (): boolean => {
  let isValid = true;

  if (!title.value.trim()) {
    titleError.value = "El título es obligatorio";
    isValid = false;
  } else if (title.value.length > 50) {
    titleError.value = "El título no puede exceder los 50 caracteres";
    isValid = false;
  } else {
    titleError.value = "";
  }

  if (description.value.length > 200) {
    descriptionError.value = "Description must be 200 characters or less";
    isValid = false;
  } else {
    descriptionError.value = "";
  }

  return isValid;
};

const handleSubmit = () => {
  if (validateForm()) {
    emit("add-task", title.value, description.value);
    title.value = "";
    description.value = "";
    titleError.value = "";
    descriptionError.value = "";
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <h2>Añade tu nueva tarea</h2>
    <div class="form-group">
      <label for="title">Titulo</label>
      <input
        type="text"
        id="title"
        v-model="title"
        placeholder="Escribe el título de la tarea"
        :class="{ 'input-error': titleError }"
      />
      <div v-if="titleError" class="error-message">{{ titleError }}</div>
      <div class="char-count" :class="{ 'limit-exceeded': title.length > 50 }">
        {{ title.length }}/50
      </div>
    </div>
    <div class="form-group">
      <label for="description">Descripción</label>
      <textarea
        id="description"
        v-model="description"
        placeholder="Escribe una descripción de la tarea (opcional)"
        :class="{ 'input-error': descriptionError }"
      ></textarea>
      <div v-if="descriptionError" class="error-message">
        {{ descriptionError }}
      </div>
      <div
        class="char-count"
        :class="{ 'limit-exceeded': description.length > 200 }"
      >
        {{ description.length }}/200
      </div>
    </div>

    <button type="submit" class="add-button">Añadir tu tareita owo</button>
  </form>
</template>

<style scoped>
.task-form {
  background-color: var(--color-card-bg);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.3s ease;
}

.task-form:hover {
  box-shadow: var(--shadow-md);
}

h2 {
  margin-top: 0;
  margin-bottom: 16px;
  color: var(--color-text-primary);
  font-size: 1.5rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--color-text-primary);
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  background-color: var(--color-input-bg);
  color: var(--color-text-primary);
  transition: all 0.2s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.input-error {
  border-color: var(--color-error);
}

.error-message {
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: 4px;
}

.char-count {
  position: absolute;
  right: 8px;
  bottom: 8px;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.limit-exceeded {
  color: var(--color-error);
  font-weight: 600;
}

.add-button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.add-button:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
}

.add-button:active {
  transform: translateY(1px);
}

@media (max-width: 480px) {
  .task-form {
    padding: 16px;
  }

  input,
  textarea {
    padding: 10px;
  }
}
</style>
