import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SubscribesComponent } from './subscribes.component';
import { FormService } from '../../services/form.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { createMockApiService, createMockAuthService, createMockFormService } from '../../testing/mock';
import { MockDataTableComponent } from '../../testing/mock-data-table.component';
import { Subscribe } from './subscribe.model';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';


describe('SubscribesComponent', () => {
  let component: SubscribesComponent;
  let fixture: ComponentFixture<SubscribesComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockApiService = createMockApiService();
    mockFormService = createMockFormService();
    mockAuthService = createMockAuthService();

    await TestBed.configureTestingModule({
      imports: [SubscribesComponent, MockDataTableComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: FormService, useValue: mockFormService },
        { provide: AuthService, useValue: mockAuthService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete API if confirmed', fakeAsync(() => {
    const fakeSpecialization : Subscribe = {
      id: 123,
      email: 'Testing@testing.com',
      subscribe: false,
      clinic_id: 123
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(true));
    mockApiService.delete.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.delete(fakeSpecialization);
    tick();

    expect(mockFormService.showDeleteConfirm).toHaveBeenCalledWith('Testing@testing.com');
    expect(mockApiService.delete).toHaveBeenCalledWith('subscribers/123');
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  }));

  it('should not call delete API if not confirmed', fakeAsync(() => {
   const fakeSpecialization : Subscribe = {
      id: 123,
      email: 'Testing@testing.com',
      subscribe: false,
      clinic_id: 123
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(false));

    component.delete(fakeSpecialization);
    tick();

    expect(mockApiService.delete).not.toHaveBeenCalled();
  }));
});
