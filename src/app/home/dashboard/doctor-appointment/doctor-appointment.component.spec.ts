import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDoctorAppointmentComponent } from './doctor-appointment.component';

describe('DoctorAppointmentComponent', () => {
  let component: DashboardDoctorAppointmentComponent;
  let fixture: ComponentFixture<DashboardDoctorAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDoctorAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDoctorAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
