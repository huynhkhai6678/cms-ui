import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordWeightComponent } from './patient-medical-record-weight.component';

describe('PatientMedicalRecordWeightComponent', () => {
  let component: PatientMedicalRecordWeightComponent;
  let fixture: ComponentFixture<PatientMedicalRecordWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordWeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
