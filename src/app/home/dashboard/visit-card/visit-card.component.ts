import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-visit-card',
  imports: [
    TranslatePipe
  ],
  templateUrl: './visit-card.component.html',
  styleUrl: './visit-card.component.scss'
})
export class DashboardVisitCardComponent {
  @Input() data : any = {}
}
