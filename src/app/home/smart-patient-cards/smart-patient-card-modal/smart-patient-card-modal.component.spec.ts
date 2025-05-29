import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartPatientCardModalComponent } from './smart-patient-card-modal.component';

describe('SmartPatientCardModalComponent', () => {
  let component: SmartPatientCardModalComponent;
  let fixture: ComponentFixture<SmartPatientCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartPatientCardModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartPatientCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
