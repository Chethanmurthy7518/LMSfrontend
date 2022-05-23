import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeegraphComponent } from './employeegraph.component';

describe('EmployeegraphComponent', () => {
  let component: EmployeegraphComponent;
  let fixture: ComponentFixture<EmployeegraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeegraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
