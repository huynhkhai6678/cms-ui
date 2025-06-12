import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordWeightChartComponent } from './patient-medical-record-weight-chart.component';

describe('PatientMedicalRecordWeightChartComponent', () => {
  let component: PatientMedicalRecordWeightChartComponent;
  let fixture: ComponentFixture<PatientMedicalRecordWeightChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordWeightChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordWeightChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
