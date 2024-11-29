import { Component } from '@angular/core';
import { UtilityService } from 'src/app/service/utility.service';
@Component({
  selector: 'emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent {
  employees:any;
  constructor(private _utilityservice:UtilityService){

  }
  ngOnInit():void{
    this.loadItems();
  }
  async loadItems() {
    // this._utilityservice.addItem({name:'Priyanka',role:'Full Stack Devloper',status:'current',fromDate:'22-sep-2021',toDate:'20-sep-2021'})
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
    this.employees['previous']=pre;}

}
