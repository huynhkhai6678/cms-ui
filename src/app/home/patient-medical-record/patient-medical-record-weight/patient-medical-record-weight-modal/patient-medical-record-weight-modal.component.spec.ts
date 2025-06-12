import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordWeightModalComponent } from './patient-medical-record-weight-modal.component';

describe('PatientMedicalRecordWeightModalComponent', () => {
  let component: PatientMedicalRecordWeightModalComponent;
  let fixture: ComponentFixture<PatientMedicalRecordWeightModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordWeightModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordWeightModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
