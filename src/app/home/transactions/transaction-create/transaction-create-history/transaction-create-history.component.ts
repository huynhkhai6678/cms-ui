import { httpResource } from '@angular/common/http';
import { Component, computed, input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-create-history',
  imports: [
    DatePipe,
    DecimalPipe,
    TranslatePipe
  ],
  templateUrl: './transaction-create-history.component.html',
  styleUrl: './transaction-create-history.component.scss'
})
export class TransactionCreateHistoryComponent {
  patientId = input<number>(0);
  totalNumber = computed(() => {
    const histories = this.histories.value();
    if (!histories) return 0;

    return histories.reduce((sum, history) => {
      return sum + (history.net_amount || 0);
    }, 0);
  })
  apiUrl = environment.apiUrl;

  histories = httpResource<any[]>(
    () => {
      if (this.patientId() === 0) {
        return;
      }
      return `${this.apiUrl}transactions/get-histories/${this.patientId()}`;
    },
    {
      parse: (response : any) => response.data
    }
  )

}
