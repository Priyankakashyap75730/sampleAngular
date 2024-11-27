import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpMainComponent } from './emp-main.component';

describe('EmpMainComponent', () => {
  let component: EmpMainComponent;
  let fixture: ComponentFixture<EmpMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpMainComponent]
    });
    fixture = TestBed.createComponent(EmpMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
