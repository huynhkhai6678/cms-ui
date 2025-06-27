import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceCategoryModalComponent } from './service-category-modal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';

describe('ServiceCategoryModalComponent', () => {
  let component: ServiceCategoryModalComponent;
  let fixture: ComponentFixture<ServiceCategoryModalComponent>;
  let mockFormService: any;
  let mockHomeService: any;
  let mockBsModalRef: any;
  let mockApiService: any;
  let mocktoastrService: any;

  beforeEach(async () => {
    mockFormService = jasmine.createSpyObj('FormService', ['getInitData', 'submitForm']);
    mockFormService.getInitData.and.returnValue(of({ data: { name: 'Test service category', clinic_id: 123 } }));
    mockFormService.submitForm.and.returnValue(of({}));

    mockHomeService = {
      selectClinics: []
    };

    mockBsModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);

    await TestBed.configureTestingModule({
      imports: [
        ServiceCategoryModalComponent,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ],
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

    fixture = TestBed.createComponent(ServiceCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.id = 123;
    component.ngOnInit();

    expect(component.serviceCategoryForm).toBeDefined();
    expect(mockFormService.getInitData).toHaveBeenCalledWith('service-categories/123');
    expect(component.serviceCategoryForm.value.name).toBe('Test service category');
  });
});
