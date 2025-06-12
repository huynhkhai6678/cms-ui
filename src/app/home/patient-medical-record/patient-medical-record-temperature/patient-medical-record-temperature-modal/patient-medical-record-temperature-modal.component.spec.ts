import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordTemperatureModalComponent } from './patient-medical-record-temperature-modal.component';

describe('PatientMedicalRecordTemperatureModalComponent', () => {
  let component: PatientMedicalRecordTemperatureModalComponent;
  let fixture: ComponentFixture<PatientMedicalRecordTemperatureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordTemperatureModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordTemperatureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
