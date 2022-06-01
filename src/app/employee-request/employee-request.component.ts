import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-request',
  templateUrl: './employee-request.component.html',
  styleUrls: ['./employee-request.component.css']
})
export class EmployeeRequestComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  navigate(){
      this.route.navigate(['/login'])
  }
}
