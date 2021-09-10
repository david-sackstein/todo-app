import { Component, Input, OnInit } from '@angular/core';
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

  changed(ev: any) {
    this.todoItem.isCompleted = ev.target.checked;
  }

  constructor() {
  }

  ngOnInit(): void {

  }

}
