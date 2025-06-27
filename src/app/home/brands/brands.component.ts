import { AfterViewInit, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { BrandModalComponent } from './brand-modal/brand-modal.component';
import { Brand } from './brand.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  imports: [
    DataTableComponent,
    TranslatePipe
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements AfterViewInit {
  url = 'brands';
  readonly apiService = inject(ApiService);
  readonly formService = inject(FormService);
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('phoneTemplate') phoneTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['name', 'messages.common.name', '', true, 'string'],
    ['email', 'messages.patient.email', '', true, 'string'],
    ['phone', 'messages.web.phone', '', true, 'string'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  ngAfterViewInit() {
    this.columnCustomTemplates['type'] = this.phoneTemplate;
  }

  create() {
    this.formService.openEditCreateModal(BrandModalComponent, 'modal-lg', {
      title: 'messages.medicine.new_medicine_brand',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
  
  edit(id: number) {
    this.formService.openEditCreateModal(BrandModalComponent, 'modal-lg', {
      title: 'messages.medicine.edit_medicine_brand',
      clinicId : this.dataTableComponent.getClinicId(),
      id
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
    
  delete(row: Brand) {
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
