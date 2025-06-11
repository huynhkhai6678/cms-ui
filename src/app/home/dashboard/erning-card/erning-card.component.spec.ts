import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardErningCardComponent } from './erning-card.component';

describe('DashboardErningCardComponent', () => {
  let component: DashboardErningCardComponent;
  let fixture: ComponentFixture<DashboardErningCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardErningCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardErningCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
