import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CmsComponent } from './cms.component';
import { FormService } from '../../services/form.service';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { HomeService } from '../home.service';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';
import { createMockAuthService } from '../../testing/mock';
import { AuthService } from '../../services/auth.service';

describe('CmsComponent', () => {
  let component: CmsComponent;
  let fixture: ComponentFixture<CmsComponent>;
  let mockFormService: any;
  let mockHomeService: any;
  let mockApiService: any;
  let mocktoastrService: any;
  let mockAuthService : any;

  beforeEach(async () => {
    mockAuthService = createMockAuthService();
    mockApiService = jasmine.createSpyObj('ApiService', ['get', 'postFileWithParams']);
    mockApiService.get.and.returnValue(of({ data: { 
      "terms_conditions": "Testing",
      "privacy_policy": "Testing",
      "about_title": "What We do Actually 2255",
      "about_short_description": "We offer personalized consultations with expert advice and tailored 22treatment plans to address your individual health needs. Our advanced diagnostic services use cutting-edge technology to provide accurate and timely results. We emphasize preventive care through proactive health screenings and wellness programs designed to keep you in optimal health. Our specialized treatments target a wide range of medical conditions using the latest advancements in healthcare. Additionally, our convenient services include easy access to consultations, follow-ups, and medical support via our user-friendly telehealth platform. Your health is our priority, and we are committed to delivering exceptional care every step of the way. 454",
      "about_image_1": "https://cms.myclnq.com/uploads/fake.png",
      "about_image_2": "https://cms.myclnq.com/uploads/4fake.png",
      "about_image_3": "https://cms.myclnq.com/uploads/fake4.png",
      "about_experience": "30"
    } }));

    mockApiService.postFileWithParams.and.returnValue(of({ message: 'Succesfully'}));

    await TestBed.configureTestingModule({
      imports: [
        CmsComponent,
        TranslateModule.forRoot(),
        ToastrModule.forRoot()
      ],
      providers: [
        FormBuilder,
        { provide: FormService, useValue: mockFormService },
        { provide: HomeService, useValue: mockHomeService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ApiService, useValue: mockApiService },
        { provide: ToastrService, useValue: mocktoastrService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {

    const mockToastrService = jasmine.createSpyObj('ToastrService', ['success']);
    component.toastr = mockToastrService;

    const value = {
      "terms_conditions": "Testing 2222",
      "privacy_policy": "Testing",
      "about_title": "What We do Actually 2255",
      "about_short_description": "We offer personalized consultations with expert advice and tailored 22treatment plans to address your individual health needs. Our advanced diagnostic services use cutting-edge technology to provide accurate and timely results. We emphasize preventive care through proactive health screenings and wellness programs designed to keep you in optimal health. Our specialized treatments target a wide range of medical conditions using the latest advancements in healthcare. Additionally, our convenient services include easy access to consultations, follow-ups, and medical support via our user-friendly telehealth platform. Your health is our priority, and we are committed to delivering exceptional care every step of the way. 454",
      "about_image_1": "https://cms.myclnq.com/uploads/fake.png",
      "about_image_2": "https://cms.myclnq.com/uploads/4fake.png",
      "about_image_3": "https://cms.myclnq.com/uploads/fake4.png",
      "about_experience": "44"
    }

    component.submit(value, true);
    expect(mockToastrService.success).toHaveBeenCalledWith('Succesfully');
  });
});
