import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderModalComponent } from './slider-modal.component';

describe('SliderModalComponent', () => {
  let component: SliderModalComponent;
  let fixture: ComponentFixture<SliderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
