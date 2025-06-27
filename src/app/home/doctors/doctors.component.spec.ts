import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DoctorsComponent } from './doctors.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { AuthService } from '../../services/auth.service';
import { createMockApiService, createMockAuthService, createMockFormService } from '../../testing/mock';
import { MockDataTableComponent } from '../../testing/mock-data-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { DoctorModalComponent } from './doctor-modal/doctor-modal.component';
import { Doctor } from './doctor.model';

describe('DoctorsComponent', () => {
  let component: DoctorsComponent;
  let fixture: ComponentFixture<DoctorsComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockApiService = createMockApiService();
    mockFormService = createMockFormService();
    mockAuthService = createMockAuthService();

    await TestBed.configureTestingModule({
      imports: [
        DoctorsComponent,
        MockDataTableComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: FormService, useValue: mockFormService },
        { provide: AuthService, useValue: mockAuthService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete API if confirmed', fakeAsync(() => {
    const fakeDoctor : Doctor = {
      doctor_id: "132",
      user_id: 99,
      status: 1,
      user_email: "staff11@staff11.com",
      user_email_verified_at: "",
      user_created_at: "",
      full_name: "stafftest stafftest",
      view: false,
      clinic_id: "1"
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(true));
    mockApiService.delete.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.delete(fakeDoctor);
    tick();

    expect(mockFormService.showDeleteConfirm).toHaveBeenCalledWith('stafftest stafftest');
    expect(mockApiService.delete).toHaveBeenCalledWith('doctors/132');
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  }));

  it('should not call delete API if not confirmed', fakeAsync(() => {
    const fakeDoctor : Doctor = {
      doctor_id: "132",
      user_id: 99,
      status: 1,
      user_email: "staff11@staff11.com",
      user_email_verified_at: "",
      user_created_at: "",
      full_name: "stafftest stafftest",
      view: false,
      clinic_id: "1"
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(false));

    component.delete(fakeDoctor);
    tick();

    expect(mockApiService.delete).not.toHaveBeenCalled();
  }));

  it('should open create modal and reload data on callback', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData', 'getClinicId']);
    (component.dataTableComponent.getClinicId as jasmine.Spy).and.returnValue(123);

    component.create();

    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      DoctorModalComponent,
      'modal-lg',
      { title: 'messages.doctor.add', clinicId : 123 },
      jasmine.any(Function)
    );

    // Simulate callback
    const callback = mockFormService.openEditCreateModal.calls.mostRecent().args[3];
    if (typeof callback === 'function') {
      callback();
    }
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  });

  it('should open edit modal and reload data on callback', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData', 'getClinicId']);
    (component.dataTableComponent.getClinicId as jasmine.Spy).and.returnValue(123);

    component.edit(99);

    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      DoctorModalComponent,
      'modal-lg',
      { title: 'messages.doctor.edit', id: 99, clinicId: 123 },
      jasmine.any(Function)
    );

    const callback = mockFormService.openEditCreateModal.calls.mostRecent().args[3];
    if (typeof callback === 'function') {
      callback();
    }
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  });

  it('should handle verify doctor', () => {
    const fakeDoctor : Doctor = {
      doctor_id: "132",
      user_id: 99,
      status: 1,
      user_email: "staff11@staff11.com",
      user_email_verified_at: "",
      user_created_at: "",
      full_name: "stafftest stafftest",
      view: false,
      clinic_id: "1"
    };

    const mockApiService = jasmine.createSpyObj('ApiService', ['get']);
    mockApiService.get.and.returnValue(of({ message : 'Testing'}));
    component.apiService = mockApiService;

    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData', 'getClinicId']);

    component.verifyDoctor(fakeDoctor);
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  });

  it('should handle active doctor', () => {
    const fakeDoctor : Doctor = {
      doctor_id: "132",
      user_id: 99,
      status: 1,
      user_email: "staff11@staff11.com",
      user_email_verified_at: "",
      user_created_at: "",
      full_name: "stafftest stafftest",
      view: false,
      clinic_id: "1"
    };

    const mockApiService = jasmine.createSpyObj('ApiService', ['post']);
    mockApiService.post.and.returnValue(of({ message : 'Testing'}));
    component.apiService = mockApiService;

    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData', 'getClinicId']);

    component.activeDoctor(fakeDoctor, true);
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  });
});
