import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoItem } from 'src/app/modules/core/models/todo-item.model';
import { StateService } from 'src/app/modules/core/services/state-service';

@Component({
  selector: 'app-todo-item-presenter',
  templateUrl: './todo-item-presenter.component.html',
  styleUrls: ['./todo-item-presenter.component.scss'],
})
export class TodoItemPresenterComponent implements OnInit {
  @Input()
  todoItem!: TodoItem;

  @Output()
  onCompleteChanged = new EventEmitter<TodoItem>();

  constructor(private stateService: StateService) {}

  changed(ev: any) {
    this.todoItem.isCompleted = ev.target.checked;
    this.onCompleteChanged.emit(ev.target.checked);
  }

  getColor(todoItem: TodoItem): Observable<string | undefined> {
    return this.stateService
      .getListOfItem(todoItem.id)
      .pipe(map((list) => list?.color));
  }

  ngOnInit(): void {}
}
