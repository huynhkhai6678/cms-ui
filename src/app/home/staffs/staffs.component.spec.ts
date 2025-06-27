import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { StaffsComponent } from './staffs.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { AuthService } from '../../services/auth.service';
import { createMockApiService, createMockAuthService, createMockFormService } from '../../testing/mock';
import { MockDataTableComponent } from '../../testing/mock-data-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { StaffModalComponent } from './staff-modal/staff-modal.component';

describe('StaffsComponent', () => {
  let component: StaffsComponent;
  let fixture: ComponentFixture<StaffsComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockApiService = createMockApiService();
    mockFormService = createMockFormService();
    mockAuthService = createMockAuthService();

    await TestBed.configureTestingModule({
      imports: [
        StaffsComponent,
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

    fixture = TestBed.createComponent(StaffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete API if confirmed', fakeAsync(() => {
    const fakeStaff = {
      user_id: 132,
      user_first_name: "stafftest",
      user_last_name: "stafftest",
      user_email: "staff11@staff11.com",
      user_email_verified_at: null,
      user_type: 4,
      role_display_name: "Staff",
      full_name: "stafftest stafftest"
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(true));
    mockApiService.delete.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.delete(fakeStaff);
    tick();

    expect(mockFormService.showDeleteConfirm).toHaveBeenCalledWith('stafftest stafftest');
    expect(mockApiService.delete).toHaveBeenCalledWith('staffs/132');
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  }));

  it('should not call delete API if not confirmed', fakeAsync(() => {
    const fakeStaff = {
      user_id: 132,
      user_first_name: "stafftest",
      user_last_name: "stafftest",
      user_email: "staff11@staff11.com",
      user_email_verified_at: null,
      user_type: 4,
      role_display_name: "Staff",
      full_name: "stafftest stafftest"
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(false));

    component.delete(fakeStaff);
    tick();

    expect(mockApiService.delete).not.toHaveBeenCalled();
  }));

  it('should open create modal and reload data on callback', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData', 'getClinicId']);
    (component.dataTableComponent.getClinicId as jasmine.Spy).and.returnValue(123);

    component.create();

    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      StaffModalComponent,
      'modal-lg',
      { title: 'messages.staff.add_staff', clinicId : 123 },
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
      StaffModalComponent,
      'modal-lg',
      { title: 'messages.staff.edit_staff', id: 99, clinicId: 123 },
      jasmine.any(Function)
    );

    const callback = mockFormService.openEditCreateModal.calls.mostRecent().args[3];
    if (typeof callback === 'function') {
      callback();
    }
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  });
});
