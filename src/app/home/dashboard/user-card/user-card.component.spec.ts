import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: DashboardUserCardComponent;
  let fixture: ComponentFixture<DashboardUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUserCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
