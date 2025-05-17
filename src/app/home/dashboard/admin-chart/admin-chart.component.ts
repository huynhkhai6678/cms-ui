import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-dashboard-admin-chart',
  imports: [
    HighchartsChartModule
  ],
  templateUrl: './admin-chart.component.html',
  styleUrl: './admin-chart.component.scss'
})
export class DashboardAdminChartComponent implements OnInit {
  data : any;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.get('dashboard/admin-revenue').subscribe((res : any) => {
      this.data = res.data;
      this.chartOptions = {
        chart: {
          type: 'areaspline'
        },
        title: {
          text: 'Sales'
        },
        xAxis: {
          categories: Object.keys(this.data),
          title: {
            text: 'Month'
          }
        },
        plotOptions: {
          areaspline: {
            fillOpacity: 0.5
          }
        },
        series: [{
          data: Object.values(this.data),
          type: 'areaspline'
        }]
      }
    })
  }

}
