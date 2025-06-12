import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordBloodPressureComponent } from './patient-medical-record-blood-pressure.component';

describe('PatientMedicalRecordBloodPressureComponent', () => {
  let component: PatientMedicalRecordBloodPressureComponent;
  let fixture: ComponentFixture<PatientMedicalRecordBloodPressureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordBloodPressureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordBloodPressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
