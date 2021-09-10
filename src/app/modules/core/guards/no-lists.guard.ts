import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StateService } from '../services/state-service';

@Injectable({
  providedIn: 'root'
})
export class NoListsGuard implements CanActivate {

  constructor(
    private stateService: StateService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.stateService.getTodoLists().pipe(
      map(lists => lists.length != 0),
      tap(hasLists => {
        if (! hasLists) {
          this.router.navigateByUrl('/lists/-1/edit');
        }
      })
    )
  }

}
