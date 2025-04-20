import { CommonModule } from '@angular/common';
import {Component, Input, Output, EventEmitter  } from '@angular/core';
import { Todo } from '../../models/todo.model';

// este es el componente que representa una tarea individual
// se encarga de mostrar la tarea y de manejar la logica de marcarla como completada o eliminarla
// el componente recibe la tarea como input y emite eventos cuando se marca como completada o se elimina


@Component({
  selector: 'app-todo-item',
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

}
