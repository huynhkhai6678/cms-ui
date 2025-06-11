import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUpcommingAppointmentComponent } from './patient-upcomming-appointment.component';

describe('PatientUpcommingAppointmentComponent', () => {
  let component: PatientUpcommingAppointmentComponent;
  let fixture: ComponentFixture<PatientUpcommingAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientUpcommingAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientUpcommingAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
