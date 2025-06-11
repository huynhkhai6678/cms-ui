import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';

@Component({
  selector: 'app-dashboard-patient-upcomming-appointment',
  imports: [
    RouterLink,
    TranslatePipe,
    DatePipe,
    DataTableComponent
  ],
  templateUrl: './patient-upcomming-appointment.component.html',
  styleUrl: './patient-upcomming-appointment.component.scss'
})
export class DashboardPatientUpcommingAppointmentComponent implements AfterViewInit {
  readonly apiUrl = environment.apiUrl;
  readonly url = 'dashboard/patient-today-appointment';
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('fullNameTemplate') fullNameTemplate!: TemplateRef<any>;
  @ViewChild('uniqueId') uniqueId!: TemplateRef<any>;
  @ViewChild('dateTemplate') dateTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['full_name', 'messages.doctor.doctor', '', false, 'template'],
    ['appointment_date', 'messages.appointment.date', '', false, 'template'],
  ];

  ngAfterViewInit(): void {
    this.columnCustomTemplates['full_name'] = this.fullNameTemplate;
    this.columnCustomTemplates['appointment_date'] = this.dateTemplate;
  }
}
