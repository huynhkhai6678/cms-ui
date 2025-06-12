import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordDocumentModalComponent } from './patient-medical-record-document-modal.component';

describe('PatientMedicalRecordDocumentModalComponent', () => {
  let component: PatientMedicalRecordDocumentModalComponent;
  let fixture: ComponentFixture<PatientMedicalRecordDocumentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordDocumentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordDocumentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
