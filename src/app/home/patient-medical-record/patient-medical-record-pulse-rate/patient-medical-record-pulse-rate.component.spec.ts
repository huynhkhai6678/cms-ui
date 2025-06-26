import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordPulseRateComponent } from './patient-medical-record-pulse-rate.component';

describe('PatientMedicalRecordPulseRateComponent', () => {
  let component: PatientMedicalRecordPulseRateComponent;
  let fixture: ComponentFixture<PatientMedicalRecordPulseRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordPulseRateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordPulseRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
