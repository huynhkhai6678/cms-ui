import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordPulseRateModalComponent } from './patient-medical-record-pulse-rate-modal.component';

describe('PatientMedicalRecordPulseRateModalComponent', () => {
  let component: PatientMedicalRecordPulseRateModalComponent;
  let fixture: ComponentFixture<PatientMedicalRecordPulseRateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordPulseRateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordPulseRateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
