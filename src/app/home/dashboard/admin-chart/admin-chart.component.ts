import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ApiService } from '../../../services/api.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-admin-chart',
  imports: [
    HighchartsChartModule
  ],
  templateUrl: './admin-chart.component.html',
  styleUrl: './admin-chart.component.scss'
})
export class DashboardAdminChartComponent implements OnChanges {
  data : any;
  showChart = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  totalRevenue = 0;
  
  @Input() clinicId = 0;

  constructor(private apiService: ApiService, private dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clinicId']) {
      this.getData();
    }
  }

  getData() {
    this.apiService.get(`dashboard/admin-revenue?clinic_id=${this.clinicId}`).subscribe((res : any) => {
      this.data = res.data;
      this.drawChart(res.data);
      this.calculateRevenue(res.data);
      this.showChart = true;
    })
  }

  drawChart(data : Record<string, number>) {
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
        data: Object.values(data),
        type: 'areaspline'
      }]
    }
  }

  calculateRevenue(data : Record<string, number>) {
    this.totalRevenue  = 0;
    const now = new Date();
    const lastMonthIndex = now.getMonth() > 0 ? now.getMonth() - 1 :  0;
    Object.entries(data).forEach((month, index) => {
      const value = month[1]; 
      this.totalRevenue += value;

      if (lastMonthIndex === index) {
        this.dashboardService.updateEarningLastMonth(value);
      }

      // This month
      if ((lastMonthIndex + 1) === index) {
        this.dashboardService.updateEarningThisMonth(value);
      }
    });
  }
}
