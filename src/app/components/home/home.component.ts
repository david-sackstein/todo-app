import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from '../../modules/core/services/state-service';

/*
Implement the home page.
Present the app name,
developer, todays date, total todo items,
total uncompleted todo items, and a button that navigates to create a new list lists/-1/edit
*/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private stateService: StateService) {
    this.toDoListsCount$ = this.stateService
      .getTodoLists()
      .pipe(map((list) => list.length));

    this.toDoItemsCount$ = this.stateService
      .getTodoItems()
      .pipe(map((list) => list.length));

    this.incompleteToDoCount$ = this.stateService
      .getIncompleteTodoItems()
      .pipe(map((list) => list.length));
  }

  toDoListsCount$: Observable<number>;
  toDoItemsCount$: Observable<number>;
  incompleteToDoCount$: Observable<number>;

  date: Date = new Date();

  ngOnInit(): void {}
}
