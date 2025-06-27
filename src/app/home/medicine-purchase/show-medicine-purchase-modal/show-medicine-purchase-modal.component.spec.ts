import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMedicinePurchaseModalComponent } from './show-medicine-purchase-modal.component';
import { of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from '../../../services/api.service';
import { TranslateModule } from '@ngx-translate/core';

describe('ShowMedicinePurchaseModalComponent', () => {
  let component: ShowMedicinePurchaseModalComponent;
  let fixture: ComponentFixture<ShowMedicinePurchaseModalComponent>;
  let mockBsModalRef: any;
  let mockApiService: any;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['get']);
    mockApiService.get.and.returnValue(of({ data: { 
        "id": "27",
        "purchase_no": "730149",
        "tax": 0,
        "total": 10000,
        "net_amount": 10000,
        "payment_type": 0,
        "discount": 0,
        "note": null,
        "payment_note": null,
        "created_at": "2025-04-08T04:22:59.000Z",
        "updated_at": "2025-04-08T04:22:59.000Z",
        "brand_id": "7",
        "shipping_fee": 0,
        "clinic_id": "28",
        "purchased_medicines": [
            {
                "id": "18",
                "purchase_medicines_id": "27",
                "medicine_id": "27",
                "expiry_date": null,
                "lot_no": "",
                "tax": 0,
                "quantity": 10,
                "amount": 10000,
                "created_at": "2025-04-08T04:22:59.000Z",
                "updated_at": "2025-04-08T04:22:59.000Z",
                "label_id": "1",
                "medicine": {
                    "id": "27",
                    "name": "Inventoryclinic2",
                    "selling_price": null,
                    "buying_price": null,
                    "quantity": 0,
                    "available_quantity": 100,
                    "salt_composition": null,
                    "description": null,
                    "side_effects": null,
                    "comment": null,
                    "type": "1",
                    "code": null,
                    "default_dispense": "",
                    "uom": "Capsule/s",
                    "dosage": "",
                    "frequency": "",
                    "purpose": "",
                    "administration": "",
                    "packing": null,
                    "inventory_image": "",
                    "currency_symbol": "4",
                    "created_at": "2025-04-08T03:12:11.000Z",
                    "updated_at": "2025-04-08T08:14:49.000Z",
                    "low_stock_level": null,
                    "reorder_level": null,
                    "expiration_warning": null,
                    "first_expiration_date": "2025-04-08T03:17:18.000Z",
                    "active": true,
                    "clinic_id": "28"
                },
                "label": {
                    "id": "1",
                    "name": "Box",
                    "type": 1,
                    "created_at": "2024-10-26T10:32:17.000Z",
                    "updated_at": "2024-10-26T10:32:17.000Z",
                    "clinic_id": "1"
                }
            }
        ],
        "brand": {
            "id": "7",
            "name": "sdfsdf",
            "email": "sdfsdffds@dsfsdf.com",
            "phone": "+6045345345",
            "created_at": "2025-04-08T02:01:43.000Z",
            "updated_at": "2025-04-08T02:01:43.000Z",
            "address": null,
            "contact_person": null,
            "payment_terms": null,
            "website": null,
            "comment": null,
            "clinic_id": "28"
      } 
    } }));

    await TestBed.configureTestingModule({
      imports: [ShowMedicinePurchaseModalComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: BsModalRef, useValue: mockBsModalRef },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMedicinePurchaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
