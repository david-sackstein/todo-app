import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { ListEditComponent } from './list-edit/list-edit.component';
import { ListComponent } from './list/list.component';
import { ListsComponent } from './lists/lists.component';
import { NoListsGuard } from './modules/core/guards/no-lists.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'lists', component: ListsComponent, canActivate: [NoListsGuard] },
  { path: 'lists/:id', component: ListComponent },
  { path: 'lists/:id/edit', component: ListEditComponent },
  { path: 'items', component: ItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
