import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDetailAppointmentComponent } from './doctor-detail-appointment.component';

describe('DoctorDetailAppointmentComponent', () => {
  let component: DoctorDetailAppointmentComponent;
  let fixture: ComponentFixture<DoctorDetailAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorDetailAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorDetailAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
