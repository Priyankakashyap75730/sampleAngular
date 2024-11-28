import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpFooterComponent } from './emp-footer.component';

describe('EmpFooterComponent', () => {
  let component: EmpFooterComponent;
  let fixture: ComponentFixture<EmpFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpFooterComponent]
    });
    fixture = TestBed.createComponent(EmpFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
