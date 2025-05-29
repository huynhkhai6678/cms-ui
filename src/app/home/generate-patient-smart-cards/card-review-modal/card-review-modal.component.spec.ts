import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReviewModalComponent } from './card-review-modal.component';

describe('CardReviewModalComponent', () => {
  let component: CardReviewModalComponent;
  let fixture: ComponentFixture<CardReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardReviewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
