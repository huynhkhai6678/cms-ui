import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailAppointmentComponent } from './patient-detail-appointment.component';

describe('PatientDetailAppointmentComponent', () => {
  let component: PatientDetailAppointmentComponent;
  let fixture: ComponentFixture<PatientDetailAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDetailAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDetailAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
