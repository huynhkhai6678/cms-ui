import { AfterViewInit, Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { DoctorModalComponent } from '../../doctor-modal/doctor-modal.component';
import { environment } from '../../../../../environments/environment';
import { DataTableComponent } from '../../../../shared/data-table/data-table.component';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { FormService } from '../../../../services/form.service';

@Component({
  selector: 'app-doctor-detail-appointment',
  imports: [
    DataTableComponent,
    DatePipe,
    RouterLink
  ],
  templateUrl: './doctor-detail-appointment.component.html',
  styleUrl: './doctor-detail-appointment.component.scss'
})
export class DoctorDetailAppointmentComponent implements AfterViewInit {
  readonly url = 'doctors/appointments';
  readonly apiUrl = environment.apiUrl;

  apiService = inject(ApiService);
  formService = inject(FormService);

  columnCustomTemplates : Record<string, any> = {};

  @Input() doctorId = 0;

  @ViewChild('fullNameTemplate') fullNameTemplate!: TemplateRef<any>;
  @ViewChild('appointmetAtTemplate') appointmetAtTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['full_name', 'messages.visit.patient', '', true, 'template'],
    ['appointment_at', 'messages.appointment.appointment_at', '', true, 'template'],
    ['action', 'messages.common.action', '', false, 'action']
  ];

  ngAfterViewInit(): void {
    this.columnCustomTemplates['full_name'] = this.fullNameTemplate;
    this.columnCustomTemplates['appointment_at'] = this.appointmetAtTemplate;
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
    this.formService.openEditCreateModal(DoctorModalComponent, 'modal-xl', {
      title: 'messages.patient.edit',
      id,
      clinicId : this.dataTableComponent.getClinicId()
    });
  }
}
