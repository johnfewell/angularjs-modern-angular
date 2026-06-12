import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  untracked,
} from '@angular/core';
import { Todo, TodoSchema, setTodos } from './repostories/todos.repository';
import { TodoService } from './services/todo.service';
import deepEqual from 'fast-deep-equal/es6';
import { TodoFooterComponent } from './components/todoFooter/todoFooter.component';
import { TodoHeaderComponent } from './components/todoHeader/todoHeader.component';
import { TodoListComponent } from './components/todoList/todoList.component';
import { z } from 'zod';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [TodoFooterComponent, TodoHeaderComponent, TodoListComponent]
})
export class AppComponent {
  private todoService = inject(TodoService);

  state = input<Todo[] | string>([]);
  notify = output<Todo[]>();

  constructor() {
    // Inbound: AngularJS pushed a new state object into the element.
    effect(() => {
      const value = this.state();
      // Before AngularJS's first digest cycle, the bound attribute arrives
      // as the literal string 'stateObject' rather than the object.
      if (value === 'stateObject' || value === undefined) return;

      const result = z.array(TodoSchema).safeParse(value);
      if (result.success) {
        setTodos(result.data);
      } else {
        console.error('Invalid todo schema:', result.error);
      }
    });

    // Outbound: notify AngularJS when our store diverges from the state it
    // last gave us. untracked() means only store changes re-run this effect.
    effect(() => {
      const todos = this.todoService.todos();
      if (!deepEqual(untracked(this.state), todos)) {
        this.notify.emit(todos);
      }
    });
  }
}
