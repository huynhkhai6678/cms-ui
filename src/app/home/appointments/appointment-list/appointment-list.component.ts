import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';
import { FormService } from '../../../services/form.service';
import { ShareService } from '../../../services/share.service';

@Component({
  selector: 'app-appointment-list',
  imports: [
    DataTableComponent,
    TranslatePipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent implements AfterViewInit {
  url = 'appointments';
  columnCustomTemplates : Record<string, any> = {};
  apiUrl = environment.apiUrl;

  @ViewChild('patientNameTemplate') patientNameTemplate!: TemplateRef<any>;
  @ViewChild('doctorNameTemplate') doctorNameTemplate!: TemplateRef<any>;
  @ViewChild('profileTemplate') profileTemplate!: TemplateRef<any>;
  @ViewChild('apptTemplate') apptTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
    public shareService: ShareService,
  ) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['appointment_date', 'messages.visit.appointment_time', '', false, 'template'],
    ['patient_full_name', 'messages.visit.patient', '', true, 'template'],
    ['user_profile', 'messages.patient.profile', '', true, 'template'],
    ['doctor_full_name', 'messages.visit.doctor', '', true, 'template'],
    ['appointment_service', 'messages.common.service', '', true, 'string'],
    ['appointment_description', 'messages.visit.description', '', true, 'string'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  ngAfterViewInit(): void {
    this.columnCustomTemplates['patient_full_name'] = this.patientNameTemplate;
    this.columnCustomTemplates['doctor_full_name'] = this.doctorNameTemplate;
    this.columnCustomTemplates['user_profile'] = this.profileTemplate;
    this.columnCustomTemplates['appointment_date'] = this.apptTemplate;
   
    this.dataTableComponent.setDateFilter('today');
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
}
