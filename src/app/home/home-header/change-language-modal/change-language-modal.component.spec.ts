import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLanguageModalComponent } from './change-language-modal.component';

describe('ChangeLanguageModalComponent', () => {
  let component: ChangeLanguageModalComponent;
  let fixture: ComponentFixture<ChangeLanguageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeLanguageModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeLanguageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
