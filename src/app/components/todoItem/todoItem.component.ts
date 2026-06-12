import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Todo } from '../../repostories/todos.repository';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'app-todo-item',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    template: `<li
      [ngClass]="{ completed: todo().completed, editing: isEditing }"
      style="border-bottom: 1px solid #ededed;"
      >
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          (click)="toggleTodo()"
          [checked]="todo().completed"
          />
        <label (dblclick)="startEdit()">{{ todo().title }}</label>
        <button class="destroy" (click)="removeTodo()"></button>
      </div>
      @if (isEditing) {
        <div class="input-container">
          <input
            #todoInputRef
            class="edit"
            id="edit-todo-input"
            (focus)="handleFocus($event)"
            (blur)="handleBlur($event)"
            (keyup.enter)="updateTodo()"
            [formControl]="titleFormControl"
            />
          <label class="visually-hidden" htmlFor="edit-todo-input">
            Edit Todo Input
          </label>
        </div>
      }
    </li>`,
    styles: ['li {border-bottom: 1px solid #ededed;}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements AfterViewChecked {
  todo = input.required<Todo>();

  index = input(0);

  deleteEvent = output<Todo>();

  inputRef = viewChild<ElementRef>('todoInputRef');

  constructor(private todoSerivce: TodoService) {}

  titleFormControl = new FormControl('');

  isEditing = false;

  toggleTodo(): void {
    this.todoSerivce.toggleTodo(this.todo().id);
  }

  removeTodo(): void {
    this.deleteEvent.emit(this.todo());
  }

  startEdit() {
    this.isEditing = true;
  }

  handleBlur(_e: Event) {
    this.isEditing = false;
  }

  handleFocus(_e: Event) {
    this.titleFormControl.setValue(this.todo().title);
  }

  updateTodo() {
    const title = this.titleFormControl.getRawValue()?.trimEnd();
    if (!title) {
      this.deleteEvent.emit(this.todo());
    } else {
      const payload = {
        ...this.todo(),
        title,
      };
      this.todoSerivce.saveEdits(payload);
    }

    this.isEditing = false;
  }

  ngAfterViewChecked(): void {
    if (this.isEditing) this.inputRef()?.nativeElement.focus();
  }
}
