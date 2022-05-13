import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient,
    private route: Router) { }
  login(data:any){
    return this.http.post<any>(`${environment.baseURL}/lmsuser/login`,data)
  }
  getAllBatches(){
   return this.http.get<any>(`${environment.baseURL}/lms/allbatches`)
  }

  registerBatch(data:any){
    return this.http.post<any>(`${environment.baseURL}/lms/batchregister`,data)
  }

  editBatch(data:any){
    return this.http.put<any>(`${environment.baseURL}/lms/editbatch`,data)
  }

  deleteBatch(bid:any){
    return this.http.delete<any>(`${environment.baseURL}/lms/deletebatch?batchId=${bid}`)
  }

  getAllMentors(){
    return this.http.get<any>(`${environment.baseURL}/lmsuser/mentorslist`)
  }

  addMentor(data:any){
   return this.http.post<any>(`${environment.baseURL}/lmsuser/mentorregister`,data)
  }

  mentorDelete(id:any){
    return this.http.delete<any>(`${environment.baseURL}/lmsuser/mentordelete?empId=${id}`)
  }

  getallEmployees(){
    return this.http.get<any>(`${environment.baseURL}/lmsuser/allemployees`)
  }
  
  approveEmp(data:any){
    return this.http.put<any>(`${environment.baseURL}/lmsuser/empregisterapprove`,data)
  }
  
  rejectEmp(data:any){
    return this.http.put<any>(`${environment.baseURL}/lmsuser/empregisterreject`,data)
  }
}
