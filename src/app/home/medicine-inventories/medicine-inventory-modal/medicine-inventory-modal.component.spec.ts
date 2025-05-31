import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineInventoryModalComponent } from './medicine-inventory-modal.component';

describe('MedicineInventoryModalComponent', () => {
  let component: MedicineInventoryModalComponent;
  let fixture: ComponentFixture<MedicineInventoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineInventoryModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineInventoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
