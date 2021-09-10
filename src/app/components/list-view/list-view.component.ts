import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  newTaskControl: FormControl;
  isDeleting = false;

  constructor(
    private router: Router,
    private stateService: StateService,
    formBuilder: FormBuilder,
    route: ActivatedRoute
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

    this.newTaskControl = formBuilder.control('', [
      Validators.required,
      Validators.minLength(10),
    ]);
  }

  addTask(id: number) {
    this.stateService.AddTodoItem(id, this.newTaskControl.value);
    this.newTaskControl.reset();
  }

  newList() {
    this.router.navigateByUrl("/lists/-1/edit");
  }

  editList(id: number) {
    this.router.navigateByUrl(`/lists/${id}/edit`);
  }

  delete() {
    this.isDeleting = true;
  }

  cancelDelete() {
    this.isDeleting = false;
  }

  confirmDelete(id: number) {
    this.isDeleting = false;
    this.stateService.DeleteList(id);
    this.router.navigateByUrl('/home');
  }

  ngOnInit(): void {}
}
