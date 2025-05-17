import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-appointment-card',
  imports: [
    TranslatePipe
  ],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss'
})
export class DashboardAppointmentCardComponent {
  @Input() data : any = {}
}
