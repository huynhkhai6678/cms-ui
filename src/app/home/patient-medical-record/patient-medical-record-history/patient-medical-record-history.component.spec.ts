import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordHistoryComponent } from './patient-medical-record-history.component';

describe('PatientMedicalRecordHistoryComponent', () => {
  let component: PatientMedicalRecordHistoryComponent;
  let fixture: ComponentFixture<PatientMedicalRecordHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
