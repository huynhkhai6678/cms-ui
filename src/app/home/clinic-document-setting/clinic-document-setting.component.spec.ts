import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicDocumentSettingComponent } from './clinic-document-setting.component';

describe('ClinicDocumentSettingComponent', () => {
  let component: ClinicDocumentSettingComponent;
  let fixture: ComponentFixture<ClinicDocumentSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicDocumentSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicDocumentSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
