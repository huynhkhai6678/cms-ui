import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ServicesComponent } from './services.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { AuthService } from '../../services/auth.service';
import { createMockApiService, createMockAuthService, createMockFormService } from '../../testing/mock';
import { MockDataTableComponent } from '../../testing/mock-data-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ServiceModalComponent } from './service-modal/service-modal.component';
import { Service } from './service.model';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockApiService = createMockApiService();
    mockFormService = createMockFormService();
    mockAuthService = createMockAuthService();

    await TestBed.configureTestingModule({
      imports: [
        ServicesComponent,
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

    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete API if confirmed', fakeAsync(() => {
     const fakeService : Service = {
      id: 123,
      name: 'Testing',
      image_url: '',
      clinic_id: 1,
      category_id : 1,
      status: 1,
      short_description: 'Testing',
      charges: 100
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(true));
    mockApiService.delete.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.delete(fakeService);
    tick();

    expect(mockFormService.showDeleteConfirm).toHaveBeenCalledWith('Testing');
    expect(mockApiService.delete).toHaveBeenCalledWith('services/123');
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  }));

  it('should not call delete API if not confirmed', fakeAsync(() => {
    const fakeService : Service = {
      id: 123,
      name: 'Testing',
      image_url: '',
      clinic_id: 1,
      category_id : 1,
      status: 1,
      short_description: 'Testing',
      charges: 100
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(false));

    component.delete(fakeService);
    tick();

    expect(mockApiService.delete).not.toHaveBeenCalled();
  }));

  it('should open create modal and reload data on callback', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData', 'getClinicId']);
    (component.dataTableComponent.getClinicId as jasmine.Spy).and.returnValue(123);

    component.create();

    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      ServiceModalComponent,
      'modal-lg',
      { title: 'messages.service.add_service', clinicId : 123 },
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
      ServiceModalComponent,
      'modal-lg',
      { title: 'messages.service.edit_service', id: 99, clinicId: 123 },
      jasmine.any(Function)
    );

    const callback = mockFormService.openEditCreateModal.calls.mostRecent().args[3];
    if (typeof callback === 'function') {
      callback();
    }
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  });

  it('should handle activeMedicine change', () => {
     const fakeService : Service = {
      id: 123,
      name: 'Testing',
      image_url: '',
      clinic_id: 1,
      category_id : 1,
      status: 1,
      short_description: 'Testing',
      charges: 100
    };

    const mockApiService = jasmine.createSpyObj('ApiService', ['post']);
    mockApiService.post.and.returnValue(of({ message : 'Testing'}));
    component.apiService = mockApiService;

    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData', 'getClinicId']);

    component.activeService(fakeService, true);
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  });
});
