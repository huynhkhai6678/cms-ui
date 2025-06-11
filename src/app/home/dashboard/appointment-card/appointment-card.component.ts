import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-appointment-card',
  imports: [
    RouterLink,
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss'
})
export class DashboardAppointmentCardComponent {
  @Input() data : any = {}

  constructor(public authService: AuthService) {}
}
