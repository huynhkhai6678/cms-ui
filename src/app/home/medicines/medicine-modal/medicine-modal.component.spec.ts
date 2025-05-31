import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineModalComponent } from './medicine-modal.component';

describe('MedicineModalComponent', () => {
  let component: MedicineModalComponent;
  let fixture: ComponentFixture<MedicineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
