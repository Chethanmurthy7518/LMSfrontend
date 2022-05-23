import { Component, Input, OnInit } from '@angular/core';
import { Chart,registerables} from 'chart.js'

@Component({
  selector: 'app-batch-employee-details',
  templateUrl: './batch-employee-details.component.html',
  styleUrls: ['./batch-employee-details.component.css']
})
export class BatchEmployeeDetailsComponent implements OnInit {
  @Input() empData:any;
  lineChart:any = [];
 
  constructor() { }

  ngOnInit(): void {
    
    //Line Chart
    this.lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['Mock 1', 'Mock 2', 'Mock 3', 'Mock 4', 'Mock 5'],
        datasets: [
          {
            data: [1,2,3,2,4],
            fill: false,
            // backgroundColor: ['rgba(24, 44, 82, 1)', 'rgba(237, 146, 50, 1)'],

            // borderColor: ['rgb(250,168,29)','rgb(250,168,29)'],
            borderWidth: 5,
          },
        ],
      },
      options: {
        
        scales:{
          x:
            {
              grid:{
                display:false
              }
            },
          
          y:
            {
              grid:{
                display:false
              },
              
            }
          
        }
      },
    });
  }

}
