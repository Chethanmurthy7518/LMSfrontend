import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { ApiServiceService } from '../api-service.service';
@Component({
  selector: 'app-mentor-dashboard-graphs',
  templateUrl: './mentor-dashboard-graphs.component.html',
  styleUrls: ['./mentor-dashboard-graphs.component.css'],
})
export class MentorDashboardGraphsComponent implements OnInit {
  LineChart = [];
  PieChart: any = [];
  BarChart: any = [];
  MeSeData = [12, 13, 14, 15, 16, 19];
  MeSeChart = [];
  bid:any
  totalMale: any = 0;
  totalFemale: any = 0;
  pSeventeen: any = 0;
  pEighteen: any = 0;
  pNineteen: any = 0;
  pTwenty: any = 0;
  pTwentyOne: any = 0;
  pTwentyTwo: any = 0;
  listOfEmp:any;
  BEcse:any =0;
  BE:any=0;
  PG:any=0;
  PHD:any=0;
  fresher:any=0;
  oneYear:any=0;
  twoYears:any=0;
  threeYears:any=0;
  fourYears:any=0;
  fiveYears:any=0
  constructor(private api:ApiServiceService) {}
  @Input() dataOfBatchEmp:any;
  
getEmployeesOFBatch(){
     this.api.getEmployeesOfBatch(this.bid).subscribe((res)=>{
       console.log(res);
       this.listOfEmp=res.data;
       console.log(this.listOfEmp);
       
     })
}
  ngOnInit(): void {
    this.dataOfBatchEmp.forEach((val: any)=>{
      this.bid=val.batchId
      console.log("BatchId",this.bid);
      
    })
    
    this.getEmployeesOFBatch()

    this.graphs()
    
    
  }
  
  graphs(){
    console.log();
    
    //Daughnut Chart
    this.totalMale = localStorage.getItem('maleEmployees');
    this.totalFemale = localStorage.getItem('femaleEmployees');
    this.PieChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            data: [this.totalMale, this.totalFemale],
            backgroundColor: ['rgba(24, 44, 82, 1)', 'rgba(237, 146, 50, 1)'],
            borderColor: ['rgba(24, 44, 82, 1)', 'rgba(237, 146, 50, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          text: '',
          display: true,
        },
      },
    });
    // Bar chart1:
    this.pSeventeen = localStorage.getItem('poySeventeen');
    this.pEighteen = localStorage.getItem('poyEighteen');
    this.pNineteen = localStorage.getItem('poyNineteen');
    this.pTwenty = localStorage.getItem('poyTwenty');
    this.pTwentyOne = localStorage.getItem('poyTwentyOne');
    this.pTwentyTwo = localStorage.getItem('poyTwentyTwo');
    this.BarChart = new Chart('barChart1', {
      type: 'horizontalBar',
      data: {
        labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [
          {
            label: 'YOP',

            data: [
              this.pSeventeen,
              this.pEighteen,
              this.pNineteen,
              this.pTwenty,
              this.pTwentyOne,
              this.pTwentyTwo,
            ],
            backgroundColor: [
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
            ],
            borderColor: [
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        title: {
          text: '',
          display: true,
        },
      },
    });

    //Barchart2:
    this.fresher=localStorage.getItem('Fresher')
    this.oneYear = localStorage.getItem('oneYear')
    this.twoYears = localStorage.getItem('twoYears')
    this.threeYears = localStorage.getItem('threeYears')
    this.fourYears = localStorage.getItem('fourYears')
    this.fiveYears = localStorage.getItem('fiveYears')
    this.BarChart = new Chart('barChart2', {
      type: 'horizontalBar',
      data: {
        labels: ['Fresher', '1yr', '2yrs', '3yrs', '4yrs', '5yrs'],
        datasets: [
          {
            label: 'Experiance',
            data: [this.fresher,this.oneYear,this.twoYears,this.threeYears,this.fourYears,this.fiveYears],
            backgroundColor: [
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
            ],
            borderColor: [
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
              'rgba(2, 197, 233, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });

    //barchart3
    this.BEcse=localStorage.getItem('eduBEcse')
    this.BE = localStorage.getItem('eduBE')
    this.PG = localStorage.getItem('eduPG')
    this.PHD = localStorage.getItem('eduPHD')
    this.BarChart = new Chart('barChart3', {
      type: 'bar',
      data: {
        labels: ['BE(CSE)', 'BE(Non-CSE)', 'Post Graduation', 'PHD'],
        datasets: [
          {
            label: '',
            barPercentage: 0.5,
            barThickness: 50,
            // borderRadious: 0.5,
            data: [this.BEcse,this.BE,this.PG,this.PHD],
            backgroundColor: [
              'rgba(255, 0, 124, 1)',
              'rgba(255, 0, 124, 1)',
              'rgba(255, 0, 124, 1)',
              'rgba(255, 0, 124, 1)',
            ],
            borderColor: [
              'rgba(255, 0, 124, 1)',
              'rgba(255, 0, 124, 1)',
              'rgba(255, 0, 124, 1)',
              'rgba(255, 0, 124, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          text: 'Employee Degree',
          display: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              // barPercentage: 0.2,
              // borderRadious: 0.5,
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });

    //pie chart
    this.PieChart = new Chart('pieChart2', {
      type: 'pie',
      data: {
        labels: [
          'Excelent',
          'Good',
          'Above Average',
          'Average',
          'Below Average',
        ],
        datasets: [
          {
            label: '',
            data: [3, 2, 12, 17, 4],
            backgroundColor: [
              'rgba(57, 187, 92, 1)',
              'rgba(45, 181, 238, 1)',
              'rgba(228, 212, 2, 1)',
              'rgba(234, 134, 4, 1)',
              'rgba(228, 3, 71, 1)',
            ],
            borderColor: [
              'rgba(57, 187, 92, 1)',
              'rgba(45, 181, 238, 1)',
              'rgba(228, 212, 2, 1)',
              'rgba(234, 134, 4, 1)',
              'rgba(228, 3, 71, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          
          display: true,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                display:false
              },
              gridLines:{
                display:false
              },
              
            },
          ],
          xAxes:[
            {
              gridLines:{
                display:false
              },
              ticks:{
                display:false
              }
            }
          ]
        },
      },
    });
  }
  

  
}
