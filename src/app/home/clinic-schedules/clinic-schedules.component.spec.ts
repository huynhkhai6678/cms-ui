import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicSchedulesComponent } from './clinic-schedules.component';

describe('ClinicSchedulesComponent', () => {
  let component: ClinicSchedulesComponent;
  let fixture: ComponentFixture<ClinicSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicSchedulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
