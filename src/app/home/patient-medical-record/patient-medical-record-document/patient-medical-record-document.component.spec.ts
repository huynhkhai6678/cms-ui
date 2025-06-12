import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordDocumentComponent } from './patient-medical-record-document.component';

describe('PatientMedicalRecordDocumentComponent', () => {
  let component: PatientMedicalRecordDocumentComponent;
  let fixture: ComponentFixture<PatientMedicalRecordDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
