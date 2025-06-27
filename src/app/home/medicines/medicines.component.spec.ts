import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MedicinesComponent } from './medicines.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { AuthService } from '../../services/auth.service';
import { createMockApiService, createMockAuthService, createMockFormService } from '../../testing/mock';
import { MockDataTableComponent } from '../../testing/mock-data-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { MedicineModalComponent } from './medicine-modal/medicine-modal.component';

describe('MedicinesComponent', () => {
  let component: MedicinesComponent;
  let fixture: ComponentFixture<MedicinesComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockApiService = createMockApiService();
    mockFormService = createMockFormService();
    mockAuthService = createMockAuthService();

    await TestBed.configureTestingModule({
      imports: [
        MedicinesComponent,
        MockDataTableComponent,
        TranslateModule.forRoot(),
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: FormService, useValue: mockFormService },
        { provide: AuthService, useValue: mockAuthService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete API if confirmed', fakeAsync(() => {
    const fakeMedicine = {
     id: 123,
      name: 'Testing',
      type: 1,
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(true));
    mockApiService.delete.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.delete(fakeMedicine);
    tick();

    expect(mockFormService.showDeleteConfirm).toHaveBeenCalledWith('Testing');
    expect(mockApiService.delete).toHaveBeenCalledWith('medicines/123');
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  }));

  it('should not call delete API if not confirmed', fakeAsync(() => {
    const fakeMedicine = {
      id: 123,
      name: 'Testing',
      type: 1,
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(false));

    component.delete(fakeMedicine);
    tick();

    expect(mockApiService.delete).not.toHaveBeenCalled();
  }));

  it('should open create modal and reload data on callback', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData', 'getClinicId']);
    (component.dataTableComponent.getClinicId as jasmine.Spy).and.returnValue(123);

    component.create();

    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      MedicineModalComponent,
      'modal-xl',
      { title: 'messages.medicine.new_medicine_category', clinicId : 123 },
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
      MedicineModalComponent,
      'modal-xl',
      { title: 'messages.medicine.edit_medicine_category', id: 99, clinicId: 123 },
      jasmine.any(Function)
    );

    const callback = mockFormService.openEditCreateModal.calls.mostRecent().args[3];
    if (typeof callback === 'function') {
      callback();
    }
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  });

  it('should call handleFilterChange when changeStatus is called', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['handleFilterChange']);
    component.changeStatus({ value: true });

    expect(component.dataTableComponent.handleFilterChange).toHaveBeenCalledWith({ is_active: true });
  });

  it('should handle activeMedicine change', () => {
    const mockResponse = { message: 'successful' };
    mockApiService.post.and.returnValue(of(mockResponse));

    const mockToastrService = jasmine.createSpyObj('ToastrService', ['success']);
    component.toastrService = mockToastrService;
    
    component.activeMedicine(123, true);
    expect(mockToastrService.success).toHaveBeenCalledWith('successful');
  });
});
