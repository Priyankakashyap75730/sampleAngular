import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { UtilityService } from 'src/app/service/utility.service';
import { ActivatedRoute } from '@angular/router';
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'd MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}
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
 heading:any;
 employeeForm: FormGroup;
 constructor(private fb: FormBuilder,
  private _utility:UtilityService,
  private _activeRoute:ActivatedRoute){
  this.employeeForm = this.fb.group({
    name: [''],
    role: [''],
    fromDate: [''],
    toDate: ['']
  });
 }
 params_data:any;
 ngOnInit(){
  this._activeRoute.queryParams.subscribe((params) => {
    this.params_data = params;
  });
  if(this.params_data?.id){
    this.heading="Edit Employee Details";
    this.loadData(this.params_data?.id);
  }else{
    this.heading="Add Employee Details"
  }
    this.employeeForm.valueChanges.subscribe((changes)=>{
      console.log(this._utility.formatedate(changes.fromDate),changes);
 })
    this.employeeForm.get('fromdate')?.setValue(new Date())
 }
 async loadData(id:any){
  const data= await this._utility.getAllItems();
  let fetchdata:any;
   data.find((item:any)=>{
    if(item.id==id){
      fetchdata=item;
    }
  })
  this.employeeForm.patchValue(fetchdata)
}
saveEmp(event:any){
  if(event.confirm){
    console.log(this.employeeForm.value);

    // this._utilityservice.addItem({name:'Saumya',role:'Fresher',status:'previous',fromDate:'22-sep-2021',toDate:'20-sep-2021'})
  }
}
}
