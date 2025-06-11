import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-dashboard-doctor-appointment',
  imports: [
    TranslatePipe,
    RouterLink,
    DatePipe,
    DataTableComponent
  ],
  templateUrl: './doctor-appointment.component.html',
  styleUrl: './doctor-appointment.component.scss'
})
export class DashboardDoctorAppointmentComponent implements AfterViewInit, OnChanges {
  readonly apiUrl = environment.apiUrl;
  readonly FILTER_DATES : Record<string, any> = {
    today : {
      start_date : moment().format('YYYY-MM-DD'),
      end_date: moment().format('YYYY-MM-DD')
    },
    week: {
      start_date: moment().startOf('week').format('YYYY-MM-DD'),
      end_date: moment().endOf('week').format('YYYY-MM-DD')
    },
    month: {
      start_date: moment().startOf('month').format('YYYY-MM-DD'),
      end_date: moment().endOf('month').format('YYYY-MM-DD')
    }
  }

  url = '';
  columnCustomTemplates : Record<string, any> = {};
  filterDate = 'today';

  @Input() clinicId = 0;

  @ViewChild('fullNameTemplate') fullNameTemplate!: TemplateRef<any>;
  @ViewChild('uniqueId') uniqueId!: TemplateRef<any>;
  @ViewChild('dateTemplate') dateTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['full_name', 'messages.admin_dashboard.name', '', false, 'template'],
    ['patient_unique_id', 'messages.admin_dashboard.patient_id', '', false, 'template'],
    ['appointment_date', 'messages.appointment.date', '', false, 'template'],
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clinicId']) {
      // this.dataTableComponent.setClinicFilter(this.clinicId);
      this.url = `dashboard/doctor-appointment/${this.clinicId}`;
      if (this.dataTableComponent) {
        this.dataTableComponent.reloadData();
      }
    }
  }

  ngAfterViewInit(): void {
    this.columnCustomTemplates['full_name'] = this.fullNameTemplate;
    this.columnCustomTemplates['patient_unique_id'] = this.uniqueId;
    this.columnCustomTemplates['appointment_date'] = this.dateTemplate;
  }

  setFilterDay(value: string) {
    this.filterDate = value;
    const filterOption = this.FILTER_DATES[value];
    this.dataTableComponent.handleFilterChange(filterOption);
  }
}
