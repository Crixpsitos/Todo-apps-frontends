import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private storageKey = 'todos';
  private todos: Todo[] = [];

  constructor() {
    const storedTodos = localStorage.getItem(this.storageKey);
    this.todos = storedTodos ? JSON.parse(storedTodos) : [];
   }

   getTodos(): Todo[] {
    return [...this.todos];
  }

  addTodo(title: string, description: string): void {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.todos.push(newTodo);
    this.saveTodos();
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todo.updatedAt = new Date();
      this.saveTodos();
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveTodos();
  }

  private saveTodos(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
  }
}
