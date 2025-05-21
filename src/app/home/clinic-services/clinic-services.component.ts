import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ClinicService } from './clinic-service.model';
import { ClinicServiceModalComponent } from './clinic-service-modal/clinic-service-modal.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-clinic-services',
  imports: [
    DataTableComponent,
    TranslatePipe
  ],
  templateUrl: './clinic-services.component.html',
  styleUrl: './clinic-services.component.scss'
})
export class ClinicServicesComponent implements AfterViewInit {
  url = 'clinic-services';
  columnCustomTemplates : Record<string, any> = {};
  CATEGORIES_MAP : Record<number, string> = {
    1 : 'General',
    2 : 'Consultation',
    3 : 'Treatment',
    4 : 'Procedure',
    5 : 'Investigation',
    6 : 'Laboratory',
    7 : 'Administrative'
  }

  @ViewChild('activeTemplate') activeTemplate!: TemplateRef<any>;
  @ViewChild('categoryTemplate') categoryTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
  ) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['name', 'messages.clinic-service.name', '', true, 'string'],
    ['category', 'messages.clinic-service.category', '', true, 'template'],
    ['price', 'messages.clinic-service.price', '', true, 'string'],
    ['cost', 'messages.clinic-service.cost', '', true, 'string'],
    ['active', 'messages.common.active', '', true, 'template'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  ngAfterViewInit() {
    this.columnCustomTemplates['active'] = this.activeTemplate;
    this.columnCustomTemplates['category'] = this.categoryTemplate;
  }

  delete(data : ClinicService) {
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
    this.formService.openEditCreateModal(ClinicServiceModalComponent, 'modal-lg', {
      title: 'messages.clinic-service.add_clinic_service'
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(ClinicServiceModalComponent, 'modal-lg', {
      title: 'messages.clinic-service.edit_clinic_service',
      id
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  changeStatus(input: any) {
    this.dataTableComponent.handleFilterChange({ active : input.value});
  }

  activeService(item : ClinicService, input: any) {
    this.apiService.post(`${this.url}/update-active/${item.id}`, {
      active: input.checked
    }).subscribe(() => {
      this.dataTableComponent.reloadData();
    })
  }

  getCategoryName(category: number): string {
    return this.CATEGORIES_MAP[category] || 'Unknown Category';
  }
}
