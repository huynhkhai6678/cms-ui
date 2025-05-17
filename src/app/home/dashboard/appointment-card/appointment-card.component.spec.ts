import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAppointmentCardComponent } from './appointment-card.component';

describe('AppointmentCardComponent', () => {
  let component: DashboardAppointmentCardComponent;
  let fixture: ComponentFixture<DashboardAppointmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAppointmentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAppointmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
