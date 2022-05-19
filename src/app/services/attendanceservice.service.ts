import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AttendanceserviceService {

  constructor(private http: HttpClient,
    private route: Router) { }
  
    takeAttendance(data:any){
      return this.http.post<any>(`${environment.baseURL}/lms/takeattendance`,data)
    }
}
