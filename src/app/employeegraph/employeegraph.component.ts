import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-employeegraph',
  templateUrl: './employeegraph.component.html',
  styleUrls: ['./employeegraph.component.css']
})
export class EmployeegraphComponent implements OnInit {
  BarChart!: Chart;
  constructor() { }

  ngOnInit(): void {
   this.barChart()
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
            label: '',
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
            label:'',
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
