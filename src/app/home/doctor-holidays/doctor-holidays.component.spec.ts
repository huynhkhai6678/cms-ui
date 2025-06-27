import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DoctorHolidaysComponent } from './doctor-holidays.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { AuthService } from '../../services/auth.service';
import { createMockApiService, createMockAuthService, createMockFormService } from '../../testing/mock';
import { MockDataTableComponent } from '../../testing/mock-data-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { DoctorHolidayModalComponent } from './doctor-holiday-modal/doctor-holiday-modal.component';
import { DoctorHoliday } from './doctor-holiday.model';

describe('DoctorHolidaysComponent', () => {
  let component: DoctorHolidaysComponent;
  let fixture: ComponentFixture<DoctorHolidaysComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockApiService = createMockApiService();
    mockFormService = createMockFormService();
    mockAuthService = createMockAuthService();

    await TestBed.configureTestingModule({
      imports: [
        DoctorHolidaysComponent,
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

    fixture = TestBed.createComponent(DoctorHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete API if confirmed', fakeAsync(() => {
    const fakeDoctorHoliday : DoctorHoliday = {
      doctor_holiday_id: 123,
      doctor_holiday_name: 'Testing',
      doctor_id: 1,
      doctor_holiday_date: '',
      full_name: 'Testing'
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(true));
    mockApiService.delete.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.delete(fakeDoctorHoliday);
    tick();

    expect(mockFormService.showDeleteConfirm).toHaveBeenCalledWith('Testing');
    expect(mockApiService.delete).toHaveBeenCalledWith('doctor-holidays/123');
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  }));

  it('should not call delete API if not confirmed', fakeAsync(() => {
    const fakeDoctorHoliday : DoctorHoliday = {
      doctor_holiday_id: 123,
      doctor_holiday_name: 'Testing',
      doctor_id: 1,
      doctor_holiday_date: '',
      full_name: 'Testing'
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(false));

    component.delete(fakeDoctorHoliday);
    tick();

    expect(mockApiService.delete).not.toHaveBeenCalled();
  }));

  it('should open create modal and reload data on callback', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData', 'getClinicId']);
    (component.dataTableComponent.getClinicId as jasmine.Spy).and.returnValue(123);

    component.create();

    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      DoctorHolidayModalComponent,
      'modal-lg',
      { title: 'messages.holiday.add_holiday', clinicId : 123 },
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
      DoctorHolidayModalComponent,
      'modal-lg',
      { title: 'messages.holiday.edit_holiday', id: 99, clinicId: 123 },
      jasmine.any(Function)
    );

    const callback = mockFormService.openEditCreateModal.calls.mostRecent().args[3];
    if (typeof callback === 'function') {
      callback();
    }
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  });
});
