import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TodoItem } from '../../modules/core/models/todo-item.model';
import { TodoList } from '../../modules/core/models/todo-list.model';
import { StateService } from '../../modules/core/services/state-service';

@Component({
  selector: 'app-list',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit {
  todoList$: Observable<TodoList>;
  todoItems$: Observable<TodoItem[]>;

  constructor(
    stateService: StateService,
    route: ActivatedRoute,
    private router: Router
  ) {
    this.todoList$ = route.params.pipe(
      switchMap((params) => {
        const id = +params['id'];
        return stateService.getTodoList(id);
      })
    );

    this.todoItems$ = this.todoList$.pipe(
      switchMap((list) => {
        return stateService.getItemsOfList(list.id);
      })
    );
  }

  createNewList() {
    this.router.navigateByUrl("/lists/-1/edit");
  }

  editList() {
    this.router.navigateByUrl("/lists/-1/edit");
  }

  ngOnInit(): void {}
}
