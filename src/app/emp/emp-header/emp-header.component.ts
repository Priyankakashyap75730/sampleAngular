import { Component, Input } from '@angular/core';

@Component({
  selector: 'emp-header',
  templateUrl: './emp-header.component.html',
  styleUrls: ['./emp-header.component.scss']
})
export class EmpHeaderComponent {
  @Input() heading:any;
}
