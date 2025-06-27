import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryModalComponent } from './category-modal.component';
import { HomeService } from '../../home.service';
import { FormService } from '../../../services/form.service';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('CategoryModalComponent', () => {
  let component: CategoryModalComponent;
  let fixture: ComponentFixture<CategoryModalComponent>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockHomeService: any;
  let mockBsModalRef: jasmine.SpyObj<BsModalRef>;
  let mockApiService: any;
  let mocktoastrService: any;

  beforeEach(async () => {
    mockFormService = jasmine.createSpyObj('FormService', ['getInitData', 'submitForm']);
    mockFormService.getInitData.and.returnValue(of({ data: { name: 'Test category', clinic_id: 123 } }));
    mockFormService.submitForm.and.returnValue(of({}));

    mockHomeService = {
      selectClinics: []
    };

    mockBsModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);

    await TestBed.configureTestingModule({
      imports: [CategoryModalComponent, TranslateModule.forRoot()],
      providers: [
        provideAnimations(),
        FormBuilder,
        { provide: FormService, useValue: mockFormService },
        { provide: HomeService, useValue: mockHomeService },
        { provide: ApiService, useValue: mockApiService },
        { provide: ToastrService, useValue: mocktoastrService },
        { provide: BsModalRef, useValue: mockBsModalRef },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.id = 123;
    component.ngOnInit();

    expect(component.categoryForm).toBeDefined();
    expect(mockFormService.getInitData).toHaveBeenCalledWith('categories/123');
    expect(component.categoryForm.value.name).toBe('Test category');
  });

  it('should initialize  clinicId form on ngOnInit', () => {
    component.clinicId = 123;
    component.ngOnInit();

    expect(component.categoryForm).toBeDefined();
    expect(mockFormService.getInitData).toHaveBeenCalledWith('categories/0');
    expect(component.categoryForm.value.clinic_id).toBe(123);
  });
});
