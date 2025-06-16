import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ApiService } from '../../../services/api.service';
import { ShareService } from '../../../services/share.service';
import moment from 'moment';
import { DoctorDetailAppointmentComponent } from './doctor-detail-appointment/doctor-detail-appointment.component';
import { FormService } from '../../../services/form.service';
import { DoctorModalComponent } from '../doctor-modal/doctor-modal.component';
import { DiffForHumansPipe } from '../../../pipes/diff-for-humans.pipe';

@Component({
  selector: 'app-doctor-detail',
  imports: [
    TabsModule,
    TranslatePipe,
    RouterLink,
    DoctorDetailAppointmentComponent,
    DiffForHumansPipe
  ],
  templateUrl: './doctor-detail.component.html',
  styleUrl: './doctor-detail.component.scss'
})
export class DoctorDetailComponent implements OnInit {
  id = 0;
  data : any = null;

  totalAppointment = [];
  todayAppointment = [];
  upcommingComponent = [];
  BLOOD_GROUP : Record<string, any> = {};
  GENDER : Record<string, any> = {}

  constructor(private activeRoute : ActivatedRoute, private apiService : ApiService, public shareService : ShareService, private formService : FormService) {}
  
  ngOnInit(): void {
    this.BLOOD_GROUP = this.shareService.BLOOD_GROUP;
    this.GENDER = this.shareService.GENDER;
    
    this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loadData();
    });
  }

  loadData() {
    this.apiService.get(`doctors/detail/${this.id}`).subscribe((res : any) => {
      this.data = res['data'];
      const today = moment().format('YYYY-MM-DD');

      this.todayAppointment = this.data.appointments.filter(
        (appt : any) => moment(appt.date).isSame(today, 'day')
      );

      this.upcommingComponent = this.data.appointments.filter(
        (appt : any) => moment(appt.date).isAfter(today, 'day')
      );

      this.totalAppointment = this.data.appointments;
    });
  }

  edit(id: number) {
    this.formService.openEditCreateModal(DoctorModalComponent, 'modal-lg', {
      title: 'messages.doctor.edit',
      id,
    }, () => {
      this.loadData();
    });
  }
}
