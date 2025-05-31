import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineInventoriesComponent } from './medicine-inventories.component';

describe('MedicineInventoriesComponent', () => {
  let component: MedicineInventoriesComponent;
  let fixture: ComponentFixture<MedicineInventoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineInventoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineInventoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
