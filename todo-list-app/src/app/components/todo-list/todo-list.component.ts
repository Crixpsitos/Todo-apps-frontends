import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';

// este es el componente principal de la lista de tareas
// se encarga de mostrar la lista de tareas y de manejar la logica de agregar, eliminar y marcar como completada una tarea


@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TodoItemComponent, AddTodoComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  addTodo(newTodo: { title: string; description: string }) {
    this.todoService.addTodo(newTodo.title, newTodo.description);
    this.todos = this.todoService.getTodos();
  }
  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
    this.todos = this.todoService.getTodos();
  }
  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getTodos();
  }
  getCompletedTodosCount(): number {
    return this.todos.filter((todo) => todo.completed).length;
  }
  getTotalTodosCount(): number {
    return this.todos.length;
  }

}
