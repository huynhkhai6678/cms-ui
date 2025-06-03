import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCreateServiceComponent } from './transaction-create-service.component';

describe('TransactionCreateServiceComponent', () => {
  let component: TransactionCreateServiceComponent;
  let fixture: ComponentFixture<TransactionCreateServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionCreateServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCreateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
