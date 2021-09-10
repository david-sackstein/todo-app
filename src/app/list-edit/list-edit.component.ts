import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterState } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TodoList } from '../modules/core/models/todo-list.model';
import { StateService } from '../modules/core/services/state-service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss'],
})
export class ListEditComponent implements OnInit {
  private todoList$: Observable<TodoList>;

  title$ : Observable<String>;
  colors = ['red', 'orange', 'green', 'blue', 'indigo', 'violet'];
  urls = ['work', 'list', 'watch_later', 'alarm'];

  todoList: TodoList = {
    id: -1,
    caption: '',
    description: '',
    url: this.urls[0],
    color: this.colors[0],
  };

  todoListForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    route: ActivatedRoute,
    private stateService: StateService
  ) {
    this.todoList$ = route.params.pipe(
      switchMap((params) => this.getToList(params))
    );

    this.title$ = route.params.pipe(
      map((params) => this.getTitle(params))
    )

    this.todoListForm = formBuilder.group({
      caption: [this.todoList.caption, [Validators.required]],
      description: [
        this.todoList.description,
        [
          Validators.required,
          Validators.minLength(5), // at least 30 characters
          Validators.pattern('^(\\b\\w+\\s*){2,}'), // at least 10 words
        ],
      ],
      url: [this.todoList.url],
      color: [this.todoList.color],
    });

    this.todoList$.subscribe((list) => {
      this.todoList = list;
      this.todoListForm.patchValue(list);
    });
  }

  getTitle(params: Params) {
    const id = +params['id'];
    return id == -1
      ? 'Add new List'
      : 'Edit list details';
  }

  getToList(params: Params) {
    const id = +params['id'];
    return id == -1
      ? of(this.todoList)
      : this.stateService.getTodoList(id);
  }

  getFormColor() {
    return this.todoListForm.controls['color'].value;
  }

  save() {
    this.todoList = this.todoListForm.value;
    if (this.todoList.id == -1) {
      this.stateService.AddList(this.todoList);
    } else {
      this.stateService.UpdateList(this.todoList);
    }
  }

  ngOnInit(): void {}
}
