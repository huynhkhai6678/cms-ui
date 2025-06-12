import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { FormService } from '../../../services/form.service';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { PatientMedicalRecordTemperature } from './patient-medical-record-temperature.model';
import { PatientMedicalRecordTemperatureChartComponent } from './patient-medical-record-temperature-chart/patient-medical-record-temperature-chart.component';
import { PatientMedicalRecordTemperatureModalComponent } from './patient-medical-record-temperature-modal/patient-medical-record-temperature-modal.component';

@Component({
  selector: 'app-patient-medical-record-temperature',
  imports: [
    TranslatePipe,
    DatePipe,
    RouterLink,
    DataTableComponent,
    PatientMedicalRecordTemperatureChartComponent
  ],
  templateUrl: './patient-medical-record-temperature.component.html',
  styleUrl: './patient-medical-record-temperature.component.scss'
})
export class PatientMedicalRecordTemperatureComponent implements OnInit, AfterViewInit {
  url = 'medical-record-temperature';
  tableUrl = '';
  medicalRecordId = 0;
  columnCustomTemplates : Record<string, any> = {};

  readonly tableColumns : any = [
    ['date', 'messages.medical_record.date', '', false, 'template'],
    ['time', 'messages.medical_record.time', '', false, 'template'],
    ['temperature', 'messages.medical_record.temperature', '', false, 'string'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  @ViewChild('dateTemplate') dateTemplate!: TemplateRef<any>;
  @ViewChild('timeTemplate') timeTemplate!: TemplateRef<any>;
  @ViewChild(PatientMedicalRecordTemperatureChartComponent) chartComponent!: PatientMedicalRecordTemperatureChartComponent;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private formService: FormService,
    private apiService: ApiService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activedRoute.params.subscribe((params : any) => {
      this.medicalRecordId = params['id'];
      this.tableUrl = `medical-record-temperature/all/${this.medicalRecordId}`;
    });
  }

  ngAfterViewInit(): void {
    this.columnCustomTemplates['date'] = this.dateTemplate;
    this.columnCustomTemplates['time'] = this.timeTemplate;
  }
  
  delete(data : PatientMedicalRecordTemperature) {
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
    this.formService.openEditCreateModal(PatientMedicalRecordTemperatureModalComponent, 'modal-md', {
      title: 'messages.common.add',
      medicalRecordId : this.medicalRecordId
    }, () => {
      this.dataTableComponent.reloadData();
      this.chartComponent.getData();
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(PatientMedicalRecordTemperatureModalComponent, 'modal-md', {
      title: 'messages.common.edit',
      id,
      medicalRecordId : this.medicalRecordId
    }, () => {
      this.dataTableComponent.reloadData();
      this.chartComponent.getData();
    });
  }
}
