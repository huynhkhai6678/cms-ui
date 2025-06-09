import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInventorySalesComponent } from './service-inventory-sales.component';

describe('ServiceInventorySalesComponent', () => {
  let component: ServiceInventorySalesComponent;
  let fixture: ComponentFixture<ServiceInventorySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceInventorySalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceInventorySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
