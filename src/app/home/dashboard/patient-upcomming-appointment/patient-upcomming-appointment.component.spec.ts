import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPatientUpcommingAppointmentComponent } from './patient-upcomming-appointment.component';

describe('DashboardPatientUpcommingAppointmentComponent', () => {
  let component: DashboardPatientUpcommingAppointmentComponent;
  let fixture: ComponentFixture<DashboardPatientUpcommingAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPatientUpcommingAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPatientUpcommingAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
