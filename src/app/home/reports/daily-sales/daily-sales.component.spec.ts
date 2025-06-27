import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailySalesComponent } from './daily-sales.component';
import { ApiService } from '../../../services/api.service';
import { ShareService } from '../../../services/share.service';
import { MockDataTableComponent } from '../../../testing/mock-data-table.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { createMockApiService, createMockAuthService } from '../../../testing/mock';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { of } from 'rxjs';

describe('DailySalesComponent', () => {
  let component: DailySalesComponent;
  let fixture: ComponentFixture<DailySalesComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockShareService: any;

  beforeEach(async () => {
    mockApiService = createMockApiService();
    mockApiService.get.and.returnValue(of({ data : []}))
    mockAuthService = createMockAuthService();
    mockShareService = { 
      PAYMENT_METHOD : {
        1: 'Cash / Bank Transfer',
        2: 'Stripe',
        3: 'Credit / Debit Card',
        4: 'Paypal',
        5: 'Online Banking',
        6: 'E-Wallet / QR Payment'
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        DailySalesComponent,
        MockDataTableComponent,
        HighchartsChartModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: ShareService, useValue: mockShareService },
        { provide: AuthService, useValue: mockAuthService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
