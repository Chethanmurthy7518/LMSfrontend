import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  toggle1=true;
  dashboard = '../../assets/images/dashboard (3).png';
  isDashboard=true
  constructor() { }

  ngOnInit(): void {
  }
  enableDisableDashboard() {
    this.isDashboard=true;
    
   
    this.toggle1 = !this.toggle1;
    this.dashboard = this.toggle1
      ? '../../assets/images/dashboard (3).png'
      : '../../assets/images/dashboard (2).png';
  }

}
