import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'

const imported = [
  MatIconModule
]

@NgModule({
  declarations: [],
  imports: [...imported],
  exports: [...imported],
})
export class MatExportsModule { }
