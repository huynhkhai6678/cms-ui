import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryModalComponent } from './enquiry-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../../services/api.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';

describe('EnquiryModalComponent', () => {
  let component: EnquiryModalComponent;
  let fixture: ComponentFixture<EnquiryModalComponent>;
  let mockBsModalRef: any;
  let mockApiService: any;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['get']);
    mockApiService.get.and.returnValue(of({ data: {
      id: 123,
      name: 'Testing Enquiry',
      email: 'Testing123',
      subject: 'Testing123',
      message: 'Testing123',
      view: false,
      clinic_id: 123
    }}));

    mockBsModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);
    await TestBed.configureTestingModule({
      imports: [
        EnquiryModalComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: BsModalRef, useValue: mockBsModalRef }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.id = 123;
    component.ngOnInit();

    expect(mockApiService.get).toHaveBeenCalledWith('enquiries/123');
    expect(component.enquiry?.name).toBe('Testing Enquiry');
  });
});
