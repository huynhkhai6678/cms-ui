import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MedicinePurchaseComponent } from './medicine-purchase.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { AuthService } from '../../services/auth.service';
import { createMockApiService, createMockAuthService, createMockFormService } from '../../testing/mock';
import { MockDataTableComponent } from '../../testing/mock-data-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { MedicinePurchaseModalComponent } from './medicine-purchase-modal/medicine-purchase-modal.component';
import { ShowMedicinePurchaseModalComponent } from './show-medicine-purchase-modal/show-medicine-purchase-modal.component';

describe('MedicinePurchaseComponent', () => {
  let component: MedicinePurchaseComponent;
  let fixture: ComponentFixture<MedicinePurchaseComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockApiService = createMockApiService();
    mockFormService = createMockFormService();
    mockAuthService = createMockAuthService();

    await TestBed.configureTestingModule({
      imports: [
        MedicinePurchaseComponent,
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

    fixture = TestBed.createComponent(MedicinePurchaseComponent);
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
      purchase_no: '123456'
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(true));
    mockApiService.delete.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.delete(fakeMedicine);
    tick();

    expect(mockFormService.showDeleteConfirm).toHaveBeenCalledWith('123456');
    expect(mockApiService.delete).toHaveBeenCalledWith('medicine-purchase/123');
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
      MedicinePurchaseModalComponent,
      'modal-xl',
      { title: 'messages.purchase_medicine.purchase_medicines', clinicId : 123 },
      jasmine.any(Function)
    );

    // Simulate callback
    const callback = mockFormService.openEditCreateModal.calls.mostRecent().args[3];
    if (typeof callback === 'function') {
      callback();
    }
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  });

  it('should open show modal', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData', 'getClinicId']);
    (component.dataTableComponent.getClinicId as jasmine.Spy).and.returnValue(123);

    component.show(99);

    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      ShowMedicinePurchaseModalComponent,
      'modal-xl',
      { id: 99 },
    );
  });

  // it('should download file with correct filename and URL', () => {
  //   // Arrange
  //   const mockResponse = new Blob(['test'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  //   // Spy on utility function
  //   const downloadSpy = spyOn(fileUtils, 'downloadFile');

  //   // Mock getClinicId
  //   component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['getClinicId']);
  //   (component.dataTableComponent.getClinicId as jasmine.Spy).and.returnValue(123);

  //   // Mock downloadFile API call
  //   component.apiService = jasmine.createSpyObj('ApiService', ['downloadFile']);
  //   (component.apiService.downloadFile as jasmine.Spy).and.returnValue(of(mockResponse));

  //   // Act
  //   component.export();

  //   // Assert
  //   expect(component.apiService.downloadFile).toHaveBeenCalledWith('medicine-purchase/export/123');
  //   expect(downloadSpy).toHaveBeenCalledWith(mockResponse, 'report.xlsx');
  // });
});
