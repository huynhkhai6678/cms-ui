import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartPatientCardsComponent } from './smart-patient-cards.component';

describe('SmartPatientCardsComponent', () => {
  let component: SmartPatientCardsComponent;
  let fixture: ComponentFixture<SmartPatientCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartPatientCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartPatientCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
