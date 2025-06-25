import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../../services/api.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PAYMENT_TYPE } from '../medicine-purchase.constant';
import { DiffForHumansPipe } from '../../../pipes/diff-for-humans.pipe';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-show-medicine-purchase-modal',
  imports: [
    TranslatePipe,
    DecimalPipe,
    DiffForHumansPipe
  ],
  templateUrl: './show-medicine-purchase-modal.component.html',
  styleUrl: './show-medicine-purchase-modal.component.scss'
})
export class ShowMedicinePurchaseModalComponent implements OnInit {
  id = 0;
  data : any;
  PAYMENT_TYPE = PAYMENT_TYPE;

  constructor( 
    private apiService : ApiService,
    public bsModalRef: BsModalRef 
  ) {}

  ngOnInit(): void {
    this.apiService.get(`medicine-purchase/${this.id}`).subscribe((res : any) => {
      this.data = res['data'];
    });
  }

  getBuyingPrice(item: any) {
    const price = item.amount / item.quantity;
    return Number(price).toFixed(2);
  }
}
