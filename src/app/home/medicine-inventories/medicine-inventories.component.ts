import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { MedicineInventoryModalComponent } from './medicine-inventory-modal/medicine-inventory-modal.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-medicine-inventories',
  imports: [
    RouterLink,
    TranslatePipe,
    DataTableComponent,
    RouterLink,
    DatePipe
  ],
  templateUrl: './medicine-inventories.component.html',
  styleUrl: './medicine-inventories.component.scss'
})
export class MedicineInventoriesComponent implements AfterViewInit {
  medicine : any = null;
  url = 'medicine-inventories';
  clinics = [];
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('quantityTemplate') quantityTemplate!: TemplateRef<any>;
  @ViewChild('createdTemplate') createdTemplate!: TemplateRef<any>;
  @ViewChild('expiryTemplate') expiryTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
    private activedRoute: ActivatedRoute,
  ) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['created_at', 'messages.medicine-inventory.date', '', true, 'template'],
    ['quantity', 'messages.medicine-inventory.quantity', '', true, 'template'],
    ['bonus', 'messages.medicine-inventory.bonus', '', true, 'string'],
    ['price', 'messages.medicine-inventory.price', '', true, 'string'],
    ['cost_per_unit', 'messages.medicine-inventory.cost_per_unit', '', true, 'string'],
    ['uom', 'messages.medicine-inventory.uom', '', true, 'string'],
    ['expiration_date', 'messages.medicine-inventory.expiration_date', '', true, 'template'],
    ['batch_number', 'messages.medicine-inventory.batch_number', '', true, 'string'],
    ['description', 'messages.medicine-inventory.description', '', true, 'string'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  ngAfterViewInit() {
    this.columnCustomTemplates['quantity'] = this.quantityTemplate;
    this.columnCustomTemplates['created_at'] = this.createdTemplate;
    this.columnCustomTemplates['expiration_date'] = this.expiryTemplate;

    this.activedRoute.params.subscribe((params : any) => {
      const id = params['id'];
      this.apiService.get(`medicines/${id}`).subscribe((res : any) => {
        this.medicine = res['data'];
        this.dataTableComponent.handleFilterChange({ medicine_id  : this.medicine.id});
      });
    });
  }

  create() {
    this.formService.openEditCreateModal(MedicineInventoryModalComponent, 'modal-xl', {
      title: 'messages.medicine.new_medicine_category',
      uom: this.medicine.uom,
      medicineId: this.medicine.id
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
  
  edit(id: number) {
    this.formService.openEditCreateModal(MedicineInventoryModalComponent, 'modal-xl', {
      title: 'messages.medicine.edit_medicine_category',
      uom: this.medicine.uom,
      medicineId: this.medicine.id,
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
