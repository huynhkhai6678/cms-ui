import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordPulseRateChartComponent } from './patient-medical-record-pulse-rate-chart.component';

describe('PatientMedicalRecordPulseRateChartComponent', () => {
  let component: PatientMedicalRecordPulseRateChartComponent;
  let fixture: ComponentFixture<PatientMedicalRecordPulseRateChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordPulseRateChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordPulseRateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
