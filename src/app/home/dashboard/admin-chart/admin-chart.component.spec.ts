import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminChartComponent } from './admin-chart.component';

describe('AdminChartComponent', () => {
  let component: DashboardAdminChartComponent;
  let fixture: ComponentFixture<DashboardAdminChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAdminChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAdminChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
