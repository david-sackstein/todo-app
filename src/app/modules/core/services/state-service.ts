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
    this._lastItemId = Math.max(...this._todoItems.map((item) => item.id));
    this._lastListId = Math.max(...this._todoList.map((item) => item.id));
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

  AddList(todoList: TodoList): Promise<number> {
    const list: TodoList = {
      ...todoList,
      id: this._lastListId + 1,
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

  UpdateList(newList: TodoList): Promise<void> {

    this._todoList = this.Replace(
      this._todoList,
      (list) => list.id == list.id,
      (list) => ({
        ...list,
        ...newList,
      })
    );

    this._todoList$.next(this._todoList);

    return Promise.resolve();
  }

  MarkAsCompleted(itemId: number): Promise<void> {
    this._todoItems = this.Replace(
      this._todoItems,
      (item) => item.id == itemId,
      (item) => ({
        ...item,
        isCompleted: true,
      })
    );

    this._todoItems$.next(this._todoItems);

    return Promise.resolve();
  }

  DeleteList(listId: number): Promise<void> {
    this._todoItems = this._todoItems.filter((item) => item.listId != listId);
    this._todoList = this._todoList.filter((item) => item.id != listId);

    this._todoList$.next(this._todoList);
    this._todoItems$.next(this._todoItems);

    return Promise.resolve();
  }

  private Replace<T>(
    array: T[],
    predicate: (item: T) => boolean,
    replacer: (before: T) => T
  ): T[] {
    const foundIndex = array.findIndex(predicate);
    if (foundIndex == -1) {
      return array;
    }

    return array.map((item: T, index: number) => {
      if (index != foundIndex)
        return item;
      return replacer(array[foundIndex]);
    })
  }
}
