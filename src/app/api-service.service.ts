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

  getBatchBYEmpId(){
    const id = JSON.parse(localStorage.getItem('userDetails')!).empId
    return this.http.get<any>(`${environment.baseURL}/lms/getbatchbyempid?empId=${id}`)
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

  getEmployeesOfBatch(id:any){
    return this.http.get<any>(`${environment.baseURL}/lmsuser/getemployeebybatchid?batchId=${id}`)
  }
  
  approveEmp(data:any){
    return this.http.put<any>(`${environment.baseURL}/lmsuser/empregisterapprove`,data)
  }
  
  rejectEmp(data:any){
    return this.http.put<any>(`${environment.baseURL}/lmsuser/empregisterreject`,data)
  }

  createMock(data:any){
    return this.http.post<any>(`${environment.baseURL}/lms/mockcreate`,data)
  }

  giveRating(data:any){
    return this.http.post<any>(`${environment.baseURL}/lms/mockrating`,data)
  }

  getMockRatings(id:any){
    return this.http.get<any>(`${environment.baseURL}/lms/employeemockdetails?empId=${id}`)
  }

  resetPassword(data:any){
    return this.http.put<any>(`${environment.baseURL}/lmsuser/resetpassword`,data)
  }
}
