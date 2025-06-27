import { AfterViewInit, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { StaffModalComponent } from './staff-modal/staff-modal.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-staffs',
  imports: [
    DataTableComponent,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.scss'
})
export class StaffsComponent implements AfterViewInit {
  readonly url = 'staffs';
  readonly apiUrl = environment.apiUrl;
  columnCustomTemplates : Record<string, any> = {};

  apiService = inject(ApiService);
  formService = inject(FormService);

  @ViewChild('fullNameTemplate') fullNameTemplate!: TemplateRef<any>;
  @ViewChild('emailVerifyTemplate') emailVerifyTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;


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

  create() {
    this.formService.openEditCreateModal(StaffModalComponent, 'modal-lg', {
      title: 'messages.staff.add_staff',
      clinicId: this.dataTableComponent.getClinicId(),
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

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
