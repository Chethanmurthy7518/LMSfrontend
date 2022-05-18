import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
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
  totalMale: any = 0;
  totalFemale: any = 0;
  pSeventeen: any = 0;
  pEighteen: any = 0;
  pNineteen: any = 0;
  pTwenty: any = 0;
  pTwentyOne: any = 0;
  pTwentyTwo: any = 0;

  constructor() {}

  ngOnInit(): void {
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
            label: '',

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
          text: 'Year of Passing',
          display: true,
        },
      },
    });
  }
}
