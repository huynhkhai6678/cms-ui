import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ApiService } from '../../services/api.service';
import { ClinicModalComponent } from './clinic-modal/clinic-modal.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-clinics',
  imports: [
    DataTableComponent,
    TranslatePipe,
  ],
  templateUrl: './clinics.component.html',
  styleUrl: './clinics.component.scss'
})
export class ClinicsComponent implements AfterViewInit { 
  url = 'clinics';

  @ViewChild('contactNumberTemplate') contactNumberTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  columnCustomTemplates : Record<string, any> = {};

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['name', 'Name', '', true, 'string'],
    ['type_text', 'Type', '', true, 'string'],
    ['address.address1', 'address', '', true, 'object'],
    ['address.state.name', 'State', '', true, 'object'],
    ['address.postal_code', 'Postal code', '', false, 'object'],
    ['contact_number', 'Contact number', '', false, 'template'],
    ['action', 'Action', '', false, 'action'],
  ];

  constructor(
    private apiService: ApiService,
    private formService: FormService
  ) {

  }

  ngAfterViewInit() {
    this.columnCustomTemplates['contact_number'] = this.contactNumberTemplate;
  }

  editClinic(id: number) {
    this.formService.openEditCreateModal(ClinicModalComponent, 'modal-lg', {
      title: 'messages.clinics.edit_clinic',
      clinicId: id
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  delete(id: number) {
    this.formService.showDeleteConfirm('Are you sure you want to delete this?')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }

  openCreateClinic() {
    this.formService.openEditCreateModal(ClinicModalComponent, 'modal-lg', {
      title: 'messages.clinics.add_clinic'
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
}
