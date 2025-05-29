import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePatientSmartCardsComponent } from './generate-patient-smart-cards.component';

describe('GeneratePatientSmartCardsComponent', () => {
  let component: GeneratePatientSmartCardsComponent;
  let fixture: ComponentFixture<GeneratePatientSmartCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratePatientSmartCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratePatientSmartCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
