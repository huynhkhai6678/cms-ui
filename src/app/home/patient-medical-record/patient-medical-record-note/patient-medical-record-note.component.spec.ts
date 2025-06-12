import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordNoteComponent } from './patient-medical-record-note.component';

describe('PatientMedicalRecordNoteComponent', () => {
  let component: PatientMedicalRecordNoteComponent;
  let fixture: ComponentFixture<PatientMedicalRecordNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalRecordNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
