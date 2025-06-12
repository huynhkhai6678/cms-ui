import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { ApiService } from '../../../../services/api.service';
import * as Highcharts from 'highcharts';
import moment from 'moment';
import { PatientMedicalRecordTemperature } from '../patient-medical-record-temperature.model';

@Component({
  selector: 'app-patient-medical-record-temperature-chart',
  imports: [
    HighchartsChartModule
  ],
  templateUrl: './patient-medical-record-temperature-chart.component.html',
  styleUrl: './patient-medical-record-temperature-chart.component.scss'
})
export class PatientMedicalRecordTemperatureChartComponent implements OnChanges {

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
    this.apiService.get(`medical-record-temperature/chart/${this.medicalRecordId}`).subscribe((res : any) => {
      this.drawChart(res.data);
      this.showChart = true;
    })
  }

  drawChart(data : PatientMedicalRecordTemperature[]) {
    const categories : string[] = [];
    const temperatures : number[] = [];

    data.forEach(item => {
      const date = moment(item.date).format('DD/MM/YYYY hh:mm A');
      categories.push(date);
      temperatures.push(item.temperature);
    });

    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Temperature'
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
          name: 'Temperature',
          data: temperatures,
          type: 'line'
        },
      ]
    }
  }
}
