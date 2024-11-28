import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpListComponent } from './emp-list/emp-list.component';
import { EmpAddComponent } from './emp-add/emp-add.component';
import { EmpMainComponent } from './emp-main/emp-main.component';
import { RouterModule, Routes } from '@angular/router';
import { EmpHeaderComponent } from './emp-header/emp-header.component';
import { EmpFooterComponent } from './emp-footer/emp-footer.component';
const routes: Routes = [
  {path: '',component: EmpMainComponent},
  {path:'add-emp', component:EmpAddComponent}
];


@NgModule({
  declarations: [
    EmpListComponent,
    EmpAddComponent,
    EmpMainComponent,
    EmpHeaderComponent,
    EmpFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EmpModule { }
