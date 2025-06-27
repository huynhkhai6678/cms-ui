import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffDetailComponent } from './staff-detail.component';
import { FormService } from '../../../services/form.service';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ShareService } from '../../../services/share.service';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('StaffDetailComponent', () => {
  let component: StaffDetailComponent;
  let fixture: ComponentFixture<StaffDetailComponent>;
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
        StaffDetailComponent,
        TranslateModule.forRoot()
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
    }).compileComponents();

    fixture = TestBed.createComponent(StaffDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set id from route and load data on init', () => {
    expect(component.id).toBe(123);
    expect(mockApiService.get).toHaveBeenCalledWith('staffs/detail/123');
  });

  it('should load data into component.data', () => {
    const fakeResponse = { 
      "data": {
        "name": "stafftest stafftest",
        "email": "staff11@staff11.com",
        "contact": "+60 42444444",
        "image_url": "",
        "gender": 1,
        "register_on": "2025-05-09T13:15:14.000Z",
        "last_update": "2025-05-09T13:23:12.000Z",
        "role": {
            "id": "4",
            "name": "staff",
            "display_name": "Staff",
            "is_default": 0,
            "guard_name": "web",
            "created_at": "2023-12-22T07:45:17.000Z",
            "updated_at": "2023-12-22T07:45:17.000Z",
            "clinic_id": "1",
            "permissions": [
                {
                    "id": "3",
                    "name": "manage_doctors",
                    "display_name": "Manage Doctors",
                    "guard_name": "web",
                    "created_at": "2023-12-22T07:45:16.000Z",
                    "updated_at": "2023-12-22T07:45:16.000Z"
                },
                {
                    "id": "4",
                    "name": "manage_patients",
                    "display_name": "Manage Patients",
                    "guard_name": "web",
                    "created_at": "2023-12-22T07:45:16.000Z",
                    "updated_at": "2023-12-22T07:45:16.000Z"
                },
                {
                    "id": "5",
                    "name": "manage_appointments",
                    "display_name": "Manage Appointments",
                    "guard_name": "web",
                    "created_at": "2023-12-22T07:45:16.000Z",
                    "updated_at": "2023-12-22T07:45:16.000Z"
                },
                {
                    "id": "7",
                    "name": "manage_staff",
                    "display_name": "Manage Staff",
                    "guard_name": "web",
                    "created_at": "2023-12-22T07:45:16.000Z",
                    "updated_at": "2023-12-22T07:45:16.000Z"
                },
                {
                    "id": "9",
                    "name": "manage_settings",
                    "display_name": "Manage Settings",
                    "guard_name": "web",
                    "created_at": "2023-12-22T07:45:16.000Z",
                    "updated_at": "2023-12-22T07:45:16.000Z"
                },
                {
                    "id": "17",
                    "name": "manage_admin_dashboard",
                    "display_name": "Manage Admin Dashboard",
                    "guard_name": "web",
                    "created_at": "2023-12-22T07:45:17.000Z",
                    "updated_at": "2023-12-22T07:45:17.000Z"
                }
            ]
        }
      }
    };
    mockApiService.get.and.returnValue(of(fakeResponse));

    component.id = 123;
    component.loadData();

    expect(mockApiService.get).toHaveBeenCalledWith('staffs/detail/123');
    // simulate async
    fixture.detectChanges();
    expect(component.data).toEqual(fakeResponse.data);
  });

  it('should call location.back() on goBack()', () => {
    component.location = mockLocation;

    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});

