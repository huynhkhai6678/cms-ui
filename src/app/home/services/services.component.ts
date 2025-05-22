import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { ServiceModalComponent } from './service-modal/service-modal.component';
import { Service } from './service.model';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-services',
  imports: [
    DataTableComponent,
    TranslatePipe
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements AfterViewInit {
  url = 'services';
  apiUrl = environment.apiUrl;
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('iconTemplate') iconTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['icon', 'messages.common.icon', '', false, 'template'],
    ['name', 'messages.common.name', '', true, 'string'],
    ['category.name', 'messages.service.category', '', true, 'object'],
    ['charges', 'messages.appointment.service_charge', '', true, 'template'],
    ['status', 'messages.common.state', '', false, 'template'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  constructor(
    private apiService: ApiService,
    private formService: FormService,
  ) {}

  ngAfterViewInit(): void {
    this.columnCustomTemplates['icon'] = this.iconTemplate;
    this.columnCustomTemplates['status'] = this.statusTemplate;
  }

  delete(data : Service) {
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
    this.formService.openEditCreateModal(ServiceModalComponent, 'modal-lg', {
      title: 'messages.service.add_service',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(ServiceModalComponent, 'modal-lg', {
      title: 'messages.service.edit_service',
      clinicId : this.dataTableComponent.getClinicId(),
      id
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
  
  activeService(item : Service, input: any) {
    this.apiService.post(`${this.url}/update-status/${item.id}`, {
      status: input.checked
    }).subscribe(() => {
      this.dataTableComponent.reloadData();
    })
  }
  
}
