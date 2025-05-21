import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingContactInformationComponent } from './setting-contact-information.component';

describe('SettingContactInformationComponent', () => {
  let component: SettingContactInformationComponent;
  let fixture: ComponentFixture<SettingContactInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingContactInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingContactInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
