import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CurrenciesComponent } from './currencies.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { AuthService } from '../../services/auth.service';
import { ClinicServicesComponent } from '../clinic-services/clinic-services.component';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CurrencyModalComponent } from './currency-modal/currency-modal.component';
import { MockDataTableComponent } from '../../testing/mock-data-table.component';

describe('CurrenciesComponent', () => {
  let component: CurrenciesComponent;
  let fixture: ComponentFixture<CurrenciesComponent>;
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
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete API if confirmed', fakeAsync(() => {
    const fakeCurrency = { id: 123, currency_name: 'Dollar', currency_icon: '$', currency_code: 'USD' };

    mockFormService.showDeleteConfirm.and.returnValue(of(true));
    mockApiService.delete.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.delete(fakeCurrency.id, fakeCurrency.currency_name);
    tick();

    expect(mockFormService.showDeleteConfirm).toHaveBeenCalledWith('Dollar');
    expect(mockApiService.delete).toHaveBeenCalledWith('currencies/123');
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  }));

  it('should not call delete API if not confirmed', fakeAsync(() => {
    const fakeCurrency = { id: 123, currency_name: 'Dollar', currency_icon: '$', currency_code: 'USD' };
    mockFormService.showDeleteConfirm.and.returnValue(of(false));

    component.delete(fakeCurrency.id, fakeCurrency.currency_name);
    tick();

    expect(mockApiService.delete).not.toHaveBeenCalled();
  }));

  it('should open create modal and reload data on callback', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.create();

    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      CurrencyModalComponent,
      'modal-md',
      { title: 'messages.currency.add_currency' },
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
      CurrencyModalComponent,
      'modal-md',
      { title: 'messages.currency.edit_currency', id: 99 },
      jasmine.any(Function)
    );

    const callback = mockFormService.openEditCreateModal.calls.mostRecent().args[3];
    if (typeof callback === 'function') {
      callback();
    }
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  });
});
