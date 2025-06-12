import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { PatientMedicalRecordBloodPressureChartComponent } from './patient-medical-record-blood-pressure/patient-medical-record-blood-pressure-chart/patient-medical-record-blood-pressure-chart.component';
import { PatientMedicalRecordPulseRateChartComponent } from './patient-medical-record-pulse-rate/patient-medical-record-pulse-rate-chart/patient-medical-record-pulse-rate-chart.component';
import { PatientMedicalRecordTemperatureChartComponent } from './patient-medical-record-temperature/patient-medical-record-temperature-chart/patient-medical-record-temperature-chart.component';
import { PatientMedicalRecordWeightChartComponent } from './patient-medical-record-weight/patient-medical-record-weight-chart/patient-medical-record-weight-chart.component';
import { PatientMedicalRecordHistoryComponent } from './patient-medical-record-history/patient-medical-record-history.component';
import { PatientMedicalRecordNoteComponent } from './patient-medical-record-note/patient-medical-record-note.component';
import { PatientMedicalRecordHistory } from './patient-medical-record-history/patient-medical-record-history.model';
import { PatientMedicalRecordDocumentComponent } from './patient-medical-record-document/patient-medical-record-document.component';

@Component({
  selector: 'app-patient-medical-record',
  imports: [
    RouterLink,
    TranslatePipe,
    TabsModule,
    PatientMedicalRecordDocumentComponent,
    PatientMedicalRecordNoteComponent,
    PatientMedicalRecordHistoryComponent,
    PatientMedicalRecordBloodPressureChartComponent,
    PatientMedicalRecordPulseRateChartComponent,
    PatientMedicalRecordTemperatureChartComponent,
    PatientMedicalRecordWeightChartComponent
  ],
  templateUrl: './patient-medical-record.component.html',
  styleUrl: './patient-medical-record.component.scss'
})
export class PatientMedicalRecordComponent implements OnInit {
  apiUrl = environment.apiUrl;
  data : any = null;
  medicalRecordId = 0;

  @ViewChild('tabs', { static: false }) tabs?: TabsetComponent;
  @ViewChild(PatientMedicalRecordNoteComponent) patientMedicalRecordNoteComponent!: PatientMedicalRecordNoteComponent;
  @ViewChild(PatientMedicalRecordHistoryComponent) patientMedicalRecordHistoryComponent!: PatientMedicalRecordHistoryComponent;

  constructor(
    private apiService: ApiService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activedRoute.params.subscribe((params : any) => {
      this.medicalRecordId = params['id'];
      this.apiService.get(`patient-medical-record/${this.medicalRecordId}`).subscribe((res : any) => {
        this.data = res['data'];
      });
    });
  }

  openEditNote(event : PatientMedicalRecordHistory) {
    if (this.tabs && this.tabs.tabs && this.tabs.tabs[1]) {
      this.tabs.tabs[1].active = true;
      this.patientMedicalRecordNoteComponent.editNote(event);
    }
  }

  reloadHistory() {
    this.patientMedicalRecordHistoryComponent.ngOnInit();
  }
}
