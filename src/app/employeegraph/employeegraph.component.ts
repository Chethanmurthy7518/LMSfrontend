import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiServiceService } from '../api-service.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-employeegraph',
  templateUrl: './employeegraph.component.html',
  styleUrls: ['./employeegraph.component.css']
})
export class EmployeegraphComponent implements OnInit {
  BarChart!: Chart;
  Attendance:any;
  morningAttendance:any=0;
  noonAttendance:any=0;
  employeeId: any;
  constructor(private authserve: AuthServiceService,private api:ApiServiceService) { }

  ngOnInit(): void {
    const userDetails = this.authserve.getUserDetails();
    this.employeeId = userDetails.empId;
    this.getEmployeeAttendance(this.employeeId)
   this.barChart()
  }
  getEmployeeAttendance(id:any){
    this.api.getEmployeeAttendance(id).subscribe((res)=>{
      console.log(res);
      this.Attendance =res.data.session
      console.log(this.Attendance);
      if(this.Attendance.morning === true){
        this.morningAttendance++
      }
      if(this.Attendance.noon === true){
        this.noonAttendance++
      }
    })
  }
  barChart() {
    
    if(this.BarChart){
      this.BarChart?.destroy();
    }
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Mock 1', 'Mock 2', 'Mock 3', 'Mock 4', 'Mock 5', 'Mock 6'],
        datasets: [
          {
            label: 'Mock',
            borderColor: ['#D89119'],
            backgroundColor: ['#FAA81D'],
            // borderRadius: Number.MAX_VALUE,
            barThickness: 20,
            
            data: [
              10,20,30
            ],

            borderWidth: 1,
            categoryPercentage:1.0,
          },
          {
            label:'Remock',
            borderColor:['#075575'],
            backgroundColor:['#086288'],
            barThickness:20,
            data:[20,10,25],
            borderWidth: 1,
            categoryPercentage:1.0
          },
        ],
  
      },
      
      options: {
        
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: true,
        // indexAxis: 'y',
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: true,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
}
