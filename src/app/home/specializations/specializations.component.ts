import { Component, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { FormService } from '../../services/form.service';
import { ApiService } from '../../services/api.service';
import { Specialization } from './specialization.model';
import { TranslatePipe } from '@ngx-translate/core';
import { SpecializationModalComponent } from './specialization-modal/specialization-modal.component';

@Component({
  selector: 'app-specializations',
  imports: [
    DataTableComponent,
    TranslatePipe
  ],
  templateUrl: './specializations.component.html',
  styleUrl: './specializations.component.scss'
})
export class SpecializationsComponent {
  url = 'specializations';
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
  ) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['name', 'messages.clinic-service.name', '', true, 'string'],
    ['action', 'messages.common.action', '', false, 'action']
  ];

  delete(data : Specialization) {
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
    this.formService.openEditCreateModal(SpecializationModalComponent, 'modal-md', {
      title: 'messages.specialization.add_specialization'
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(SpecializationModalComponent, 'modal-md', {
      title: 'messages.specialization.edit_specialization',
      id
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
}
