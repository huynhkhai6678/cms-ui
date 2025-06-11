import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPatientTodayAppointmentComponent } from './patient-today-appointment.component';

describe('DashboardPatientTodayAppointmentComponent', () => {
  let component: DashboardPatientTodayAppointmentComponent;
  let fixture: ComponentFixture<DashboardPatientTodayAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPatientTodayAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPatientTodayAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
