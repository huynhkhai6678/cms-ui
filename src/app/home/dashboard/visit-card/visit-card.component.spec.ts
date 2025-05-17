import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVisitCardComponent } from './visit-card.component';

describe('VisitCardComponent', () => {
  let component: DashboardVisitCardComponent;
  let fixture: ComponentFixture<DashboardVisitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardVisitCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardVisitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
