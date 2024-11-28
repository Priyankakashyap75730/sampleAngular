import { Component } from '@angular/core';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent {

  constructor(private _utilityservice:UtilityService){

  }
  ngOnInit():void{
    this.loadItems();
  }
  async loadItems() {
    // this._utilityservice.addItem({name:'priyanka',fromDate:'22-sep-2021',toDate:'20-sep-2021'})
    const data= await this._utilityservice.getAllItems();
}

}
