import { AfterViewInit, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { DataTableComponent } from '../../../../shared/data-table/data-table.component';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { FormService } from '../../../../services/form.service';
import { PatientModalComponent } from '../../patient-modal/patient-modal.component';
import { ShareService } from '../../../../services/share.service';

@Component({
  selector: 'app-patient-detail-appointment',
  imports: [
    DataTableComponent,
    DatePipe,
    RouterLink
  ],
  templateUrl: './patient-detail-appointment.component.html',
  styleUrl: './patient-detail-appointment.component.scss'
})
export class PatientDetailAppointmentComponent implements AfterViewInit {
  url = 'patients/appointments';
  columnCustomTemplates : Record<string, any> = {};
  apiUrl = environment.apiUrl;
  APPOINTMENT_STATUS : Record<string, any> = {}

  @Input() patientId = 0;

  @ViewChild('fullNameTemplate') fullNameTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('appointmetAtTemplate') appointmetAtTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private apiService: ApiService,
    private formService: FormService,
    private shareService: ShareService,
  ) {}

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['full_name', 'messages.visit.patient', '', true, 'template'],
    ['appointment_at', 'messages.appointment.appointment_at', '', true, 'template'],
    ['status', 'messages.appointment.status', '', true, 'template'],
    ['action', 'messages.common.action', '', false, 'action']
  ];

  ngAfterViewInit(): void {
    this.columnCustomTemplates['full_name'] = this.fullNameTemplate;
    this.columnCustomTemplates['status'] = this.statusTemplate;
    this.columnCustomTemplates['appointment_at'] = this.appointmetAtTemplate;
    this.APPOINTMENT_STATUS = this.shareService.APPOINTMENT_STATUS
  }

  delete(data : any) {
    this.formService.showDeleteConfirm(data?.full_name || '')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`appointments/${data.appontment_id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(PatientModalComponent, 'modal-xl', {
      title: 'messages.patient.edit',
      id,
      clinicId : this.dataTableComponent.getClinicId()
    });
  }
}
