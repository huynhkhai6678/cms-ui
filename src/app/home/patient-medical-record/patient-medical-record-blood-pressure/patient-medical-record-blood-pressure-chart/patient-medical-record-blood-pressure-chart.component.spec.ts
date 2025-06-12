import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordBloodPressureChartComponent } from './patient-medical-record-blood-pressure-chart.component';

describe('PatientMedicalRecordBloodPressureChartComponent', () => {
  let component: PatientMedicalRecordBloodPressureChartComponent;
  let fixture: ComponentFixture<PatientMedicalRecordBloodPressureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordBloodPressureChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordBloodPressureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
