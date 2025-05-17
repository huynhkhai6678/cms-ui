import { Component, OnInit } from '@angular/core';
import { DashboardUserCardComponent } from './user-card/user-card.component';
import { DashboardErningCardComponent } from './erning-card/erning-card.component';
import { DashboardVisitCardComponent } from './visit-card/visit-card.component';
import { DashboardAppointmentCardComponent } from './appointment-card/appointment-card.component';
import { ApiService } from '../../services/api.service';
import { DashboardAdminChartComponent } from './admin-chart/admin-chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardUserCardComponent,
    DashboardErningCardComponent,
    DashboardVisitCardComponent,
    DashboardAppointmentCardComponent,
    DashboardAdminChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  data : any;

  constructor(
      private apiService: ApiService,
  ) {
  
  }

  ngOnInit(): void {
    this.apiService.get('dashboard').subscribe((res : any) => {
      this.data = res.data;
    })
  }
}
