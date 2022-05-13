import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  users: any;
  cred: any;
  message: any;
  error: any;
  loginData: any;
  loginrole: any;
  constructor(private api: ApiServiceService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit(data: any) {
    // console.log('LOGIN WORKS');
    // console.log(data);
    this.api.login(data).subscribe(
      (res) => {
        if (!res.error) {
          localStorage.setItem('userDetails', JSON.stringify(res.data));
          this.loginData = res.data;
          console.log(this.loginData);
          this.loginrole = this.loginData.role;
          console.log(this.loginrole);
          if(this.loginrole === 'admin'){
            this.router.navigate(['/admindashboard'])
          }
          else if(this.loginrole === 'mentor'){
            this.router.navigate(['/mentordashboard'])
          }
          else if(this.loginrole === 'employee'){
            this.router.navigate(['/employeedashboard'])
          }
        } else {
          this.message = res.message;
        }
      },
      (err) => {
        this.error = 'Something went wrong Please try again';
      }
    );
  }
}
