import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { MedicinePurchaseModalComponent } from './medicine-purchase-modal/medicine-purchase-modal.component';
import { PAYMENT_TYPE } from './medicine-purchase.constant';
import { ShowMedicinePurchaseModalComponent } from './show-medicine-purchase-modal/show-medicine-purchase-modal.component';
import { downloadFile } from '../../utils/download-file.util';

@Component({
  selector: 'app-medicine-purchase',
  imports: [
    DataTableComponent,
    TranslatePipe,
    DatePipe,
  ],
  templateUrl: './medicine-purchase.component.html',
  styleUrl: './medicine-purchase.component.scss'
})
export class MedicinePurchaseComponent implements AfterViewInit {
  readonly url = 'medicine-purchase';
  readonly PAYMENT_TYPE = PAYMENT_TYPE;
  apiService = inject(ApiService);
  formService = inject(FormService);

  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('createTemplate') createTemplate!: TemplateRef<any>;
  @ViewChild('purchaseNumberTemplate') purchaseNumberTemplate!: TemplateRef<any>;
  @ViewChild('paymentTemplate') paymentTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['created_at', 'messages.web.created_at', '', true, 'template'],
    ['purchase_no', 'messages.purchase_medicine.purchase_number', '', true, 'template'],
    ['brand.name', 'messages.supplier', '', true, 'object'],
    ['total', 'messages.purchase_medicine.total', '', true, 'string'],
    ['tax', 'messages.purchase_medicine.tax', '', true, 'string'],
    ['discount', 'messages.purchase_medicine.discount', '', true, 'string'],
    ['net_amount', 'messages.purchase_medicine.net_amount', '', true, 'string'],
    ['payment_type', 'messages.purchase_medicine.payment_mode', '', true, 'template'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  ngAfterViewInit() {
    this.columnCustomTemplates['created_at'] = this.createTemplate;
    this.columnCustomTemplates['purchase_no'] = this.purchaseNumberTemplate;
    this.columnCustomTemplates['payment_type'] = this.paymentTemplate;
  }

  create() {
    this.formService.openEditCreateModal(MedicinePurchaseModalComponent, 'modal-xl', {
      title: 'messages.purchase_medicine.purchase_medicines',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
  
  show(id: number) {
    this.formService.openEditCreateModal(ShowMedicinePurchaseModalComponent, 'modal-xl', {
      id
    });
  }
    
  delete(row: any) {
    this.formService.showDeleteConfirm(row.purchase_no)
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${row.id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }

  export() {
    const clinicId = this.dataTableComponent.getClinicId();
    this.apiService.downloadFile(`medicine-purchase/export/${clinicId}`).subscribe({
        next : (response) => {
          downloadFile(response, 'report.xlsx')
        },
        error : (error) => {
          console.error('Error downloading PDF:', error);
        }
    })
  }
}
