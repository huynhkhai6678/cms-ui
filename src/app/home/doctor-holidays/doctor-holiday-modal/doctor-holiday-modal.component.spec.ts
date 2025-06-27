import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorHolidayModalComponent } from './doctor-holiday-modal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { provideFlatpickrDefaults } from 'angularx-flatpickr';

describe('DoctorHolidayModalComponent', () => {
  let component: DoctorHolidayModalComponent;
  let fixture: ComponentFixture<DoctorHolidayModalComponent>;
  let mockFormService: any;
  let mockHomeService: any;
  let mockBsModalRef: any;
  let mockApiService: any;
  let mocktoastrService: any;

  beforeEach(async () => {
    mockFormService = jasmine.createSpyObj('FormService', ['getInitData', 'submitForm']);
    mockFormService.getInitData.and.returnValue(of({ data: { name: 'Test holiday', clinic_id: 123 } }));
    mockFormService.submitForm.and.returnValue(of({}));

    mockHomeService = {
      selectClinics: []
    };

    mockBsModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);

    await TestBed.configureTestingModule({
      imports: [
        DoctorHolidayModalComponent,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        provideFlatpickrDefaults(),
        FormBuilder,
        { provide: FormService, useValue: mockFormService },
        { provide: HomeService, useValue: mockHomeService },
        { provide: ApiService, useValue: mockApiService },
        { provide: ToastrService, useValue: mocktoastrService },
        { provide: BsModalRef, useValue: mockBsModalRef }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorHolidayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.id = 123;
    component.ngOnInit();

    expect(component.hodidayForm).toBeDefined();
    expect(mockFormService.getInitData).toHaveBeenCalledWith('doctor-holidays/123');
    setTimeout(() => {
      expect(component.hodidayForm.value.name).toBe('Test holiday');
    }, 200);
  });
});
