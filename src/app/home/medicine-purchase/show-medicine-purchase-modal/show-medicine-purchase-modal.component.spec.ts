import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMedicinePurchaseModalComponent } from './show-medicine-purchase-modal.component';

describe('ShowMedicinePurchaseModalComponent', () => {
  let component: ShowMedicinePurchaseModalComponent;
  let fixture: ComponentFixture<ShowMedicinePurchaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowMedicinePurchaseModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMedicinePurchaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
