import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { ItemsComponent } from './items/items.component';
import { ListComponent } from './list/list.component';
import { ListEditComponent } from './list-edit/list-edit.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExportsModule } from './modules/mat-exports/mat-exports.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListsComponent,
    ItemsComponent,
    ListComponent,
    ListEditComponent,
    ToolBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExportsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
