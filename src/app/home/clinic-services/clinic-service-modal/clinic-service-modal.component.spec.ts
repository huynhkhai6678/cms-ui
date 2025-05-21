import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicServiceModalComponent } from './clinic-service-modal.component';

describe('ClinicServiceModalComponent', () => {
  let component: ClinicServiceModalComponent;
  let fixture: ComponentFixture<ClinicServiceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicServiceModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
