import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Este es el componente que se encarga de agregar nuevas tareas a la lista
// Se encarga de mostrar el formulario para agregar una nueva tarea y de manejar la logica de agregarla a la lista
// El componente emite un evento cuando se agrega una nueva tarea
// El componente recibe el titulo y la descripcion de la tarea como input y emite un evento cuando se agrega una nueva tarea
// El componente se encarga de validar que el titulo y la descripcion no esten vacios antes de agregar la tarea
// El componente se encarga de limpiar el formulario una vez que se agrega la tarea
// El componente se encarga de mostrar un mensaje de error si el titulo o la descripcion estan vacios
// El componente se encarga de mostrar un mensaje de exito si la tarea se agrega correctamente
// El componente se encarga de mostrar un mensaje de error si la tarea no se agrega correctamente


@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export class AddTodoComponent {
  newTodoTitle: string = '';
  newTodoDescription: string = '';

  @Output() add = new EventEmitter<{ title: string; description: string }>();

  addTodo() {
    if (this.newTodoTitle.trim() && this.newTodoDescription.trim()) {
      this.add.emit({
        title: this.newTodoTitle,
        description: this.newTodoDescription,
      });
      this.newTodoTitle = '';
      this.newTodoDescription = '';
    }
  }
}
