import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { RoleModalComponent } from './role-modal/role-modal.component';

@Component({
  selector: 'app-roles',
  imports: [
    DataTableComponent,
    TranslatePipe
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements AfterViewInit {
  url = 'roles';

  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;
  @ViewChild('permissionTemplate') permissionTemplate!: TemplateRef<any>;

  columnCustomTemplates : Record<string, any> = {};

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['display_name', 'messages.common.name', '', true, 'string'],
    ['permissions', 'messages.role.permissions', '', false, 'template'],
    ['action', 'Action', '', false, 'action'],
  ];

  constructor(
    private apiService: ApiService,
    private formService: FormService
  ) {

  }

  ngAfterViewInit(): void {
    this.columnCustomTemplates['permissions'] = this.permissionTemplate;
  }

  edit(id: number) {
    this.formService.openEditCreateModal(RoleModalComponent, 'modal-lg', {
      title: 'messages.role.edit_role',
      id
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
  
  delete(id: number, name: string) {
    this.formService.showDeleteConfirm(name)
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }

  create() {
    this.formService.openEditCreateModal(RoleModalComponent, 'modal-lg', {
      title: 'messages.role.add_role'
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  getBadgeColor(index : number)
  {
      const colors = [
          'primary',
          'danger',
          'success',
          'info',
          'warning',
          'dark',
      ];

      index = index % 6;
      return colors[index];
  }
}
