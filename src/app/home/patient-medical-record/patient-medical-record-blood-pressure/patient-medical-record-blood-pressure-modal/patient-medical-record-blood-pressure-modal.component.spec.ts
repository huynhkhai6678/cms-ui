import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordBloodPressureModalComponent } from './patient-medical-record-blood-pressure-modal.component';

describe('PatientMedicalRecordBloodPressureModalComponent', () => {
  let component: PatientMedicalRecordBloodPressureModalComponent;
  let fixture: ComponentFixture<PatientMedicalRecordBloodPressureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordBloodPressureModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordBloodPressureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
