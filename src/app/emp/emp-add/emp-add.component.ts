import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { UtilityService } from 'src/app/service/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM d, yyyy',
  },
  display: {
    dateInput: 'd MMM yyyy', // Display format
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.scss'],
  providers: [
    DatePipe,
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true },
    },
    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true },
    },
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
      name: [''],
      role: [''],
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
      this.employeeForm.valueChanges.subscribe((changes) => {
      const formattedFromDate = this.datePipe.transform(changes.fromDate, 'MM/dd/yyyy', 'UTC');
      const formattedToDate = this.datePipe.transform(changes.toDate, 'MM/dd/yyyy', 'UTC');
      // console.log({ fromDate: formattedFromDate, toDate: formattedToDate,role:changes?.role,name:changes?.name });
    });
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
        const data=this._utility.updateItem(Number(this.params_data?.id),item);
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
