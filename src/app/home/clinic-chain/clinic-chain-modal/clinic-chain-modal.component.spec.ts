import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicChainModalComponent } from './clinic-chain-modal.component';

describe('ClinicChainModalComponent', () => {
  let component: ClinicChainModalComponent;
  let fixture: ComponentFixture<ClinicChainModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicChainModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicChainModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
