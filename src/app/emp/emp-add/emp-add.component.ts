import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { UtilityService } from 'src/app/service/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMM YYYY',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD MMMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.scss'],
  providers: [
    DatePipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EmpAddComponent {
  heading: any;
  employeeForm: FormGroup;
  params_data: any;
  constructor(
    private fb: FormBuilder,
    private _utility: UtilityService,
    private _activeRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private router:Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['',Validators.required],
      role: ['',Validators.required],
      fromDate: [''],
      toDate: [''],
    });
  }
  employees=[
  {value: "Product Designer" },
  {value: "Flutter Developer" },
  {value: "QA Tester" },
  {value: "Product Owner" }
]

  ngOnInit() {
    this.employeeForm.get('fromDate')?.setValue(new Date());
    this._activeRoute.queryParams.subscribe((params) => {
      this.params_data = params;
    });
    if (this.params_data?.id) {
      this.heading = 'Edit Employee Details';
      this.loadData(this.params_data?.id);
    } else {
      this.heading = 'Add Employee Details';
    }
  }

  async loadData(id: any) {
    const data = await this._utility.getAllItems();
    let fetchdata:any;
    data.find((item: any) =>{if(item.id==id){fetchdata=item;}
    })
    if (fetchdata) {
      this.employeeForm.patchValue(fetchdata);
      this.employeeForm.get('fromDate')?.setValue(new Date(fetchdata?.fromDate));
      this.employeeForm.get('toDate')?.setValue(new Date(fetchdata?.toDate))
    }
  }
  selectDate(option: string,date?:any) {
    const today = new Date();
    let selectedDate: Date | null = null;
    switch (option) {
      case 'today':
        selectedDate = today;
        break;
      case 'nextMonday':
        selectedDate = this._utility.getNextDay(today, 1); // Monday
        break;
      case 'nextTuesday':
        selectedDate = this._utility.getNextDay(today, 2); // Tuesday
        break;
      case 'after1Week':
        selectedDate = new Date(today.setDate(today.getDate() + 7));
        break;
      case 'nodate':
        this.employeeForm.patchValue({ toDate:null });
        break;
    }

    if (selectedDate && !date) {
      this.employeeForm.patchValue({ fromDate: selectedDate });
    }
    if(selectedDate && date){
      this.employeeForm.patchValue({ toDate: selectedDate });
    }
  }
  saveEmp(event: any) {
    if (event.confirm) {
      const formattedFromDate = this.datePipe.transform(this.employeeForm.value.fromDate, 'MM/dd/yyyy', 'UTC');
      const formattedToDate = this.datePipe.transform(this.employeeForm.value.toDate, 'MM/dd/yyyy', 'UTC');
      if(this.params_data?.id){
       let item={
          id:Number(this.params_data?.id),
          fromDate:formattedFromDate,
          toDate: formattedToDate,
          role: this.employeeForm.value?.role,
          name:this.employeeForm.value?.name,
          status:this._utility.getStatus(formattedFromDate||'')
        }
        this._utility.updateItem(Number(this.params_data?.id),item);
        this.snackBar.open('Employee data has been successfully updated', 'Close', {
          duration: 2000,
        });
        this.router.navigate([''])

      }else{
        let item={
          fromDate:formattedFromDate,
          toDate: formattedToDate,
          role: this.employeeForm.value?.role,
          name:this.employeeForm.value?.name,
          status:this._utility.getStatus(formattedFromDate||'')
        }
        this._utility.addItem(item);
        this.employeeForm.reset();
        this.snackBar.open('Employee has been successfully added', 'Close', {
          duration: 2000,
        });
        this.router.navigate([''])
      }
    }
  }
}
