import { Component, OnInit } from '@angular/core';
import { DashboardUserCardComponent } from './user-card/user-card.component';
import { DashboardErningCardComponent } from './erning-card/erning-card.component';
import { DashboardVisitCardComponent } from './visit-card/visit-card.component';
import { DashboardAppointmentCardComponent } from './appointment-card/appointment-card.component';
import { ApiService } from '../../services/api.service';
import { DashboardAdminChartComponent } from './admin-chart/admin-chart.component';
import { DashboardPatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { Select2 } from 'ng-select2-component';
import { TranslatePipe } from '@ngx-translate/core';
import { HomeService } from '../home.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { DashboardDoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component';
import { DashboardDoctorAppointmentChartComponent } from './doctor-appointment-chart/doctor-appointment-chart.component';
import { DashboardService } from './dashboard.service';
import { DashboardPatientTodayAppointmentComponent } from './patient-today-appointment/patient-today-appointment.component';
import { DashboardPatientUpcommingAppointmentComponent } from './patient-upcomming-appointment/patient-upcomming-appointment.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    Select2,
    TranslatePipe,
    DashboardUserCardComponent,
    DashboardErningCardComponent,
    DashboardVisitCardComponent,
    DashboardAppointmentCardComponent,
    DashboardAdminChartComponent,
    DashboardPatientRegistrationComponent,
    DashboardDoctorAppointmentComponent,
    DashboardDoctorAppointmentChartComponent,
    DashboardPatientTodayAppointmentComponent,
    DashboardPatientUpcommingAppointmentComponent
  ],
  providers: [
    DashboardService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  data : any;
  clinicId = 0;

  constructor(
    public homeService : HomeService,
    private apiService: ApiService,
    public authService: AuthService,
  ) {}

  ngOnInit() {
    this.clinicId = this.authService.getUser().clinic_id;
    this.getData();
  }

  getData() {
    this.apiService.get(`dashboard?clinic_id=${this.clinicId}`).subscribe((res : any) => {
      this.data = res.data;
    })
  }
}
