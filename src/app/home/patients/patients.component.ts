import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { PatientModalComponent } from './patient-modal/patient-modal.component';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patients',
  imports: [
    DataTableComponent,
    TranslatePipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent implements AfterViewInit {
  url = 'patients';
  columnCustomTemplates : Record<string, any> = {};
  apiUrl = environment.apiUrl;

  @ViewChild('fullNameTemplate') fullNameTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('emailVerifyTemplate') emailVerifyTemplate!: TemplateRef<any>;
  @ViewChild('createdAtTemplate') createdAtTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
  ) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['full_name', 'messages.visit.patient', '', true, 'template'],
    ['user_id_number', 'messages.patient.id_number', '', true, 'string'],
    ['user_contact', 'messages.patient.contact', '', true, 'string'],
    ['user_dob', 'messages.patient.dob', '', true, 'string'],
    ['total_visit', 'messages.doctor_dashboard.total_visits', '', true, 'string'],
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

  delete(data : any) {
    this.formService.showDeleteConfirm(data?.full_name || '')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${data.patient_id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }

  create() {
    this.formService.openEditCreateModal(PatientModalComponent, 'modal-xl', {
      title: 'messages.patient.add',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(PatientModalComponent, 'modal-xl', {
      title: 'messages.patient.edit',
      id,
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  verifyPatient(id : number){
    this.apiService.get(`users/verify/${id}`).subscribe(() => {
      this.dataTableComponent.reloadData();
    })
  }
}
