import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { ApiService } from '../../../../services/api.service';
import * as Highcharts from 'highcharts';
import moment from 'moment';
import { PatientMedicalRecordWeight } from '../patient-medical-record-weight.model';

import 'highcharts/modules/exporting';
import 'highcharts/modules/accessibility';

@Component({
  selector: 'app-patient-medical-record-weight-chart',
  imports: [
    HighchartsChartModule
  ],
  templateUrl: './patient-medical-record-weight-chart.component.html',
  styleUrl: './patient-medical-record-weight-chart.component.scss'
})
export class PatientMedicalRecordWeightChartComponent implements OnChanges {
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
    this.apiService.get(`medical-record-weight/chart/${this.medicalRecordId}`).subscribe((res : any) => {
      this.drawChart(res.data);
      this.showChart = true;
    })
  }

  drawChart(data : PatientMedicalRecordWeight[]) {
    const categories : string[] = [];
    const weights : number[] = [];

    data.forEach(item => {
      const date = moment(item.date).format('DD/MM/YYYY hh:mm A');
      categories.push(date);
      weights.push(item.weight);
    });

    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Weight'
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
          name: 'Weight',
          data: weights,
          type: 'line'
        },
      ]
    }
  }
}
