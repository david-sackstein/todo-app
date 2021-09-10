import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { ItemsComponent } from './components/items/items.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExportsModule } from './modules/mat-exports/mat-exports.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoItemPresenterComponent } from './components/todo-item-presenter/todo-item-presenter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListsComponent,
    ItemsComponent,
    ListViewComponent,
    ListEditComponent,
    ToolBarComponent,
    TodoItemPresenterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExportsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
