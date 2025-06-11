import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPatientRegistrationComponent } from './patient-registration.component';

describe('PatientRegistrationComponent', () => {
  let component: DashboardPatientRegistrationComponent;
  let fixture: ComponentFixture<DashboardPatientRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPatientRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPatientRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
