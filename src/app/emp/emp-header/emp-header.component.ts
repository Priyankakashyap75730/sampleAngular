import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'emp-header',
  templateUrl: './emp-header.component.html',
  styleUrls: ['./emp-header.component.scss']
})
export class EmpHeaderComponent {
  @Input() heading:any;
  @Input() Add:boolean=false;
  @Input() Edit:boolean=false;
  @Output() del_emit=new EventEmitter();

  confirm(){
    this.del_emit.emit(true);
  }
}
