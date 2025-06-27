import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderModalComponent } from './slider-modal.component';
import { FormService } from '../../../services/form.service';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { HomeService } from '../../home.service';
import { ApiService } from '../../../services/api.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

describe('SliderModalComponent', () => {
  let component: SliderModalComponent;
  let fixture: ComponentFixture<SliderModalComponent>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockHomeService: any;
  let mockBsModalRef: any;
  let mockApiService: any;
  let mocktoastrService: any;

  beforeEach(async () => {
    mockFormService = jasmine.createSpyObj('FormService', ['getInitData', 'submitForm']);
    mockFormService.getInitData.and.returnValue(of({ data: { title: 'title', short_description: 'question',clinic_id: 123 } }));
    mockFormService.submitForm.and.returnValue(of({}));

    mockHomeService = {
      selectClinics: []
    };

    mockBsModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);

    await TestBed.configureTestingModule({
      imports: [SliderModalComponent, TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        { provide: FormService, useValue: mockFormService },
        { provide: HomeService, useValue: mockHomeService },
        { provide: ApiService, useValue: mockApiService },
        { provide: ToastrService, useValue: mocktoastrService },
        { provide: BsModalRef, useValue: mockBsModalRef },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.id = 123;
    component.ngOnInit();

    expect(component.sliderForm).toBeDefined();
    expect(mockFormService.getInitData).toHaveBeenCalledWith('sliders/123');
    expect(component.sliderForm.value.title).toBe('title');
  });

  it('should initialize  clinicId form on ngOnInit', () => {
    component.clinicId = 123;
    component.ngOnInit();

    expect(component.sliderForm).toBeDefined();
    expect(mockFormService.getInitData).toHaveBeenCalledWith('sliders/0');
    expect(component.sliderForm.value.clinic_id).toBe(123);
  });
});
