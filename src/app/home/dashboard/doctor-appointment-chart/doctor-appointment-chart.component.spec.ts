import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDoctorAppointmentChartComponent } from './doctor-appointment-chart.component';

describe('DashboardDoctorAppointmentChartComponent', () => {
  let component: DashboardDoctorAppointmentChartComponent;
  let fixture: ComponentFixture<DashboardDoctorAppointmentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDoctorAppointmentChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDoctorAppointmentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
