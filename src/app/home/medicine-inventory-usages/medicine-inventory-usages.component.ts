import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { MedicineInventoryUsageModalComponent } from './medicine-inventory-usage-modal/medicine-inventory-usage-modal.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MEDICINE_USAGE_TYPE } from './medicine-inventory-usages.constant';

@Component({
  selector: 'app-medicine-inventory-usages',
  imports: [
    TranslatePipe,
    CommonModule,
    DataTableComponent,
    DatePipe,
    RouterLink
  ],
  templateUrl: './medicine-inventory-usages.component.html',
  styleUrl: './medicine-inventory-usages.component.scss'
})
export class MedicineInventoryUsagesComponent implements AfterViewInit {
  medicineInventory : any;
  url = 'medicine-inventory-usages';
  clinics = [];
  columnCustomTemplates : Record<string, any> = {};

  types = MEDICINE_USAGE_TYPE;

  @ViewChild('quantityTemplate') quantityTemplate!: TemplateRef<any>;
  @ViewChild('createdTemplate') createdTemplate!: TemplateRef<any>;
  @ViewChild('typeTemplate') typeTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
    private activedRoute : ActivatedRoute,
  ) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['created_at', 'messages.medicine-inventory.date', '', true, 'template'],
    ['quantity', 'messages.medicine-inventory.quantity', '', true, 'template'],
    ['type', 'messages.medicine-inventory.type', '', true, 'template'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  ngAfterViewInit() {
    this.columnCustomTemplates['quantity'] = this.quantityTemplate;
    this.columnCustomTemplates['created_at'] = this.createdTemplate;
    this.columnCustomTemplates['type'] = this.typeTemplate;

    this.activedRoute.params.subscribe((params : any) => {
      const id = params['id'];
      this.apiService.get(`medicine-inventories/${id}`).subscribe((res : any) => {
        this.medicineInventory = res['data'];
        this.dataTableComponent.handleFilterChange({ medicine_id  : this.medicineInventory.id});
      });
    });
  }

  create() {
    this.formService.openEditCreateModal(MedicineInventoryUsageModalComponent, 'modal-md', {
      title: 'messages.medicine-inventory.adjustment',
      medicineInventoryId : this.medicineInventory.id
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
  
  edit(id: number) {
    this.formService.openEditCreateModal(MedicineInventoryUsageModalComponent, 'modal-md', {
      title: 'messages.medicine-inventory.adjustment',
      medicineInventoryId : this.medicineInventory.id,
      id
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
    
  delete(row: any) {
    this.formService.showDeleteConfirm(row.name)
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${row.id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }
}
