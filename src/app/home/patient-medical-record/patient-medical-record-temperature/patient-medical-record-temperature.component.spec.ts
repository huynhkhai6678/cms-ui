import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordTemperatureComponent } from './patient-medical-record-temperature.component';

describe('PatientMedicalRecordTemperatureComponent', () => {
  let component: PatientMedicalRecordTemperatureComponent;
  let fixture: ComponentFixture<PatientMedicalRecordTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordTemperatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
