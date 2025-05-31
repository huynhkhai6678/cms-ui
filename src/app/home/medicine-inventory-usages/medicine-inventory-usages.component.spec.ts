import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineInventoryUsagesComponent } from './medicine-inventory-usages.component';

describe('MedicineInventoryUsagesComponent', () => {
  let component: MedicineInventoryUsagesComponent;
  let fixture: ComponentFixture<MedicineInventoryUsagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineInventoryUsagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineInventoryUsagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
