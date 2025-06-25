import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { ShareService } from '../../../services/share.service';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import moment from 'moment';

@Component({
  selector: 'app-service-inventory-sales',
  imports: [
    HighchartsChartModule,
    DatePipe,
    DecimalPipe,
    DataTableComponent
  ],
  templateUrl: './service-inventory-sales.component.html',
  styleUrl: './service-inventory-sales.component.scss'
})
export class ServiceInventorySalesComponent implements AfterViewInit {
  readonly url = 'reports/services';
  columnCustomTemplates : Record<string, any> = {};

  Highcharts: typeof Highcharts = Highcharts;
  chartServiceAndInventoryOptions: Highcharts.Options = {};
  totalServiceAndInventoryRevenue = 0;
  showServiceAndInventoryChart = false;

  chartServiceOptions: Highcharts.Options = {};
  totalServiceRevenue = 0;
  showServiceChart = false;

  chartInventoryOptions: Highcharts.Options = {};
  totalInventoryRevenue = 0;
  showInventoryChart = false;

  @ViewChild('typeTemplate') typeTemplate!: TemplateRef<any>;
  @ViewChild('dateTemplate') dateTemplate!: TemplateRef<any>;
  @ViewChild('priceTemplate') priceTemplate!: TemplateRef<any>;
  @ViewChild('amountTemplate') amountTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    public shareService: ShareService,
    private apiService : ApiService
  ) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['row_index', 'messages.visit.no', '', true, 'string'],
    ['transaction_invoice_service_created_at', 'messages.transaction.bill_date', '', true, 'template'],
    ['patient_patient_mrn', 'messages.patient.patient_mrn', '', true, 'string'],
    ['full_name', 'messages.patient.name', '', true, 'string'],
    ['user_id_number', 'messages.patient.id_number', '', true, 'string'],
    ['transaction_invoice_invoice_number', 'messages.transaction.invoice_no', '', true, 'string'],
    ['transaction_invoice_service_type', 'messages.transaction.category', '', false, 'string'],
    ['transaction_invoice_service_name', 'messages.transaction.description', '', false, 'string'],
    ['transaction_invoice_service_quantity', 'messages.transaction.quantity', '', false, 'string'],
    ['transaction_invoice_service_price', 'messages.transaction.price', '', false, 'template'],
    ['transaction_invoice_service_sub_total', 'messages.transaction.total_amount', '', true, 'template'],
  ];

  ngAfterViewInit(): void {
    this.columnCustomTemplates['transaction_invoice_service_price'] = this.priceTemplate;
    this.columnCustomTemplates['transaction_invoice_service_sub_total'] = this.amountTemplate;
    this.columnCustomTemplates['transaction_invoice_service_created_at'] = this.dateTemplate;
    this.dataTableComponent.setDateFilter('today');
    this.getChartData();
  }

  getChartData() {
    const clinicId = this.dataTableComponent.getClinicId();
    const date = this.dataTableComponent.getDateRange();
    const startDate = moment(date[0]).format('YYYY-MM-DD');
    const endDate = moment(date[1]).format('YYYY-MM-DD');

    this.getServiceAndInventoryChart(clinicId, startDate, endDate);
    this.getServiceChart(clinicId, startDate, endDate);
    this.getInventoryChart(clinicId, startDate, endDate);
  }

  getServiceAndInventoryChart(clinicId : number, startDate : string, endDate: string) {

    this.apiService.get(`reports/service-inventory-chart?clinic_id=${clinicId}&start_date=${startDate}&end_date=${endDate}`).subscribe((res : any) => {
      const data = res['chart_data'];
      this.totalServiceAndInventoryRevenue = res['total_revenue'];
      
      this.chartServiceAndInventoryOptions = {
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Service & Inventories (Combined)'
        },
        credits: { enabled: false },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [
              {
                enabled: true,
                distance: 20
              },
              {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7
                },
                filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 5
                }
              }]
            }
        },
        tooltip: {
          formatter: function() {
            return '<span style="font-size: 0.8em">' + this.key + '</span><br/>' +
            '<span style="color:' + this.color +  '"></span>' + this.series.name + ' : <b>' + this.y + '%</b><br/>' +
            '<span style="color:' + this.color +  '"></span>' + 'Total amount' + ' : <b>' + 'RM ' + Highcharts.numberFormat(this.x, 2) + '</b><br/>';
          }
        },
        series: [
          {
            type: 'pie',
            name: 'Percentage',
            data: data
          }
        ]
      }

      this.showServiceAndInventoryChart = true;
    });
  }

  getServiceChart(clinicId : number, startDate : string, endDate: string) {

    this.apiService.get(`reports/service-chart?clinic_id=${clinicId}&start_date=${startDate}&end_date=${endDate}`).subscribe((res : any) => {
      const data = res['chart_data'];
      this.totalServiceRevenue = res['total_revenue'];
      
      this.chartServiceOptions = {
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Services Only'
        },
        credits: { enabled: false },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [
              {
                enabled: true,
                distance: 20
              },
              {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7
                },
                filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 5
                }
              }]
            }
        },
        tooltip: {
          formatter: function() {
            return '<span style="font-size: 0.8em">' + this.key + '</span><br/>' +
            '<span style="color:' + this.color +  '"></span>' + this.series.name + ' : <b>' + this.y + '%</b><br/>' +
            '<span style="color:' + this.color +  '"></span>' + 'Total amount' + ' : <b>' + 'RM ' + Highcharts.numberFormat(this.x, 2) + '</b><br/>';
          }
        },
        series: [
          {
            type: 'pie',
            name: 'Percentage',
            data: data
          }
        ]
      }

      this.showServiceChart = true;
    });
  }

  getInventoryChart(clinicId : number, startDate : string, endDate: string) {

    this.apiService.get(`reports/inventory-chart?clinic_id=${clinicId}&start_date=${startDate}&end_date=${endDate}`).subscribe((res : any) => {
      const data = res['chart_data'];
      this.totalInventoryRevenue = res['total_revenue'];
      
      this.chartInventoryOptions = {
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Inventories Only'
        },
        credits: { enabled: false },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [
              {
                enabled: true,
                distance: 20
              },
              {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7
                },
                filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 5
                }
              }]
            }
        },
        tooltip: {
          formatter: function() {
            return '<span style="font-size: 0.8em">' + this.key + '</span><br/>' +
            '<span style="color:' + this.color +  '"></span>' + this.series.name + ' : <b>' + this.y + '%</b><br/>' +
            '<span style="color:' + this.color +  '"></span>' + 'Total amount' + ' : <b>' + 'RM ' + Highcharts.numberFormat(this.x, 2) + '</b><br/>';
          }
        },
        series: [
          {
            type: 'pie',
            name: 'Percentage',
            data: data
          }
        ]
      }

      this.showInventoryChart = true;
    });
  }
}
