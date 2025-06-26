import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestimonialModalComponent } from './testimonial-modal.component';
import { FormService } from '../../../services/form.service';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { HomeService } from '../../home.service';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MockDataTableComponent } from '../../../testing/mock-data-table.component';
import { TranslateModule } from '@ngx-translate/core';

describe('TestimonialModalComponent', () => {
  let component: TestimonialModalComponent;
  let fixture: ComponentFixture<TestimonialModalComponent>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockHomeService: any;
  let mockBsModalRef: any;
  let mockApiService: any;
  let mocktoastrService: any;

  beforeEach(async () => {
    mockFormService = jasmine.createSpyObj('FormService', ['getInitData', 'submitForm']);
    mockFormService.getInitData.and.returnValue(of({ data: { name: 'Test specialization', clinic_id: 123 } }));
    mockFormService.submitForm.and.returnValue(of({}));

    mockHomeService = {
      selectClinics: []
    };

    mockBsModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);

    await TestBed.configureTestingModule({
      imports: [TestimonialModalComponent, MockDataTableComponent, TranslateModule.forRoot()],
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

    fixture = TestBed.createComponent(TestimonialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.id = 123;
    component.ngOnInit();

    expect(component.testimonialForm).toBeDefined();
    expect(mockFormService.getInitData).toHaveBeenCalledWith('testimonials/123');
    expect(component.testimonialForm.value.name).toBe('Test specialization');
  });

  it('should initialize  clinicId form on ngOnInit', () => {
    component.clinicId = 123;
    component.ngOnInit();

    expect(component.testimonialForm).toBeDefined();
    expect(mockFormService.getInitData).toHaveBeenCalledWith('testimonials/0');
    expect(component.testimonialForm.value.clinic_id).toBe(123);
  });
});
