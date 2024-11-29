import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpListComponent } from './emp-list/emp-list.component';
import { EmpAddComponent } from './emp-add/emp-add.component';
import { EmpMainComponent } from './emp-main/emp-main.component';
import { RouterModule, Routes } from '@angular/router';
import { EmpHeaderComponent } from './emp-header/emp-header.component';
import { EmpFooterComponent } from './emp-footer/emp-footer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
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
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class EmpModule { }
