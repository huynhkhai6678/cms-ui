import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DoctorDetailAppointmentComponent } from './doctor-detail-appointment.component';
import { ApiService } from '../../../../services/api.service';
import { FormService } from '../../../../services/form.service';
import { AuthService } from '../../../../services/auth.service';
import { createMockApiService, createMockAuthService, createMockFormService } from '../../../../testing/mock';
import { MockDataTableComponent } from '../../../../testing/mock-data-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { DoctorModalComponent } from '../../doctor-modal/doctor-modal.component';

describe('DoctorDetailAppointmentComponent', () => {
  let component: DoctorDetailAppointmentComponent;
  let fixture: ComponentFixture<DoctorDetailAppointmentComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockApiService = createMockApiService();
    mockFormService = createMockFormService();
    mockAuthService = createMockAuthService();

    await TestBed.configureTestingModule({
      imports: [
        DoctorDetailAppointmentComponent,
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

    fixture = TestBed.createComponent(DoctorDetailAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete API if confirmed', fakeAsync(() => {
    const fakeApt = {
      "appontment_id": "132",
      "patient_id": "64",
      "user_id": "113",
      "user_email": "pattientclinic1@yopmail.com",
      "user_image_url": "",
      "appointment_at": "2025-04-17",
      "from_time": "09:30",
      "from_time_type": "AM",
      "to_time": "09:45",
      "to_time_type": "AM",
      "appointment_status": 1,
      "full_name": "Patient Clinic1"
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(true));
    mockApiService.delete.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.delete(fakeApt);
    tick();

    expect(mockFormService.showDeleteConfirm).toHaveBeenCalledWith('Patient Clinic1');
    expect(mockApiService.delete).toHaveBeenCalledWith('appointments/132');
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  }));

  it('should not call delete API if not confirmed', fakeAsync(() => {
    const fakeApt = {
      "appontment_id": "132",
      "patient_id": "64",
      "user_id": "113",
      "user_email": "pattientclinic1@yopmail.com",
      "user_image_url": "",
      "appointment_at": "2025-04-17",
      "from_time": "09:30",
      "from_time_type": "AM",
      "to_time": "09:45",
      "to_time_type": "AM",
      "appointment_status": 1,
      "full_name": "Patient Clinic1"
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(false));

    component.delete(fakeApt);
    tick();

    expect(mockApiService.delete).not.toHaveBeenCalled();
  }));

  it('should open edit modal and reload data on callback', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData', 'getClinicId']);
    (component.dataTableComponent.getClinicId as jasmine.Spy).and.returnValue(123);

    component.edit(99);

    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      DoctorModalComponent,
      'modal-xl',
      { title: 'messages.patient.edit', id: 99, clinicId: 123 }
    );
  });
});
