import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { ApiService } from '../../../../services/api.service';
import * as Highcharts from 'highcharts';
import moment from 'moment';
import { PatientMedicalRecordBloodPressure } from '../patient-medical-record-blood-pressure.model';

@Component({
  selector: 'app-patient-medical-record-blood-pressure-chart',
  imports: [
    HighchartsChartModule
  ],
  templateUrl: './patient-medical-record-blood-pressure-chart.component.html',
  styleUrl: './patient-medical-record-blood-pressure-chart.component.scss'
})
export class PatientMedicalRecordBloodPressureChartComponent implements OnChanges {
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
    this.apiService.get(`medical-record-blood-pressure/chart/${this.medicalRecordId}`).subscribe((res : any) => {
      this.drawChart(res.data);
      this.showChart = true;
    })
  }

  drawChart(data : PatientMedicalRecordBloodPressure[]) {
    const categories : string[] = [];
    const diastolics : number[] = [];
    const systolics : number[] = [];

    data.forEach(item => {
      const date = moment(item.date).format('DD/MM/YYYY hh:mm A');
      categories.push(date);
      diastolics.push(item.bp_diastolic);
      systolics.push(item.bp_systolic);
    });

    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Blood Pressure'
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
          name: 'BP Systolic',
          data: systolics,
          type: 'line'
        },
        {
          name: 'BP Diastolic',
          data: diastolics,
          type: 'line'
        }
      ]
    }
  }
}
