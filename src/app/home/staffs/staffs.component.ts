import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { StaffModalComponent } from './staff-modal/staff-modal.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-staffs',
  imports: [
    DataTableComponent,
    TranslatePipe,
  ],
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.scss'
})
export class StaffsComponent implements AfterViewInit {
  url = 'staffs';
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('fullNameTemplate') fullNameTemplate!: TemplateRef<any>;
  @ViewChild('emailVerifyTemplate') emailVerifyTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(private apiService: ApiService, private formService: FormService,) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['full_name', 'messages.doctor.doctor', '', true, 'template'],
    ['role_display_name', 'messages.role.role', '', true, 'string'],
    ['email_verified_at', 'messages.common.email_verified', '', true, 'template'],
    ['action', 'messages.common.action', '', false, 'action']
  ];

  ngAfterViewInit(): void {
    this.columnCustomTemplates['full_name'] = this.fullNameTemplate;
    this.columnCustomTemplates['email_verified_at'] = this.emailVerifyTemplate;
  }

  delete(data: any) {
    this.formService.showDeleteConfirm(data?.full_name || '')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${data.user_id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }

  // Specific create function
  create() {
    this.formService.openEditCreateModal(StaffModalComponent, 'modal-lg', {
      title: 'messages.staff.add_staff',
      clinicId: this.dataTableComponent.getClinicId(),
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  // Specific edit function
  edit(id: number) {
    this.formService.openEditCreateModal(StaffModalComponent, 'modal-lg', {
      title: 'messages.staff.edit_staff',
      id,
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  verifyStaff(id : number) {
    this.apiService.get(`users/verify/${id}`).subscribe(() => {
      this.dataTableComponent.reloadData();
    })
  }
}
