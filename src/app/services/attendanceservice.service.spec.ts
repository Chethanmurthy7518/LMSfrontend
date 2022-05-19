import { TestBed } from '@angular/core/testing';

import { AttendanceserviceService } from './attendanceservice.service';

describe('AttendanceserviceService', () => {
  let service: AttendanceserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
