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
    this.getEmployeeMockDetails(this.employeeId)
   
  }
  getEmployeeAttendance(id:any){
    this.api.getEmployeeAttendance(id).subscribe((res)=>{
      console.log(res);
      for(let Attend of res.data){
        console.log(Attend);
        
        this.Attendance =Attend.session
        // console.log(this.Attendance);
        if(this.Attendance){
          if(this.Attendance.morning === true){
            this.morningAttendance++
          }
          if(this.Attendance.noon === true){
            this.noonAttendance++
          }
        }
      }
    })
  }
  
  mockDetails:any
  mock1:any;
  mock2:any;
  mock3:any;
  reMock1:any;
  reMock2:any;
  reMock3:any;
  getEmployeeMockDetails(id:any){
    this.api.getMockRatings(id).subscribe({next:((res)=>{
      
      if(!res.error){
        // console.log("EmployeeMock",res);
        this.mockDetails = res.data
        for(let mock of this.mockDetails){
          console.log("mock",mock);
          if(mock.mockType === 'Mock'){
            if(mock.technology.technologyName === 'HTML,CSS,Bootstrap' || mock.technology.technologyName === 'Java'){
              if(mock.feedback === 'Below Average'){
                this.mock1=1
             }else if(mock.feedback === 'Average'){
               this.mock1=2
             }else if(mock.feedback === 'Above Average'){
                this.mock1=3
             }else if(mock.feedback === 'Good'){
               this.mock1=4
             }else if(mock.feedback === 'Excellent'){
               this.mock1=5
             }
            }
            if(mock.technology.technologyName === 'Javascript' || mock.technology.technologyName === 'SpringBoot'){
              if(mock.feedback === 'Below Average'){
                this.mock2=1
             }else if(mock.feedback === 'Average'){
               this.mock2=2
             }else if(mock.feedback === 'Above Average'){
                this.mock2=3
             }else if(mock.feedback === 'Good'){
               this.mock2=4
             }else if(mock.feedback === 'Excellent'){
               this.mock2=5
             }
            }
            if(mock.technology.technologyName === 'Angular' || mock.technology.technologyName === 'React' || mock.technology.technologyName === 'SpringBoot'){
              if(mock.feedback === 'Below Average'){
                this.mock3=1
             }else if(mock.feedback === 'Average'){
               this.mock3=2
             }else if(mock.feedback === 'Above Average'){
                this.mock3=3
             }else if(mock.feedback === 'Good'){
               this.mock3=4
             }else if(mock.feedback === 'Excellent'){
               this.mock3=5
             }
            }
            
          }

          else if(mock.mockType === 'Remock'){
            if(mock.technology.technologyName === 'HTML,CSS,Bootstrap' || mock.technology.technologyName === 'Java'){
              if(mock.feedback === 'Below Average'){
                this.reMock1=1
             }else if(mock.feedback === 'Average'){
               this.reMock1=2
             }else if(mock.feedback === 'Above Average'){
                this.reMock1=3
             }else if(mock.feedback === 'Good'){
               this.reMock1=4
             }else if(mock.feedback === 'Excellent'){
               this.reMock1=5
             }
            }
            if(mock.technology.technologyName === 'Javascript' || mock.technology.technologyName === 'SpringBoot'){
              if(mock.feedback === 'Below Average'){
                this.reMock2=1
             }else if(mock.feedback === 'Average'){
               this.reMock2=2
             }else if(mock.feedback === 'Above Average'){
                this.reMock2=3
             }else if(mock.feedback === 'Good'){
               this.reMock2=4
             }else if(mock.feedback === 'Excellent'){
               this.reMock2=5
             }
            }
            if(mock.technology.technologyName === 'Angular' || mock.technology.technologyName === 'React' || mock.technology.technologyName === 'SpringBoot'){
              if(mock.feedback === 'Below Average'){
                this.reMock3=1
             }else if(mock.feedback === 'Average'){
               this.reMock3=2
             }else if(mock.feedback === 'Above Average'){
                this.reMock3=3
             }else if(mock.feedback === 'Good'){
               this.reMock3=4
             }else if(mock.feedback === 'Excellent'){
               this.reMock3=5
             }
            }
          }
          
        }
        this.barChart()
      }
    }),error:((err)=>{
      console.log(err);
      
    })})
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
              this.mock1,this.mock2,this.mock3
            ],

            borderWidth: 1,
            categoryPercentage:1.0,
          },
          {
            label:'Remock',
            borderColor:['#075575'],
            backgroundColor:['#086288'],
            barThickness:20,
            data:[this.reMock1,this.reMock2,this.reMock3],
            borderWidth: 1,
            categoryPercentage:1.0
          },
        ],
  
      },
      
      options: {
        aspectRatio:2.5,
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
            ticks:{
              callback: function (value, index, ticks) {
                switch (value) {
                  case 0:
                    return '';
                  case 1:
                    return 'Below Average';
                  case 2:
                    return 'Average';
                  case 3:
                    return 'Good';
                  case 4:
                    return 'Very good';
                  case 5:
                    return 'Excellent'
                }
                return;
              },
            }
          },
        },
      },
    });
  }
}
