import { Component, Input, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard-user-card',
  imports: [
    TranslatePipe
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class DashboardUserCardComponent implements OnInit {
  @Input() data : any = {
    doctor_count : 0,
    patient_count : 0,
    today_appointment_count : 0,
    total_registered_patient : 0
  }
  user : any;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

}
