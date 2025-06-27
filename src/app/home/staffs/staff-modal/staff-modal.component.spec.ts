import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffModalComponent } from './staff-modal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormService } from '../../../services/form.service';
import { HomeService } from '../../home.service';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('StaffModalComponent', () => {
  let component: StaffModalComponent;
  let fixture: ComponentFixture<StaffModalComponent>;
  let mockFormService: any;
  let mockHomeService: any;
  let mockBsModalRef: any;
  let mockApiService: any;
  let mocktoastrService: any;

  beforeEach(async () => {
    mockFormService = jasmine.createSpyObj('FormService', ['getInitData', 'submitForm']);
    mockFormService.getInitData.and.returnValue(of({ data: { 
      "clinic_id": "27",
      "first_name": "stafftest",
      "last_name": "stafftest",
      "email": "staff11@staff11.com",
      "contact": "42444444",
      "gender": 1,
      "type": "4",
      "clinic_ids": [
          "27",
          "28"
      ]
    } }));
    mockFormService.submitForm.and.returnValue(of({}));

    mockHomeService = {
      selectClinics: []
    };

    mockBsModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);

    await TestBed.configureTestingModule({
      imports: [
        StaffModalComponent,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        provideAnimations(),
        FormBuilder,
        { provide: FormService, useValue: mockFormService },
        { provide: HomeService, useValue: mockHomeService },
        { provide: ApiService, useValue: mockApiService },
        { provide: ToastrService, useValue: mocktoastrService },
        { provide: BsModalRef, useValue: mockBsModalRef }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.id = 123;
    component.ngOnInit();

    expect(component.staffForm).toBeDefined();
    expect(mockFormService.getInitData).toHaveBeenCalledWith('staffs/123');
    expect(component.staffForm.value.first_name).toBe('stafftest');
  });
});
