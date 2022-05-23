import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartType } from 'chart.js';

import { ApiServiceService } from '../api-service.service';

Chart.register(...registerables);
@Component({
  selector: 'app-mentor-dashboard-graphs',
  templateUrl: './mentor-dashboard-graphs.component.html',
  styleUrls: ['./mentor-dashboard-graphs.component.css'],
})
export class MentorDashboardGraphsComponent implements OnInit, OnChanges {
  LineChart = [];
  PieChart!: Chart;
  BarChart!: Chart;
  MeSeData = [12, 13, 14, 15, 16, 19];
  MeSeChart = [];
  bid: any;
  totalMale: any = 0;
  totalFemale: any = 0;
  pSeventeen: any = 0;
  pEighteen: any = 0;
  pNineteen: any = 0;
  pTwenty: any = 0;
  pTwentyOne: any = 0;
  pTwentyTwo: any = 0;
  listOfEmp: any;
  BEcse: any = 0;
  BE: any = 0;
  PG: any = 0;
  PHD: any = 0;
  fresher: any = 0;
  oneYear: any = 0;
  twoYears: any = 0;
  threeYears: any = 0;
  fourYears: any = 0;
  fiveYears: any = 0;
  BarChart1!: Chart<'bar', any[], string>;
  BarChart2!: Chart<'bar', any[], string>;
  constructor(private api: ApiServiceService) {}
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  // @Input() dataOfBatchEmp: any;

  // getEmployeesOFBatch() {
  //   this.api.getEmployeesOfBatch(this.bid).subscribe((res) => {
  //     console.log("res",res);
  //     this.listOfEmp = res.data;
  //     console.log(this.listOfEmp);
  //   });
  // }

  ngOnInit(): void {
    
    this.getEmployeesOFBatch();
    
  }

