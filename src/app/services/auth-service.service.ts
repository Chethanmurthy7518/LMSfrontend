import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient,
    private route: Router) { }
  getUserDetails(){
    const userDeatails = JSON.parse(localStorage.getItem('userDetails')!)
    if(userDeatails){
      return userDeatails
    }
  }

  getToken(){
    const userDetails = this.getUserDetails()
    if(userDetails && userDetails.token){
        return userDetails.token
    }
  }
}
