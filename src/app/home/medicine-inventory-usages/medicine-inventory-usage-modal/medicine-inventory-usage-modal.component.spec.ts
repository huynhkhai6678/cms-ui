import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineInventoryUsageModalComponent } from './medicine-inventory-usage-modal.component';

describe('MedicineInventoryUsageModalComponent', () => {
  let component: MedicineInventoryUsageModalComponent;
  let fixture: ComponentFixture<MedicineInventoryUsageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineInventoryUsageModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineInventoryUsageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
