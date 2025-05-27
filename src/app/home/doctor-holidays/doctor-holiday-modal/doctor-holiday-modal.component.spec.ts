import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorHolidayModalComponent } from './doctor-holiday-modal.component';

describe('DoctorHolidayModalComponent', () => {
  let component: DoctorHolidayModalComponent;
  let fixture: ComponentFixture<DoctorHolidayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorHolidayModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorHolidayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
