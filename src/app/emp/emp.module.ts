import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpListComponent } from './emp-list/emp-list.component';
import { EmpAddComponent } from './emp-add/emp-add.component';
import { EmpMainComponent } from './emp-main/emp-main.component';



@NgModule({
  declarations: [
    EmpListComponent,
    EmpAddComponent,
    EmpMainComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EmpModule { }
