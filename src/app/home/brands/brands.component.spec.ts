import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrandsComponent } from './brands.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { createMockApiService, createMockAuthService, createMockFormService } from '../../testing/mock';
import { MockDataTableComponent } from '../../testing/mock-data-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { Brand } from './brand.model';
import { of } from 'rxjs';
import { BrandModalComponent } from './brand-modal/brand-modal.component';

describe('BrandsComponent', () => {
  let component: BrandsComponent;
  let fixture: ComponentFixture<BrandsComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockApiService = createMockApiService();
    mockFormService = createMockFormService();
    mockAuthService = createMockAuthService();

    await TestBed.configureTestingModule({
      imports: [
        BrandsComponent,
        MockDataTableComponent,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: FormService, useValue: mockFormService },
        { provide: AuthService, useValue: mockAuthService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete API if confirmed', fakeAsync(() => {
    const fakeBrand : Brand = {
      id: 123,
      name: 'Testing',
      contact: 'designation',
      email: 'asb@abc.com',
      address: '123',
      contact_person: '123456',
      payment_terms : 'short description',
      website: 'website',
      comment: 'comment',
      clinic_id: 123
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(true));
    mockApiService.delete.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.delete(fakeBrand);
    tick();

    expect(mockFormService.showDeleteConfirm).toHaveBeenCalledWith('Testing');
    expect(mockApiService.delete).toHaveBeenCalledWith('brands/123');
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  }));

  it('should not call delete API if not confirmed', fakeAsync(() => {
    const fakeBrand : Brand = {
      id: 123,
      name: 'Testing',
      contact: 'designation',
      email: 'asb@abc.com',
      address: '123',
      contact_person: '123456',
      payment_terms : 'short description',
      website: 'website',
      comment: 'comment',
      clinic_id: 123
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(false));

    component.delete(fakeBrand);
    tick();

    expect(mockApiService.delete).not.toHaveBeenCalled();
  }));

  it('should open create modal and reload data on callback', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData', 'getClinicId']);
    (component.dataTableComponent.getClinicId as jasmine.Spy).and.returnValue(123);

    component.create();

    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      BrandModalComponent,
      'modal-lg',
      { title: 'messages.medicine.new_medicine_brand', clinicId : 123 },
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
      BrandModalComponent,
      'modal-lg',
      { title: 'messages.medicine.edit_medicine_brand', id: 99, clinicId: 123 },
      jasmine.any(Function)
    );

    const callback = mockFormService.openEditCreateModal.calls.mostRecent().args[3];
    if (typeof callback === 'function') {
      callback();
    }
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  });
});
