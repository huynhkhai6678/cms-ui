import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { EnquiriesComponent } from './enquiries.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { AuthService } from '../../services/auth.service';
import { MockDataTableComponent } from '../../testing/mock-data-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { createMockApiService, createMockAuthService, createMockFormService } from '../../testing/mock';
import { of } from 'rxjs';
import { Enquiry } from './enquiry.model';
import { EnquiryModalComponent } from './enquiry-modal/enquiry-modal.component';

describe('EnquiriesComponent', () => {
  let component: EnquiriesComponent;
  let fixture: ComponentFixture<EnquiriesComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockApiService = createMockApiService();
    mockFormService = createMockFormService();
    mockAuthService = createMockAuthService();

    await TestBed.configureTestingModule({
      imports: [
        EnquiriesComponent,
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

    fixture = TestBed.createComponent(EnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete API if confirmed', fakeAsync(() => {
    const fakeEnquiry : Enquiry = {
      id: 123,
      name: 'Testing',
      email: 'Testing123',
      subject: 'Testing123',
      message: 'Testing123',
      view: false,
      clinic_id: 123
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(true));
    mockApiService.delete.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.delete(fakeEnquiry);
    tick();

    expect(mockFormService.showDeleteConfirm).toHaveBeenCalledWith('Testing');
    expect(mockApiService.delete).toHaveBeenCalledWith('enquiries/123');
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  }));

  it('should not call delete API if not confirmed', fakeAsync(() => {
   const fakeEnquiry : Enquiry = {
      id: 123,
      name: 'Testing',
      email: 'Testing123',
      subject: 'Testing123',
      message: 'Testing123',
      view: false,
      clinic_id: 123
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(false));

    component.delete(fakeEnquiry);
    tick();

    expect(mockApiService.delete).not.toHaveBeenCalled();
  }));

  it('should open view modal', () => {  
    component.view(123);
    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      EnquiryModalComponent,
      'modal-lg',
      { id: 123 }
    );
  });

  it('should call handleFilterChange when status change', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['handleFilterChange']);
    component.filterParams = {
      view : 1
    };
    component.filterChange();

    expect(component.dataTableComponent.handleFilterChange).toHaveBeenCalledWith({ view: 1 });
  });
});
