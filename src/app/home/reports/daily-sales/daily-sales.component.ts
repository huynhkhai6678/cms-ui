import { DatePipe, DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { ShareService } from '../../../services/share.service';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { ApiService } from '../../../services/api.service';
import moment from 'moment';

@Component({
  selector: 'app-daily-sales',
  imports: [
    DatePipe,
    DecimalPipe,
    DataTableComponent,
    HighchartsChartModule
  ],
  templateUrl: './daily-sales.component.html',
  styleUrl: './daily-sales.component.scss'
})
export class DailySalesComponent implements AfterViewInit {
  readonly url = 'reports/sales';
  columnCustomTemplates : Record<string, any> = {};
  PAYMENT_METHOD : Record<string, any> = {};

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  showChart = false;

  totalTransaction = 0;
  totalRevenue = 0;
  chartData : any[] = [];

  @ViewChild('typeTemplate') typeTemplate!: TemplateRef<any>;
  @ViewChild('dateTemplate') dateTemplate!: TemplateRef<any>;
  @ViewChild('netAmountTemplate') netAmountTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    public shareService: ShareService,
    private apiService: ApiService,
  ) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['row_index', 'messages.visit.no', '', true, 'string'],
    ['bill_date', 'messages.transaction.bill_date', '', true, 'template'],
    ['patient_patient_mrn', 'messages.patient.patient_mrn', '', true, 'string'],
    ['full_name', 'messages.patient.name', '', true, 'string'],
    ['user_id_number', 'messages.patient.id_number', '', true, 'string'],
    ['transaction_invoice_invoice_number', 'messages.transaction.invoice_no', '', true, 'string'],
    ['transaction_invoice_amount', 'messages.transaction.amount', '', true, 'template'],
    ['transaction_invoice_payment_type', 'messages.medicine_bills.payment_type', '', false, 'template'],
    ['transaction_invoice_net_amount', 'messages.transaction.pay_amount', '', true, 'template'],
  ];

  ngAfterViewInit(): void {
    this.PAYMENT_METHOD = this.shareService.PAYMENT_METHOD;
    this.columnCustomTemplates['transaction_invoice_net_amount'] = this.netAmountTemplate;
    this.columnCustomTemplates['transaction_invoice_amount'] = this.netAmountTemplate;
    this.columnCustomTemplates['transaction_invoice_payment_type'] = this.typeTemplate;
    this.columnCustomTemplates['bill_date'] = this.dateTemplate;
    this.dataTableComponent.setDateFilter('today');
    this.getDailyChart();
  }

  getDailyChart() {
    const clinicId = this.dataTableComponent.getClinicId();
    const date = this.dataTableComponent.getDateRange();
    const startDate = moment(date[0]).format('YYYY-MM-DD');
    const endDate = moment(date[1]).format('YYYY-MM-DD');
    this.showChart = false;

    this.apiService.get(`reports/sale-pie-chart?clinic_id=${clinicId}&start_date=${startDate}&end_date=${endDate}`).subscribe((res : any) => {
      this.chartData = res['chart_data'];
      this.totalTransaction = res['total_transaction'];
      this.totalRevenue = res['total_revenue'];
      
      this.chartOptions = {
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Daily Sales Value'
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
            data: this.chartData
          }
        ],
      }

      this.showChart = true;
    });
  }
}