  getEmployeesOFBatch() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails')!);
    this.api.getEmployeesOfBatch(userDetails.batchId).subscribe((res) => {
      //  console.log(res);
      this.listOfEmp = res.data;
      console.log(this.listOfEmp);
      for (let emp of this.listOfEmp) {
        //  console.log(emp.gender.toLowerCase());
        if (emp.gender.toLowerCase() === 'male') {
          this.totalMale++;
        } else {
          this.totalFemale++;
        }
        console.log('F', this.totalFemale);
      }
      for (let aemp of this.listOfEmp) {
        // console.log(emp.educationDetails);
        for (let emp of aemp.educationDetails) {
          console.log('Education Details', emp);

          if (emp.yop === '2017') {
            this.pSeventeen++;
          } else if (emp.yop === '2018') {
            this.pEighteen++;
          } else if (emp.yop === '2019') {
            this.pNineteen++;
          } else if (emp.yop === '2020') {
            this.pTwenty++;
          } else if (emp.yop === '2021') {
            this.pTwentyOne++;
          } else if (emp.yop === '2022') {
            this.pTwentyTwo++;
          }

          if (emp.educationType === 'BE' && emp.specialization === 'CSE') {
            this.BEcse++;
          } else if (emp.educationType === 'BE') {
            this.BE++;
          } else if (emp.educationType === 'PG') {
            this.PG++;
          } else if (emp.educationType === 'PGD') {
            this.PHD++;
          }
        }
        console.log("BE",this.BE);
        

        for (let exp of aemp.experiance) {
          console.log('Exp', exp);
          if (exp.eYoe === 'Fresher' || exp.eYoe === '0.6') {
            this.fresher++;
          } else if (
            exp.eYoe === '1 year' ||
            exp.eYoe === '1 Year' ||
            exp.eYoe === '1'
          ) {
            this.oneYear++;
          } else if (
            exp.eYoe === '2 years' ||
            exp.eYoe === '2 Years' ||
            exp.eYoe === '2'
          ) {
            this.twoYears++;
          } else if (
            exp.eYoe === '3 years' ||
            exp.eYoe === '3 Years' ||
            exp.eYoe === '3'
          ) {
            this.threeYears++;
          } else if (
            exp.eYoe === '4 years' ||
            exp.eYoe === '4 Years' ||
            exp.eYoe === '4'
          ) {
            this.fourYears++;
          } else if (
            exp.eYoe === ' 5 years' ||
            exp.eYoe === '5 Years' ||
            exp.eYoe === '5'
          ) {
            this.fiveYears++;
          }
        }
      }
      this.donoughtGraphs();
      this.barChart1();
      this.barChart2();
      this.barChart3();
      this.pieChart();
    });
  }

  donoughtGraphs() {
    console.log('TotalMale', this.totalMale);
    console.log('TotalFemal', this.totalFemale);

    // this.totalMale = localStorage.getItem('maleEmployees');
    // this.totalFemale = localStorage.getItem('femaleEmployees');
    if (this.PieChart) {
      this.PieChart?.destroy();
    }
    this.PieChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            data: [this.totalMale, this.totalFemale],
            label: 'employees',

            borderColor: ['#086288', 'orange'],
            backgroundColor: ['#086288', 'orange'],
          },
        ],
      },
      options: {
        aspectRatio: 1.5,
        cutout: 50,

        hover: {
          mode: 'nearest',
          intersect: false,
        },

        maintainAspectRatio: true,
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
            },
          },
        },
      },
    });
  }

  barChart1() {
    
    console.log("Seventeen",this.pSeventeen);
    console.log("Eighteen",this.pEighteen);
    
    if(this.BarChart){
      this.BarChart?.destroy();
    }
    this.BarChart = new Chart('barChart1', {
      type: 'bar',
      data: {
        labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [
          {
            label: 'YOP',
            borderColor: ['#2DB5EE'],
            backgroundColor: ['#2DB5EE'],
            borderRadius: Number.MAX_VALUE,
            barThickness: 10,

            data: [
              this.pSeventeen,
              this.pEighteen,
              this.pNineteen,
              this.pTwenty,
              this.pTwentyOne,
              this.pTwentyTwo,
            ],

            borderWidth: 1,
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
        indexAxis: 'y',
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
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

  barChart2() {
    // this.fresher = localStorage.getItem('Fresher');
    // this.oneYear = localStorage.getItem('oneYear');
    // this.twoYears = localStorage.getItem('twoYears');
    // this.threeYears = localStorage.getItem('threeYears');
    // this.fourYears = localStorage.getItem('fourYears');
    // this.fiveYears = localStorage.getItem('fiveYears');
    this.BarChart1?.destroy();
    this.BarChart1 = new Chart('barChart2', {
      type: 'bar',
      data: {
        labels: ['Fresher', '1yr', '2yrs', '3yrs', '4yrs', '5yrs'],
        datasets: [
          {
            label: 'Experiance',
            data: [
              this.fresher,
              this.oneYear,
              this.twoYears,
              this.threeYears,
              this.fourYears,
              this.fiveYears,
            ],
            borderColor: ['#2DB5EE'],
            backgroundColor: ['#2DB5EE'],
            borderRadius: Number.MAX_VALUE,
            barThickness: 10,

            borderWidth: 1,
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
        indexAxis: 'y',
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
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

  barChart3() {
    // this.BEcse = localStorage.getItem('eduBEcse');
    // this.BE = localStorage.getItem('eduBE');
    // this.PG = localStorage.getItem('eduPG');
    // this.PHD = localStorage.getItem('eduPHD');
    this.BarChart2?.destroy();
    this.BarChart2 = new Chart('barChart3', {
      type: 'bar',
      data: {
        labels: ['BE(CSE)', 'BE(Non-CSE)', 'Post Graduation', 'PHD'],
        datasets: [
          {
            label: '',
            barPercentage: 0.5,
            barThickness: 20,
            borderRadius: Number.MAX_VALUE,
            data: [this.BEcse, this.BE, this.PG, this.PHD],
            backgroundColor: ['#FF007C'],
            borderColor: ['#DC006B'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 3.2,
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: true,
        elements: {
          bar: {
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
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

  pieChart() {
    this.PieChart = new Chart('pieChart', {
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
              '#E40347',
              '#39BB5C',
              '#2DB5EE',
              '#E4D402',
              '#EA8604',
            ],

            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 2,
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 20,

              usePointStyle: true,
            },
          },
        },
      },
    });
  }
}
