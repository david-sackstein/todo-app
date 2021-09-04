import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterState } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from '../modules/core/services/state-service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss'],
})
export class ListEditComponent implements OnInit {

  private id$: Observable<number>;

  constructor(private route: ActivatedRoute) {
    this.id$ = this.route.params.pipe(map(params => +params['id']));
  }

  ngOnInit(): void {

  }
}
