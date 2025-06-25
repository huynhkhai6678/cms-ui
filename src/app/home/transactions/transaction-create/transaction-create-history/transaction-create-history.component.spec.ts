import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCreateHistoryComponent } from './transaction-create-history.component';

describe('TransactionCreateHistoryComponent', () => {
  let component: TransactionCreateHistoryComponent;
  let fixture: ComponentFixture<TransactionCreateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionCreateHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCreateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
