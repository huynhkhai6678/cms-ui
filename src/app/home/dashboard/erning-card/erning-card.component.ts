import { Component, computed, Signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DashboardService } from '../dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-erning-card',
  imports: [
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './erning-card.component.html',
  styleUrl: './erning-card.component.scss'
})
export class DashboardErningCardComponent {
  earningThisMonth! : Signal<number>;
  earningLastMonth! : Signal<number>;
  isReduce = computed(() => {
    return parseFloat(this.percentChange()) > 0 ? false : true;
  });

  percentChange = computed(() => {
    if (this.earningLastMonth() === 0 && this.earningThisMonth() > 0) {
      return "100.00";
    } else if (this.earningLastMonth() === 0 && this.earningThisMonth() === 0) {
      return "0.00";
    }

    return ((this.earningThisMonth() - this.earningLastMonth()) / this.earningLastMonth() * 100).toFixed(2);
  })

  constructor(private dashboardService: DashboardService) {
    this.earningThisMonth = this.dashboardService.earningThisMonth;
    this.earningLastMonth = this.dashboardService.earningLastMonth;
  }
}
