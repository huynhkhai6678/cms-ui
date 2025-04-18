import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalDoctorsComponent } from './medical-doctors.component';

describe('MedicalDoctorsComponent', () => {
  let component: MedicalDoctorsComponent;
  let fixture: ComponentFixture<MedicalDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalDoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
