import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { DataTableComponent } from '../../../shared/data-table/data-table.component';
import { FormService } from '../../../services/form.service';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { PatientMedicalRecordWeight } from './patient-medical-record-weight.model';
import { PatientMedicalRecordWeightModalComponent } from './patient-medical-record-weight-modal/patient-medical-record-weight-modal.component';
import { PatientMedicalRecordWeightChartComponent } from './patient-medical-record-weight-chart/patient-medical-record-weight-chart.component';

@Component({
  selector: 'app-patient-medical-record-blood-pressure',
  imports: [
    TranslatePipe,
    DatePipe,
    RouterLink,
    DataTableComponent,
    PatientMedicalRecordWeightChartComponent
],
  templateUrl: './patient-medical-record-weight.component.html',
  styleUrl: './patient-medical-record-weight.component.scss'
})
export class PatientMedicalRecordWeightComponent implements OnInit, AfterViewInit {
  url = 'medical-record-weight';
  tableUrl = '';
  medicalRecordId = 0;
  columnCustomTemplates : Record<string, any> = {};

  readonly tableColumns : any = [
    ['date', 'messages.medical_record.date', '', false, 'template'],
    ['time', 'messages.medical_record.time', '', false, 'template'],
    ['weight', 'messages.medical_record.weight', '', false, 'string'],
    ['action', 'messages.common.action', '', false, 'action'],
  ];

  @ViewChild('dateTemplate') dateTemplate!: TemplateRef<any>;
  @ViewChild('timeTemplate') timeTemplate!: TemplateRef<any>;
  @ViewChild(PatientMedicalRecordWeightChartComponent) chartComponent!: PatientMedicalRecordWeightChartComponent;
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;

  constructor(
    private formService: FormService,
    private apiService: ApiService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activedRoute.params.subscribe((params : any) => {
      this.medicalRecordId = params['id'];
      this.tableUrl = `medical-record-weight/all/${this.medicalRecordId}`;
    });
  }

  ngAfterViewInit(): void {
    this.columnCustomTemplates['date'] = this.dateTemplate;
    this.columnCustomTemplates['time'] = this.timeTemplate;
  }
  
  delete(data : PatientMedicalRecordWeight) {
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
    this.formService.openEditCreateModal(PatientMedicalRecordWeightModalComponent, 'modal-md', {
      title: 'messages.common.add',
      medicalRecordId : this.medicalRecordId
    }, () => {
      this.dataTableComponent.reloadData();
      this.chartComponent.getData();
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(PatientMedicalRecordWeightModalComponent, 'modal-md', {
      title: 'messages.common.edit',
      id,
      medicalRecordId : this.medicalRecordId
    }, () => {
      this.dataTableComponent.reloadData();
      this.chartComponent.getData();
    });
  }
}
