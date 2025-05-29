import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePatientSmartCardModalComponent } from './generate-patient-smart-card-modal.component';

describe('GeneratePatientSmartCardModalComponent', () => {
  let component: GeneratePatientSmartCardModalComponent;
  let fixture: ComponentFixture<GeneratePatientSmartCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratePatientSmartCardModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratePatientSmartCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
