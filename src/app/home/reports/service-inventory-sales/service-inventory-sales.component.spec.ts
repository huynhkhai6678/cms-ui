import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInventorySalesComponent } from './service-inventory-sales.component';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { MockDataTableComponent } from '../../../testing/mock-data-table.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { TranslateModule } from '@ngx-translate/core';
import { createMockApiService, createMockAuthService } from '../../../testing/mock';
import { of } from 'rxjs';

describe('ServiceInventorySalesComponent', () => {
  let component: ServiceInventorySalesComponent;
  let fixture: ComponentFixture<ServiceInventorySalesComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockApiService = createMockApiService();
    mockApiService.get.and.returnValue(of({ data : []}))
    mockAuthService = createMockAuthService();
    
    await TestBed.configureTestingModule({
      imports: [
        ServiceInventorySalesComponent,
        MockDataTableComponent,
        HighchartsChartModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: AuthService, useValue: mockAuthService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceInventorySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
