import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from 'src/app/modules/core/models/todo-item.model';

@Component({
  selector: 'app-todo-item-presenter',
  templateUrl: './todo-item-presenter.component.html',
  styleUrls: ['./todo-item-presenter.component.scss']
})
export class TodoItemPresenterComponent implements OnInit {

  @Input()
  todoItem!: TodoItem;

  @Output()
  onCompleteChanged = new EventEmitter<TodoItem>();

  changed(ev: any) {
    this.todoItem.isCompleted = ev.target.checked;
    this.onCompleteChanged.emit(ev.target.checked);
  }

  constructor() {
  }

  ngOnInit(): void {

  }

}
