import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { ServiceCategory } from './service-category.model';
import { ServiceCategoryModalComponent } from './service-category-modal/service-category-modal.component';

@Component({
  selector: 'app-service-categories',
  imports: [
    DataTableComponent,
    TranslatePipe
  ],
  templateUrl: './service-categories.component.html',
  styleUrl: './service-categories.component.scss'
})
export class ServiceCategoriesComponent implements AfterViewInit {
  url = 'service-categories';
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('totalServiceTemplate') totalServiceTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['name', 'messages.common.name', '', true, 'string'],
    ['services', 'messages.web.total_services', 'text-center', false, 'template'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  constructor(
    private apiService: ApiService,
    private formService: FormService,
  ) {}

  ngAfterViewInit(): void {
    this.columnCustomTemplates['services'] = this.totalServiceTemplate;
  }

  delete(data : ServiceCategory) {
    this.formService.showDeleteConfirm(data?.name || '')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${data.id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }
    
  create() {
    this.formService.openEditCreateModal(ServiceCategoryModalComponent, 'modal-md', {
      title: 'messages.service_category.add_category',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
  
  edit(id: number) {
    this.formService.openEditCreateModal(ServiceCategoryModalComponent, 'modal-md', {
      title: 'messages.service_category.edit_category',
      id,
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
}
