import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLabelComponent } from './transaction-label.component';

describe('TransactionLabelComponent', () => {
  let component: TransactionLabelComponent;
  let fixture: ComponentFixture<TransactionLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
