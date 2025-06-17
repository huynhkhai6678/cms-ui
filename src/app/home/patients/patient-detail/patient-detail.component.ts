import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranslatePipe } from '@ngx-translate/core';
import moment from 'moment';
import { PatientDetailAppointmentComponent } from './patient-detail-appointment/patient-detail-appointment.component';
import { ShareService } from '../../../services/share.service';
import { DiffForHumansPipe } from '../../../pipes/diff-for-humans.pipe';
import { Location } from '@angular/common';
import { FormService } from '../../../services/form.service';
import { PatientModalComponent } from '../patient-modal/patient-modal.component';

@Component({
  selector: 'app-patient-detail',
  imports: [
    TabsModule,
    TranslatePipe,
    PatientDetailAppointmentComponent,
    DiffForHumansPipe
  ],
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.scss'
})
export class PatientDetailComponent implements OnInit {
  id = 0;
  data : any = null;

  completedAppointment = [];
  todayAppointment = [];
  upcommingComponent = [];
  BLOOD_GROUP : Record<string, any> = {};
  GENDER : Record<string, any> = {}

  constructor(
    private activeRoute : ActivatedRoute,
    private apiService : ApiService,
    private shareService : ShareService,
    private location : Location,
    private formService : FormService
  ) {}
  
  ngOnInit(): void {
    this.BLOOD_GROUP = this.shareService.BLOOD_GROUP;
    this.GENDER = this.shareService.GENDER;
    
    this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loadData();
    });
  }

  loadData() {
    this.apiService.get(`patients/detail/${this.id}`).subscribe((res : any) => {
      this.data = res['data'];
      const today = moment().format('YYYY-MM-DD');

      this.todayAppointment = this.data.appointments.filter(
        (appt : any) => moment(appt.date).isSame(today, 'day')
      );

      this.upcommingComponent = this.data.appointments.filter(
        (appt : any) => moment(appt.date).isAfter(today, 'day')
      );

      this.completedAppointment = this.data.appointments.filter(
        (appt : any) => moment(appt.date).isBefore(today, 'day')
      );
    });
  }

  goBack() {
    this.location.back();
  }

  openEditModal() {
    this.formService.openEditCreateModal(PatientModalComponent, 'modal-xl', {
      title: 'messages.patient.edit',
      id : this.id,
    }, () => {
      this.loadData()
    });
  }
}
