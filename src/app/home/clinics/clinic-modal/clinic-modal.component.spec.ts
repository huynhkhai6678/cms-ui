import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicModalComponent } from './clinic-modal.component';

describe('ClinicModalComponent', () => {
  let component: ClinicModalComponent;
  let fixture: ComponentFixture<ClinicModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
