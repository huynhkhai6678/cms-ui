import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { ApiService } from '../../../services/api.service';
import * as Highcharts from 'highcharts';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-doctor-appointment-chart',
  imports: [
    TranslatePipe,
    HighchartsChartModule
  ],
  templateUrl: './doctor-appointment-chart.component.html',
  styleUrl: './doctor-appointment-chart.component.scss'
})
export class DashboardDoctorAppointmentChartComponent implements OnChanges {
  data : any;
  showChart = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  @Input() clinicId = 0;

  constructor(private apiService: ApiService, private dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clinicId']) {
      this.getData();
    }
  }

  getData() {
    console.log(';;;;');
    this.apiService.get(`dashboard/doctor-appointment-chart?clinic_id=${this.clinicId}`).subscribe((res : any) => {
      this.data = res.data;
      this.drawChart(res.data);
      this.calculateAppointment(res.data);
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

  calculateAppointment(data : Record<string, number>) {
    const now = new Date();
    const lastMonthIndex = now.getMonth() > 0 ? now.getMonth() - 1 :  0;

    Object.entries(data).forEach((month, index) => {
      const value = month[1]; 
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
