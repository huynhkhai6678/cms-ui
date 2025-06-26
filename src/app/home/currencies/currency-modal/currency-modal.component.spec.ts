import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CurrencyModalComponent } from './currency-modal.component';
import { FormService } from '../../../services/form.service';
import { of } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../../home.service';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

describe('CurrencyModalComponent', () => {
  let component: CurrencyModalComponent;
  let fixture: ComponentFixture<CurrencyModalComponent>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockHomeService: any;
  let mockBsModalRef: any;
  let mockApiService: any;
  let mocktoastrService: any;

  beforeEach(async () => {
    mockFormService = jasmine.createSpyObj('FormService', ['getInitData', 'submitForm']);
    mockFormService.getInitData.and.returnValue(of({ data: { currency_name: 'Dollar', currency_icon: '$', currency_code: "USD" } }));
    mockFormService.submitForm.and.returnValue(of({}));

    mockHomeService = {
      selectClinics: []
    };

    mockBsModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);

    await TestBed.configureTestingModule({
      imports: [CurrencyModalComponent, ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        { provide: FormService, useValue: mockFormService },
        { provide: HomeService, useValue: mockHomeService },
        { provide: ApiService, useValue: mockApiService },
        { provide: ToastrService, useValue: mocktoastrService },
        { provide: BsModalRef, useValue: mockBsModalRef }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.id = 123;
    component.ngOnInit();

    expect(component.currencyForm).toBeDefined();
    expect(mockFormService.getInitData).toHaveBeenCalledWith('currencies/123');
    expect(component.currencyForm.value.currency_name).toBe('Dollar');
  });

  it('should not submit form if invalid', () => {
    component.ngOnInit();
    component.onSubmit(false, {});
    expect(component.isSubmitted).toBe(true);
    expect(mockFormService.submitForm).not.toHaveBeenCalled();
  });

  it('should submit form if valid and close modal', fakeAsync(() => {
    component.ngOnInit();
    component.currencyForm.setValue({
      currency_name: 'Euro',
      currency_icon: '~',
      currency_code: 'EUR'
    });

    component.onSubmit(true, component.currencyForm.value);
    tick();

    expect(mockFormService.submitForm).toHaveBeenCalledWith('currencies', 0, component.currencyForm.value);
    expect(mockBsModalRef.hide).toHaveBeenCalled();
  }));

});
