import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'emp-footer',
  templateUrl: './emp-footer.component.html',
  styleUrls: ['./emp-footer.component.scss']
})
export class EmpFooterComponent {
 @Input() Add:boolean=false;
 @Input() formtouch:any;
 @Output() saveemployee=new EventEmitter();

 saveEmp(){
  this.saveemployee.emit({confirm:true})
 }
}
