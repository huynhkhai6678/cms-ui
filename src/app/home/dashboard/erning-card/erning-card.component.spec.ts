import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErningCardComponent } from './erning-card.component';

describe('ErningCardComponent', () => {
  let component: ErningCardComponent;
  let fixture: ComponentFixture<ErningCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErningCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErningCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
