import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoItem } from 'src/app/modules/core/models/todo-item.model';
import { StateService } from 'src/app/modules/core/services/state-service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  incompleteItems$: Observable<TodoItem[]>;
  allCompleted$: Observable<boolean>;
  private onCompletion = new BehaviorSubject<boolean>(false);

  constructor(private stateService: StateService) {
    this.incompleteItems$ = stateService.getIncompleteTodoItems();

    this.allCompleted$ = combineLatest([
      this.incompleteItems$,
      this.onCompletion,
    ]).pipe(map(([items, _]) => {
      return items.length === 0;
    }));
  }

  onCompleteChanged(item: TodoItem) {
    this.stateService.MarkAsCompleted(item.id);
    this.onCompletion.next(item.isCompleted);
  }

  ngOnInit(): void {}
}
