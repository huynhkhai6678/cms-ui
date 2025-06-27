import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { createMockApiService, createMockAuthService, createMockFormService } from '../../testing/mock';
import { MockDataTableComponent } from '../../testing/mock-data-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { Category } from './category.model';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockApiService = createMockApiService();
    mockFormService = createMockFormService();
    mockAuthService = createMockAuthService();

    await TestBed.configureTestingModule({
      imports: [
        CategoriesComponent,
        MockDataTableComponent,
        TranslateModule.forRoot(),
        ToastrModule.forRoot()
      ],
      providers: [
        provideAnimations(),
        { provide: ApiService, useValue: mockApiService },
        { provide: FormService, useValue: mockFormService },
        { provide: AuthService, useValue: mockAuthService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete API if confirmed', fakeAsync(() => {
    const fakeCategory : Category = {
      id: 123,
      name: 'Testing',
      is_active: true,
      clinic_id: 123
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(true));
    mockApiService.delete.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.delete(fakeCategory);
    tick();

    expect(mockFormService.showDeleteConfirm).toHaveBeenCalledWith('Testing');
    expect(mockApiService.delete).toHaveBeenCalledWith('categories/123');
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  }));

  it('should not call delete API if not confirmed', fakeAsync(() => {
    const fakeCategory : Category = {
      id: 123,
      name: 'Testing',
      is_active: true,
      clinic_id: 123
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(false));

    component.delete(fakeCategory);
    tick();

    expect(mockApiService.delete).not.toHaveBeenCalled();
  }));

  it('should open create modal and reload data on callback', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData', 'getClinicId']);
    (component.dataTableComponent.getClinicId as jasmine.Spy).and.returnValue(123);

    component.create();

    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      CategoryModalComponent,
      'modal-md',
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
      CategoryModalComponent,
      'modal-lg',
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
});

