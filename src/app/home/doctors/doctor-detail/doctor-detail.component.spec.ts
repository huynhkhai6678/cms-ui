import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorDetailComponent } from './doctor-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../../services/api.service';
import { FormService } from '../../../services/form.service';
import { ShareService } from '../../../services/share.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DiffForHumansPipe } from '../../../pipes/diff-for-humans.pipe';

@Component({
  selector: 'app-doctor-detail-appointment',
  template: ''
})
class MockDoctorDetailAppointmentComponent {
  @Input() doctorId: any;
}

describe('DoctorDetailComponent', () => {
  let component: DoctorDetailComponent;
  let fixture: ComponentFixture<DoctorDetailComponent>;
  const mockApiService = jasmine.createSpyObj('ApiService', ['get']);
  const mockFormService = jasmine.createSpyObj('FormService', ['openEditCreateModal']);
  const mockShareService = { 
    GENDER: { male: 'Male', female: 'Female' },
    getBadgeColor: jasmine.createSpy('getBadgeColor').and.returnValue('bg-primary')
  };
  const mockLocation = jasmine.createSpyObj('Location', ['back']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DiffForHumansPipe,
        TabsModule.forRoot(),
        TranslateModule.forRoot(),
        MockDoctorDetailAppointmentComponent
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: FormService, useValue: mockFormService },
        { provide: ShareService, useValue: mockShareService },
        { provide: Location, useValue: mockLocation },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 })
          }
        }
      ]
    }).overrideComponent(DoctorDetailComponent, {
      set: {
        imports: [
          TabsModule,
          MockDoctorDetailAppointmentComponent,
          TranslateModule,
          DiffForHumansPipe
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set id from route and load data on init', () => {
    expect(component.id).toBe(123);
    expect(mockApiService.get).toHaveBeenCalledWith('doctors/detail/123');
  });

  it('should call location.back() on goBack()', () => {
    component.location = mockLocation;

    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should load data into component.data', () => {
    const fakeResponse = { 
      "data": {
        "name": "sdfsdf sdfsdf",
        "email": "sdfsdf@dfssdf.com",
        "contact": "+60 42225222",
        "image_url": "",
        "experience": null,
        "gender": 1,
        "dob": "09/05/2025",
        "register_on": "2025-05-09T13:33:41.000Z",
        "last_update": "2025-05-09T13:36:25.000Z",
        "appointments": [],
        "specializations": [
            {
                "id": "52",
                "name": "Medical Genetics",
                "created_at": "2025-03-31T04:04:42.000Z",
                "updated_at": "2025-03-31T04:04:42.000Z",
                "clinic_id": "27"
            }
        ]
      }
    };
    mockApiService.get.and.returnValue(of(fakeResponse));

    component.id = 123;
    component.loadData();

    expect(mockApiService.get).toHaveBeenCalledWith('doctors/detail/123');
    // simulate async
    fixture.detectChanges();
    expect(component.data).toEqual(fakeResponse.data);
  });
});
