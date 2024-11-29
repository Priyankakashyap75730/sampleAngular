import { Component } from '@angular/core';
import { UtilityService } from 'src/app/service/utility.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent {
  employees:any;
  constructor(private _utilityservice:UtilityService,private snackBar: MatSnackBar){

  }
  ngOnInit():void{
    this.loadItems();
  }
  async loadItems() {
    // this._utilityservice.addItem({name:'Saumya',role:'Fresher',status:'previous',fromDate:'22-sep-2021',toDate:'20-sep-2021'})
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
  // this._utilityservice.deleteItem(emp?.id);
  console.log(emp);
}

}
