<script setup lang="ts">
import TaskContainer from './components/TaskContainer.vue';
</script>

<template>
  <main>
    <TaskContainer />
  </main>
</template>

<style>
:root {
  /* Color System */
  --color-primary: #3B82F6;
  --color-primary-light: rgba(59, 130, 246, 0.1);
  --color-primary-dark: #2563EB;
  
  --color-accent: #F97316;
  --color-accent-light: rgba(249, 115, 22, 0.1);
  --color-accent-dark: #EA580C;
  
  --color-success: #10B981;
  --color-success-light: rgba(16, 185, 129, 0.1);
  --color-success-dark: #059669;
  
  --color-error: #EF4444;
  --color-error-light: rgba(239, 68, 68, 0.1);
  --color-error-dark: #DC2626;
  
  /* Neutral Colors */
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
  
  /* Text Colors */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-700);
  --color-text-tertiary: var(--color-gray-500);
  
  /* Background and Border Colors */
  --color-bg: var(--color-gray-50);
  --color-card-bg: white;
  --color-input-bg: white;
  --color-border: var(--color-gray-200);
  --color-border-dark: var(--color-gray-300);
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Dark mode color overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: var(--color-gray-900);
    --color-card-bg: var(--color-gray-800);
    --color-input-bg: var(--color-gray-700);
    
    --color-text-primary: var(--color-gray-50);
    --color-text-secondary: var(--color-gray-300);
    --color-text-tertiary: var(--color-gray-400);
    
    --color-border: var(--color-gray-700);
    --color-border-dark: var(--color-gray-600);
  }
}

body {
  background-color: var(--color-bg);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  color: var(--color-text-primary);
}

button {
  font-family: inherit;
}

/* Reset some styles */
* {
  box-sizing: border-box;
}
</style>