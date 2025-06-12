import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { FormService } from '../../../services/form.service';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { PatientMedicalRecordPulseRate } from './patient-medical-record-pulse-rate.model';
import { PatientMedicalRecordPulseRateChartComponent } from './patient-medical-record-pulse-rate-chart/patient-medical-record-pulse-rate-chart.component';
import { PatientMedicalRecordPulseRateModalComponent } from './patient-medical-record-pulse-rate-modal/patient-medical-record-pulse-rate-modal.component';

@Component({
  selector: 'app-patient-medical-record-blood-pressure',
  imports: [
    TranslatePipe,
    DatePipe,
    RouterLink,
    DataTableComponent,
    PatientMedicalRecordPulseRateChartComponent
  ],
  templateUrl: './patient-medical-record-pulse-rate.component.html',
  styleUrl: './patient-medical-record-pulse-rate.component.scss'
})
export class PatientMedicalRecordPulseRateComponent implements OnInit, AfterViewInit {
  url = 'medical-record-pulse-rate';
  tableUrl = '';
  medicalRecordId = 0;
  columnCustomTemplates : Record<string, any> = {};

  readonly tableColumns : any = [
    ['date', 'messages.medical_record.date', '', false, 'template'],
    ['time', 'messages.medical_record.time', '', false, 'template'],
    ['pulse', 'messages.medical_record.pulse_rate', '', false, 'string'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  @ViewChild('dateTemplate') dateTemplate!: TemplateRef<any>;
  @ViewChild('timeTemplate') timeTemplate!: TemplateRef<any>;
  @ViewChild(PatientMedicalRecordPulseRateChartComponent) chartComponent!: PatientMedicalRecordPulseRateChartComponent;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private formService: FormService,
    private apiService: ApiService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activedRoute.params.subscribe((params : any) => {
      this.medicalRecordId = params['id'];
      this.tableUrl = `medical-record-pulse-rate/all/${this.medicalRecordId}`;
    });
  }

  ngAfterViewInit(): void {
    this.columnCustomTemplates['date'] = this.dateTemplate;
    this.columnCustomTemplates['time'] = this.timeTemplate;
  }
  
  delete(data : PatientMedicalRecordPulseRate) {
    this.formService.showDeleteConfirm(data?.date || '')
    .subscribe(confirmed => {
      if (confirmed) {
        this.apiService.delete(`${this.url}/${data.id}`).subscribe(() => {
          this.dataTableComponent.reloadData();
          this.chartComponent.getData();
        })
      }
    });
  }

  create() {
    this.formService.openEditCreateModal(PatientMedicalRecordPulseRateModalComponent, 'modal-md', {
      title: 'messages.common.add',
      medicalRecordId : this.medicalRecordId
    }, () => {
      this.dataTableComponent.reloadData();
      this.chartComponent.getData();
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(PatientMedicalRecordPulseRateModalComponent, 'modal-md', {
      title: 'messages.common.edit',
      id,
      medicalRecordId : this.medicalRecordId
    }, () => {
      this.dataTableComponent.reloadData();
      this.chartComponent.getData();
    });
  }
}
