import { Component, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { UserModalComponent } from './user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  imports: [
    DataTableComponent,
    TranslatePipe
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  url = 'users';

  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  columnCustomTemplates : Record<string, any> = {};

  constructor(
      private apiService: ApiService,
      private formService: FormService
  ) {
  
  }

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['first_name', 'messages.patient.first_name', '', true, 'string'],
    ['last_name', 'messages.patient.last_name', '', true, 'string'],
    ['email', 'messages.patient.email', '', true, 'string'],
    ['contact', 'messages.patient.contact', '', true, 'string'],
    ['total_clinic', 'messages.user_manage.clinic_qty', '', true, 'string'],
    ['clinic_chain.name', 'messages.user_manage.chain', '', true, 'object'],
    ['action', 'Action', '', false, 'action'],
  ];

  edit(id: number) {
    this.formService.openEditCreateModal(UserModalComponent, 'modal-lg', {
      title: 'messages.user_manage.edit_user',
      userId: id
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
  
  create() {
    this.formService.openEditCreateModal(UserModalComponent, 'modal-lg', {
      title: 'messages.user_manage.add_user'
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

}
