import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { ClinicServicesComponent } from './clinic-services.component';
import { TranslateModule } from '@ngx-translate/core';
import { ClinicServiceModalComponent } from './clinic-service-modal/clinic-service-modal.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { TemplateRef } from '@angular/core';
import { of } from 'rxjs';
import { ClinicService } from './clinic-service.model';
import { AuthService } from '../../services/auth.service';
import { MockDataTableComponent } from '../../testing/mock-data-table.component';

describe('ClinicServicesComponent', () => {
  let component: ClinicServicesComponent;
  let fixture: ComponentFixture<ClinicServicesComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['delete', 'post']);
    mockFormService = jasmine.createSpyObj('FormService', ['showDeleteConfirm', 'openEditCreateModal']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['getUser', 'getToken']);
    mockAuthService.getUser.and.returnValue({ clinic_id: 123 });
    mockAuthService.getUser.and.returnValue('dsfsdf3434');

    await TestBed.configureTestingModule({
      imports: [
        ClinicServicesComponent,
        MockDataTableComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: FormService, useValue: mockFormService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicServicesComponent);
    component = fixture.componentInstance;

    // Mock ViewChild TemplateRefs
    component.activeTemplate = {} as TemplateRef<any>;
    component.categoryTemplate = {} as TemplateRef<any>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should assign templates in ngAfterViewInit', () => {
    component.ngAfterViewInit();

    expect(component.columnCustomTemplates['active']).toBe(component.activeTemplate);
    expect(component.columnCustomTemplates['category']).toBe(component.categoryTemplate);
  });

  it('should call delete API if confirmed', fakeAsync(() => {
    const fakeService: ClinicService = { id: 123, name: 'Test Service' } as ClinicService;

    mockFormService.showDeleteConfirm.and.returnValue(of(true));
    mockApiService.delete.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.delete(fakeService);
    tick();

    expect(mockFormService.showDeleteConfirm).toHaveBeenCalledWith('Test Service');
    expect(mockApiService.delete).toHaveBeenCalledWith('clinic-services/123');
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  }));

  it('should not call delete API if not confirmed', fakeAsync(() => {
    mockFormService.showDeleteConfirm.and.returnValue(of(false));

    component.delete({ id: 123, name: 'Fake' } as ClinicService);
    tick();

    expect(mockApiService.delete).not.toHaveBeenCalled();
  }));

  it('should open create modal and reload data on callback', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.create();

    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      ClinicServiceModalComponent,
      'modal-lg',
      { title: 'messages.clinic-service.add_clinic_service' },
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
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.edit(99);

    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      ClinicServiceModalComponent,
      'modal-lg',
      { title: 'messages.clinic-service.edit_clinic_service', id: 99 },
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

    expect(component.dataTableComponent.handleFilterChange).toHaveBeenCalledWith({ active: true });
  });

  it('should call post API and reload data when activeService is called', fakeAsync(() => {
    mockApiService.post.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    const item = { id: 1 } as ClinicService;
    const input = { checked: true };

    component.activeService(item, input);
    tick();

    expect(mockApiService.post).toHaveBeenCalledWith('clinic-services/update-active/1', {
      active: true
    });
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  }));

  it('should return category name based on id', () => {
    expect(component.getCategoryName(3)).toBe('Treatment');
    expect(component.getCategoryName(999)).toBe('Unknown Category');
  });
});
