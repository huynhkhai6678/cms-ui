import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinePurchaseModalComponent } from './medicine-purchase-modal.component';

describe('MedicinePurchaseModalComponent', () => {
  let component: MedicinePurchaseModalComponent;
  let fixture: ComponentFixture<MedicinePurchaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicinePurchaseModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinePurchaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
