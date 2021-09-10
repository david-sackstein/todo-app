import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemsComponent } from './components/items/items.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ListsComponent } from './components/lists/lists.component';
import { NoListsGuard } from './modules/core/guards/no-lists.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'lists', component: ListsComponent, canActivate: [NoListsGuard] },
  { path: 'lists/:id', component: ListViewComponent },
  { path: 'lists/:id/edit', component: ListEditComponent },
  { path: 'items', component: ItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
