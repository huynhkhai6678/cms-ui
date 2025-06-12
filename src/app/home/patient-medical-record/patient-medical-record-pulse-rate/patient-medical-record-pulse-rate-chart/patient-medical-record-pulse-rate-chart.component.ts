import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { ApiService } from '../../../../services/api.service';
import * as Highcharts from 'highcharts';
import moment from 'moment';
import { PatientMedicalRecordPulseRate } from '../patient-medical-record-pulse-rate.model';

@Component({
  selector: 'app-patient-medical-record-pulse-rate-chart',
  imports: [
    HighchartsChartModule
  ],
  templateUrl: './patient-medical-record-pulse-rate-chart.component.html',
  styleUrl: './patient-medical-record-pulse-rate-chart.component.scss'
})
export class PatientMedicalRecordPulseRateChartComponent implements OnChanges {

  showChart = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  @Input() medicalRecordId = 0;

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['medicalRecordId']) {
      this.getData();
    }
  }

  getData() {
    this.apiService.get(`medical-record-pulse-rate/chart/${this.medicalRecordId}`).subscribe((res : any) => {
      this.drawChart(res.data);
      this.showChart = true;
    })
  }

  drawChart(data : PatientMedicalRecordPulseRate[]) {
    const categories : string[] = [];
    const pulses : number[] = [];

    data.forEach(item => {
      const date = moment(item.date).format('DD/MM/YYYY hh:mm A');
      categories.push(date);
      pulses.push(item.pulse);
    });

    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Pulse'
      },
      xAxis: {
        title: {
          text: 'Date'
        },
        categories: categories
      },
      tooltip: {
        pointFormat: '{point.y}'
      },
      credits: { enabled: false },
      series: [
        {
          name: 'Pulse',
          data: pulses,
          type: 'line'
        },
      ]
    }
  }
}
