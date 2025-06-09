import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TRANSACTION_STATUS } from './transactions.constant';
import { ShareService } from '../../services/share.service';
import { DatePipe } from '@angular/common';
import { downloadFile } from '../../utils/download-file.util';

@Component({
  selector: 'app-transactions',
  imports: [
    DataTableComponent,
    TranslatePipe,
    RouterLink,
    DatePipe
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements AfterViewInit {
  url = 'transactions';
  apiUrl = environment.apiUrl;
  clinics = [];
  columnCustomTemplates : Record<string, any> = {};

  TRANSACTION_STATUS = TRANSACTION_STATUS;
  PAYMENT_METHOD : Record<number, string> = {};

  @ViewChild('billDateTemplate') billDateTemplate!: TemplateRef<any>;
  @ViewChild('fullNameTemplate') fullNameTemplate!: TemplateRef<any>;
  @ViewChild('amountTemplate') amountTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('typeTemplate') typeTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
    private shareService : ShareService,
    private router: Router,
    private toastrService : ToastrService
  ) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['bill_date', 'messages.transaction.bill_date', '', true, 'template'],
    ['transaction_invoice_invoice_number', 'messages.transaction.invoice_no', '', true, 'string'],
    ['full_name', 'messages.visit.patient', '', true, 'template'],
    ['net_amount', 'messages.transaction.amount', '', false, 'template'],
    ['status', 'messages.appointment.status', '', false, 'template'],
    ['payment_type', 'messages.appointment.payment_method', '', false, 'template'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  ngAfterViewInit() {
    this.columnCustomTemplates['bill_date'] = this.billDateTemplate;
    this.columnCustomTemplates['full_name'] = this.fullNameTemplate;
    this.columnCustomTemplates['net_amount'] = this.amountTemplate;
    this.columnCustomTemplates['status'] = this.statusTemplate;
    this.columnCustomTemplates['payment_type'] = this.typeTemplate;
    this.columnCustomTemplates['bill_date'] = this.billDateTemplate;

    this.PAYMENT_METHOD = this.shareService.PAYMENT_METHOD;
    this.dataTableComponent.setDateFilter('today');
  }

  create() {
    const clinicId = this.dataTableComponent.getClinicId();
    this.router.navigate([`/home/transactions/create/0`], { queryParams: {clinicId: clinicId}});
  }
  
  edit(id: number) {
    this.router.navigate([`/home/transactions/create/${id}`]);
  }
    
  delete(row: any) {
    this.formService.showDeleteConfirm(row.invoice_number)
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${row.transaction_invoice_id}`).subscribe((response : any) => {
          this.toastrService.success(response['message']);
          this.dataTableComponent.reloadData();
        })
      }
    });
  }

  activeCategory(id: number, target : any) { 
    this.apiService.post(`${this.url}/update-status/${id}`, {
      active : target.checked
    }).subscribe((response : any) => {
      this.toastrService.success(response['message']);
    })
  }

  changeStatus(input: any) {
    this.dataTableComponent.handleFilterChange({ is_active : input.value});
  }

  formatNumber(value: string) {
    return Number(value).toFixed(2);
  }

  openLabelPage(id: number) {
    const url = `transactions-label/${id}`;
    window.open(url, '_blank');
  }
  
  exportInvoice(id : number) {
    this.apiService.downloadFile(`transactions/export-invoice/${id}`).subscribe({
      next : (response) => {
        downloadFile(response, 'invoice.pdf');
      },
      error : (error) => {
        this.toastrService.error('Error downloading PDF:', error);
      }
    })
  }
}
