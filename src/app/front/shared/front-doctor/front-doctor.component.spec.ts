import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontDoctorComponent } from './front-doctor.component';

describe('FrontDoctorComponent', () => {
  let component: FrontDoctorComponent;
  let fixture: ComponentFixture<FrontDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
