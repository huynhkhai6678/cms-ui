import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../shared/data-table/data-table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { DoctorHoliday } from './doctor-holiday.model';
import { DoctorHolidayModalComponent } from './doctor-holiday-modal/doctor-holiday-modal.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-doctor-holidays',
  imports: [
    DataTableComponent,
    DatePipe,
    TranslatePipe,
  ],
  templateUrl: './doctor-holidays.component.html',
  styleUrl: './doctor-holidays.component.scss'
})
export class DoctorHolidaysComponent implements AfterViewInit {
  url = 'doctor-holidays';
  columnCustomTemplates : Record<string, any> = {};

  @ViewChild('dateTemplate') dateTemplate!: TemplateRef<any>;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  // field, header name, css, sortable, type
  readonly tableColumns : any = [
    ['full_name', 'messages.doctor.doctor', '', true, 'string'],
    ['doctor_holiday_name', 'messages.web.reason', '', true, 'string'],
    ['date', 'messages.appointment.date', '', true, 'template'],
    ['action', 'messages.common.action', '', false, 'action']
  ];

  ngAfterViewInit(): void {
    this.columnCustomTemplates['date'] = this.dateTemplate;
  }

  constructor(
    private apiService: ApiService,
    private formService: FormService,
  ) {}
  
  delete(data : DoctorHoliday) {
    this.formService.showDeleteConfirm(data?.full_name || '')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${data.doctor_holiday_id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
        })
      }
    });
  }

  create() {
    this.formService.openEditCreateModal(DoctorHolidayModalComponent, 'modal-lg', {
      title: 'messages.holiday.add_holiday',
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(DoctorHolidayModalComponent, 'modal-lg', {
      title: 'messages.holiday.edit_holiday',
      id,
      clinicId : this.dataTableComponent.getClinicId()
    }, () => {
      this.dataTableComponent.reloadData();
    });
  }
}
