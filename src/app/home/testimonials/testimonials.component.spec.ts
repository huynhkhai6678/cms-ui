import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TestimonialsComponent } from './testimonials.component';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { createMockApiService, createMockAuthService, createMockFormService } from '../../testing/mock';
import { MockDataTableComponent } from '../../testing/mock-data-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { Testimonial } from './testimonial.model';
import { of } from 'rxjs';
import { TestimonialModalComponent } from './testimonial-modal/testimonial-modal.component';

describe('TestimonialsComponent', () => {
  let component: TestimonialsComponent;
  let fixture: ComponentFixture<TestimonialsComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockFormService: jasmine.SpyObj<FormService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockApiService = createMockApiService();
    mockFormService = createMockFormService();
    mockAuthService = createMockAuthService();
        
    await TestBed.configureTestingModule({
      imports: [
        TestimonialsComponent,
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

    fixture = TestBed.createComponent(TestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    const dataTable = fixture.componentInstance.dataTableComponent;
    expect(dataTable.getClinicId()).toBe(123);
  });

  it('should call delete API if confirmed', fakeAsync(() => {
    const fakeTestimonial : Testimonial = {
      id: 123,
      name: 'Testing',
      designation: 'designation',
      short_description: 'short description',
      clinic_id: 123
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(true));
    mockApiService.delete.and.returnValue(of({}));
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData']);

    component.delete(fakeTestimonial);
    tick();

    expect(mockFormService.showDeleteConfirm).toHaveBeenCalledWith('Testing');
    expect(mockApiService.delete).toHaveBeenCalledWith('testimonials/123');
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  }));

  it('should not call delete API if not confirmed', fakeAsync(() => {
    const fakeTestimonial : Testimonial = {
      id: 123,
      name: 'Testing',
      designation: 'designation',
      short_description: 'short description',
      clinic_id: 123
    };

    mockFormService.showDeleteConfirm.and.returnValue(of(false));

    component.delete(fakeTestimonial);
    tick();

    expect(mockApiService.delete).not.toHaveBeenCalled();
  }));

  it('should open create modal and reload data on callback', () => {
    component.dataTableComponent = jasmine.createSpyObj('DataTableComponent', ['reloadData', 'getClinicId']);
    (component.dataTableComponent.getClinicId as jasmine.Spy).and.returnValue(123);

    component.create();

    expect(mockFormService.openEditCreateModal).toHaveBeenCalledWith(
      TestimonialModalComponent,
      'modal-lg',
      { title: 'messages.front_patient_testimonial.add_front_patient_testimonial', clinicId : 123 },
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
      TestimonialModalComponent,
      'modal-lg',
      { title: 'messages.front_patient_testimonial.edit_front_patient_testimonial', id: 99, clinicId: 123 },
      jasmine.any(Function)
    );

    const callback = mockFormService.openEditCreateModal.calls.mostRecent().args[3];
    if (typeof callback === 'function') {
      callback();
    }
    expect(component.dataTableComponent.reloadData).toHaveBeenCalled();
  });
});
