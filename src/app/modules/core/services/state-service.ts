import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoItem } from '../models/todo-item.model';
import { TodoList } from '../models/todo-list.model';
import { TODO_ITEMS, TODO_LISTS } from './state-data';

@Injectable({
  providedIn: 'root',
})
export class StateService {

  private _lastItemId = 0;
  private _todoList: TodoList[] = TODO_LISTS;
  private _todoList$ = new BehaviorSubject<TodoList[]>(this._todoList);

  private _lastListId = 0;
  private _todoItems: TodoItem[] = TODO_ITEMS;
  private _todoItems$ = new BehaviorSubject<TodoItem[]>(this._todoItems);

  constructor() {
    this._lastItemId = Math.max(...this._todoItems.map(item => item.id));
    this._lastListId = Math.max(...this._todoList.map(item => item.id));
  }

  getTodoLists(): Observable<TodoList[]> {
    return this._todoList$.asObservable();
  }

  getTodoItems(): Observable<TodoItem[]> {
    return this._todoItems$.asObservable();
  }

  getItemsOfList(listId: number): Observable<TodoItem[]> {
    return this.getTodoItems().pipe(
      map((list) => list.filter((item) => item.listId == listId))
    );
  }

  getIncompleteTodoItems(): Observable<TodoItem[]> {
    return this.getTodoItems().pipe(
      map((list) => list.filter((item) => item.isCompleted === false))
    );
  }

  getTodoList(listId: number): Observable<TodoList> {
    return this.getTodoLists().pipe(
      map((list) => list.filter((item) => item.id == listId)[0])
    );
  }

  getTodoItem(itemId: number): Observable<TodoItem> {
    return this.getTodoItems().pipe(
      map((items) => items.filter((item) => item.id == itemId)[0])
    );
  }

  AddList(
    caption: string,
    description: string,
    color: string,
    icon: string
  ): Promise<number> {
    const list: TodoList = {
      id: this._lastListId + 1,
      caption: caption,
      description: description,
      url: icon,
      color: color,
      image: icon,
    };

    this._todoList = [...this._todoList, list];
    this._todoList$.next(this._todoList);

    return Promise.resolve(this._todoList.length);
  }

  AddTodoItem(listId: number, caption: string): Promise<number> {
    const id = this._lastItemId + 1;

    const item = {
      id: id,
      caption: caption,
      listId: listId,
      isCompleted: false,
    };

    this._todoItems = [...this._todoItems, item];
    this._todoItems$.next(this._todoItems);

    return Promise.resolve(id);
  }

  ModifyList(list: TodoList): Promise<void> {
    return Promise.resolve();
  }

  MarkAsCompleted(itemId: number): Promise<void> {
    const index = this._todoItems.findIndex((item) => item.id == itemId);
    if (index == -1) {
      return Promise.resolve();
    }

    const completedItem = {
      ...this._todoItems[index],
      isCompleted: true,
    };

    this._todoItems = [
      ...this._todoItems.slice(0, index),
      completedItem,
      ...this._todoItems.slice(index + 1),
    ];

    this._todoItems$.next(this._todoItems);

    return Promise.resolve();
  }

  DeleteList(listId: number): Promise<void> {

    this._todoItems = this._todoItems.filter(item => item.listId != listId);
    this._todoList = this._todoList.filter(item => item.id != listId);

    this._todoList$.next(this._todoList);
    this._todoItems$.next(this._todoItems);

    return Promise.resolve();
  }
}
