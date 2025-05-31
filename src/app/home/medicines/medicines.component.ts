import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { MedicineModalComponent } from './medicine-modal/medicine-modal.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-medicines',
  imports: [
    DataTableComponent,
    TranslatePipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './medicines.component.html',
  styleUrl: './medicines.component.scss'
})
export class MedicinesComponent implements AfterViewInit {
  url = 'medicines';
  clinics = [];
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('nameTemplate') nameTemplate!: TemplateRef<any>;
  @ViewChild('supplierTemplate') supplierTemplate!: TemplateRef<any>;
  @ViewChild('categoryTemplate') categoryTemplate!: TemplateRef<any>;
  @ViewChild('quantityTemplate') quantityTemplate!: TemplateRef<any>;
  @ViewChild('expiryTemplate') expiryTemplate!: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
    private toastrService: ToastrService
  ) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['name', 'messages.common.name', '', true, 'template'],
    ['category_name', 'messages.medicine.categories', '', true, 'template'],
    ['brand_name', 'messages.medicine.medicine_brands', '', true, 'template'],
    ['available_quantity', 'messages.medicine.available_quantity', '', true, 'template'],
    ['first_expiration_date', 'messages.medicine.expiry', '', true, 'template'],
    ['buying_price', 'messages.medicine.buying_price', '', true, 'string'],
    ['selling_price', 'messages.medicine.selling_price', '', true, 'string'],
    ['active', 'messages.medicine.active', '', true, 'template'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  ngAfterViewInit() {
    this.columnCustomTemplates['name'] = this.nameTemplate;
    this.columnCustomTemplates['category_name'] = this.categoryTemplate;
    this.columnCustomTemplates['brand_name'] = this.supplierTemplate;
    this.columnCustomTemplates['available_quantity'] = this.quantityTemplate;
    this.columnCustomTemplates['first_expiration_date'] = this.expiryTemplate;
    this.columnCustomTemplates['active'] = this.activeTemplate;
  }

  create() {
    this.formService.openEditCreateModal(MedicineModalComponent, 'modal-xl', {
      title: 'messages.medicine.new_medicine_category',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
  
  edit(id: number) {
    this.formService.openEditCreateModal(MedicineModalComponent, 'modal-xl', {
      title: 'messages.medicine.edit_medicine_category',
      clinicId : this.dataTableComponent.getClinicId(),
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

  changeStatus(input: any) {
    this.dataTableComponent.handleFilterChange({ is_active : input.value});
  }

  activeMedicine(id: number, target : any) {
    this.apiService.post(`${this.url}/update-status/${id}`, {
      active : target.checked
    }).subscribe((response : any) => {
      this.toastrService.success(response['message']);
    })
  }
}
