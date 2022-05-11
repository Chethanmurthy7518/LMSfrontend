import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: any;
  cred: any;
  constructor(private api: ApiServiceService, private router: Router) {}

  ngOnInit(): void {
    
  }
  onSubmit(data: any) {
    console.log('LOGIN WORKS');
  
    for (let i = 0; i < this.users.length; i++) {
      // console.log('LOOP', this.users[i]);

      if (
        data.empId === this.users[i].empId &&
        data.password === this.users[i].password
      ) {
        localStorage.setItem('UserDetails', JSON.stringify(this.users[i]));
        this.router.navigate(['admindashboard']);
        break;
      } 
    }
  }

  

}
