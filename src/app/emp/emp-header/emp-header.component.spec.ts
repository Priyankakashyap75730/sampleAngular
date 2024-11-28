import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpHeaderComponent } from './emp-header.component';

describe('EmpHeaderComponent', () => {
  let component: EmpHeaderComponent;
  let fixture: ComponentFixture<EmpHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpHeaderComponent]
    });
    fixture = TestBed.createComponent(EmpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
