import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordTemperatureChartComponent } from './patient-medical-record-temperature-chart.component';

describe('PatientMedicalRecordTemperatureChartComponent', () => {
  let component: PatientMedicalRecordTemperatureChartComponent;
  let fixture: ComponentFixture<PatientMedicalRecordTemperatureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordTemperatureChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordTemperatureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
