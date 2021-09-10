import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoList } from '../../modules/core/models/todo-list.model';
import { StateService } from '../../modules/core/services/state-service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  lists: Observable<TodoList[]>;

  constructor(stateService: StateService) {
    this.lists = stateService.getTodoLists();
  }

  ngOnInit(): void {}
}
