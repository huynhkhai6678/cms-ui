import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribesComponent } from './subscribes.component';

describe('SubscribesComponent', () => {
  let component: SubscribesComponent;
  let fixture: ComponentFixture<SubscribesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
