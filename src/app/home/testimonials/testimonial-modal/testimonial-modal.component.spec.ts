import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialModalComponent } from './testimonial-modal.component';

describe('TestimonialModalComponent', () => {
  let component: TestimonialModalComponent;
  let fixture: ComponentFixture<TestimonialModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
