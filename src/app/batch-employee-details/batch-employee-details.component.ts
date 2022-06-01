import { Component, Input, OnInit } from '@angular/core';
import { Chart, Interaction, registerables } from 'chart.js';
import { ApiServiceService } from '../api-service.service';

interface MockData{
  empId:string;
  batchId:string;
  mockType:string;
  mockTakenBy:string;
  technology:any;
  practicalKnowledge:string;
  theoreticalKnowledge:string;
  feedback:string;
  detailedFeedback:string
}
@Component({
  selector: 'app-batch-employee-details',
  templateUrl: './batch-employee-details.component.html',
  styleUrls: ['./batch-employee-details.component.css'],
})
export class BatchEmployeeDetailsComponent implements OnInit {
  @Input() empData: any;
  lineChart: any = [];
  attendance: any;
  morning: any = 0;
  noon: any = 0;
  belowAverage:any=0;
  average: any = 1;
  good: any = 2;
  veryGood: any = 3;
  excellent: any = 4;
  constructor(private api: ApiServiceService) {}

  ngOnInit(): void {
    console.log(this.empData.empId);
    
    this.getEmployeeAttendance(this.empData.empId);
    this.getEmployeeMockDetails(this.empData.empId);
    
  }

  getEmployeeAttendance(id: any) {
    this.api.getEmployeeAttendance(id).subscribe((res) => {
      console.log(res);
      for (let attend of res.data) {
        this.attendance = attend.session;
        console.log('Attendance', this.attendance);
        if (this.attendance.morning === true) {
          this.morning++;
        }
        if (this.attendance.noon === true) {
          this.noon++;
        }
      }
    });
  }
  
  employeeMockData:MockData[]=[]
  mock1:any;
  mock2:any;
  mock3:any;
  mock4:any;
  mock5:any;

  getEmployeeMockDetails(id: any) {
    this.api.getMockRatings(id).subscribe((res) => {
      // console.log("Mock",res);
      this.employeeMockData=res.data
      console.log("Mock",this.employeeMockData);
      for(let mock of this.employeeMockData){
        if(mock.technology.technologyName === 'HTML,CSS,Bootstrap' || mock.technology.technologyName === 'Java'){
          console.log(('First IF'));
          
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
        console.log("Mock 1",this.mock1);
        
        if(mock.technology.technologyName === 'Javascript' || mock.technology.technologyName === 'SpringBoot'){
          // console.log(('First IF'));
          
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
        console.log("Mock 2",this.mock2);
        
        if(mock.technology.technologyName === 'Angular' || mock.technology.technologyName === 'React' || mock.technology.technologyName === 'SpringBoot'){
          // console.log(('First IF'));
          
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
      
      this.lineChartFun();
    }); 
  }
  lineChartFun() {
    //Line Chart
    console.log("Mock1 In graph",this.mock1);
    this.lineChart = new Chart('lineChart', {
      
      type: 'line',
      data: {
        labels: ['Mock 1', 'Mock 2', 'Mock 3', 'Mock 4', 'Mock 5'],
        datasets: [
          {
            
            
            // data:[mock1feedback,mock2feedback,mock3feedback,mock3feedback,]
            data: [this.mock1,this.mock2,this.mock3,this.mock4,this.mock5],
            fill: false,
            borderColor: '#FAA81D',
            borderWidth: 3,
            pointBorderColor: '#FAA81D',
            pointBackgroundColor: '#FFFFFF',
            pointBorderWidth: 1,
            pointStyle: 'circle',
            pointRadius: 6,
          },
        ],
      },
      options: {
        aspectRatio: 3,
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              align: 'start',
              stepSize: 1,
            },
            grid: {
              display: false,
            },
          },

          y: {
            beginAtZero: true,
            ticks: {
              align: 'start',
              stepSize: 0,
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
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
}
