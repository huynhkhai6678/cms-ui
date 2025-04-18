import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicChainComponent } from './clinic-chain.component';

describe('ClinicChainComponent', () => {
  let component: ClinicChainComponent;
  let fixture: ComponentFixture<ClinicChainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicChainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
