import { Component } from '@angular/core';
import { UtilityService } from 'src/app/service/utility.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent {
  employees:any = {};
  constructor(private _utilityservice:UtilityService,
    private snackBar: MatSnackBar,
    private datePipe:DatePipe){

  }
  ngOnInit():void{
    this.loadItems();
    this._utilityservice.getItems$().subscribe(data => {
      const cur: any[] = [];
      const pre: any[] = [];
      data.forEach(item => {
        if (item.status === 'current') {
          cur.push(item);
        } else {
          pre.push(item);
        }
      });

      this.employees['current']=cur;
      this.employees['previous']=pre;
    });
  }
  async loadItems() {
    const data= await this._utilityservice.getAllItems();
    const cur:any=[],pre:any=[];
    this.employees=data.filter((item=>{
      if(item.status=='current'){
        cur.push(item)
       }else{
        pre.push(item)
       }
    }));
    this.employees['current']=cur;
    this.employees['previous']=pre;
}
delete(emp:any){
  this._utilityservice.deleteItem(emp?.id);
  this.snackBar.open('Employee data has been deleted', 'Close', {
    duration: 2000,
  });
}
convertdate(date:any){
  const myDate: Date = new Date(date);
  const formattedDate = this.datePipe.transform(myDate, 'd MMM yyyy');
  return formattedDate;
}
}
