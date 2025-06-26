import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ClinicServiceModalComponent } from './clinic-service-modal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';

describe('ClinicServiceModalComponent', () => {
  let component: ClinicServiceModalComponent;
  let fixture: ComponentFixture<ClinicServiceModalComponent>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockHomeService: any;
  let mockBsModalRef: any;
  let mockApiService: any;
  let mocktoastrService: any;

  beforeEach(async () => {
    mockFormService = jasmine.createSpyObj('FormService', ['getInitData', 'submitForm']);
    mockFormService.getInitData.and.returnValue(of({ data: { name: 'Test Service', category: '1', price: 100 } }));
    mockFormService.submitForm.and.returnValue(of({}));

    mockHomeService = {
      selectClinics: [],
    };

    mockBsModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);

    await TestBed.configureTestingModule({
      imports: [ClinicServiceModalComponent, ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        { provide: FormService, useValue: mockFormService },
        { provide: HomeService, useValue: mockHomeService },
        { provide: ApiService, useValue: mockApiService },
        { provide: ToastrService, useValue: mocktoastrService },
        { provide: BsModalRef, useValue: mockBsModalRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicServiceModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.id = 123;
    component.ngOnInit();

    expect(component.cliniServiceForm).toBeDefined();
    expect(mockFormService.getInitData).toHaveBeenCalledWith('clinic-services/123');
    expect(component.cliniServiceForm.value.name).toBe('Test Service');
  });

  it('should add clinic_id validator if more than one clinic exists', () => {
    mockHomeService.selectClinics = [{}, {}];
    component.ngOnInit();

    const control = component.cliniServiceForm.get('clinic_id');
    expect(control?.validator).toBeTruthy();
  });

  it('should not submit form if invalid', () => {
    component.ngOnInit();
    component.onSubmit(false, {});
    expect(component.isSubmitted).toBe(true);
    expect(mockFormService.submitForm).not.toHaveBeenCalled();
  });

  it('should submit form if valid and close modal', fakeAsync(() => {
    component.ngOnInit();
    component.cliniServiceForm.setValue({
      clinic_id: '',
      category: '1',
      name: 'Test',
      price: 100,
      cost: '',
      description: ''
    });

    component.onSubmit(true, component.cliniServiceForm.value);
    tick();

    expect(mockFormService.submitForm).toHaveBeenCalledWith('clinic-services', 0, component.cliniServiceForm.value);
    expect(mockBsModalRef.hide).toHaveBeenCalled();
  }));
});
