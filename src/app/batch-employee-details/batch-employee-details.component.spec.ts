import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchEmployeeDetailsComponent } from './batch-employee-details.component';

describe('BatchEmployeeDetailsComponent', () => {
  let component: BatchEmployeeDetailsComponent;
  let fixture: ComponentFixture<BatchEmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchEmployeeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchEmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
