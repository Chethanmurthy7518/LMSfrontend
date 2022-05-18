import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorDashboardGraphsComponent } from './mentor-dashboard-graphs.component';

describe('MentorDashboardGraphsComponent', () => {
  let component: MentorDashboardGraphsComponent;
  let fixture: ComponentFixture<MentorDashboardGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorDashboardGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorDashboardGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
