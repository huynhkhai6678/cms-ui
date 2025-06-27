import { AfterViewInit, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { DoctorModalComponent } from './doctor-modal/doctor-modal.component';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Doctor } from './doctor.model';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-doctors',
  imports: [
    DataTableComponent,
    TranslatePipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent implements AfterViewInit {
  readonly url = 'doctors';
  columnCustomTemplates : Record<string, any> = {};
  readonly apiUrl = environment.apiUrl;
  apiService = inject(ApiService);
  formService = inject(FormService);

  @ViewChild('fullNameTemplate') fullNameTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('emailVerifyTemplate') emailVerifyTemplate!: TemplateRef<any>;
  @ViewChild('createdAtTemplate') createdAtTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['full_name', 'messages.doctor.doctor', '', true, 'template'],
    ['status', 'messages.common.status', '', true, 'template'],
    ['email_verified_at', 'messages.common.email_verified', '', true, 'template'],
    ['user_created_at', 'messages.patient.registered_on', '', true, 'template'],
    ['action', 'messages.common.action', '', false, 'action']
  ];

  ngAfterViewInit(): void {
    this.columnCustomTemplates['full_name'] = this.fullNameTemplate;
    this.columnCustomTemplates['status'] = this.statusTemplate;
    this.columnCustomTemplates['email_verified_at'] = this.emailVerifyTemplate;
    this.columnCustomTemplates['user_created_at'] = this.createdAtTemplate;
  }

  delete(data : Doctor) {
    this.formService.showDeleteConfirm(data?.full_name || '')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${data.doctor_id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }

  create() {
    this.formService.openEditCreateModal(DoctorModalComponent, 'modal-lg', {
      title: 'messages.doctor.add',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(DoctorModalComponent, 'modal-lg', {
      title: 'messages.doctor.edit',
      id,
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  activeDoctor(item : Doctor, input: any) {
    this.apiService.post(`users/update-status/${item.user_id}`, {
      status: input.checked
    }).subscribe(() => {
      this.dataTableComponent.reloadData();
    })
  }

  verifyDoctor(item : Doctor) {
    this.apiService.get(`users/verify/${item.user_id}`).subscribe(() => {
      this.dataTableComponent.reloadData();
    })
  }
}
