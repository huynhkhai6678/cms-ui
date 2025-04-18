import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAboutUsComponent } from './medical-about-us.component';

describe('MedicalAboutUsComponent', () => {
  let component: MedicalAboutUsComponent;
  let fixture: ComponentFixture<MedicalAboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalAboutUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
