import { Component, OnInit, signal } from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { CalendarOptions, DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core/index.js';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { HomeService } from '../home.service';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FormService } from '../../services/form.service';
import { AppointmentModalComponent } from './appointment-modal/appointment-modal.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-appointments',
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit {
  calendarVisible = signal(false);
  translationValue : any = [];

  calendarOptions = signal<CalendarOptions>({
    plugins: [
      momentPlugin,
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      bootstrap5Plugin
    ],
    locale: 'en',
    themeSystem: 'bootstrap5',
    buttonText: {
      today: this.translationValue['js.today'],
      day: this.translationValue['js.day'],
      week: this.translationValue['js.week'],
      month: this.translationValue['js.month'],
    },
    headerToolbar: {
      left: 'title',
      center: 'prev,next today',
      right: 'timeGridDay,timeGridWeek,dayGridMonth',
    },
    initialView: 'timeGridWeek',
    dayMaxEvents: true,
    firstDay: 1,
    allDaySlot: false,
    slotDuration: '00:15:00',
    selectable:true,
    views: {
      timeGridWeek: {
        titleFormat: 'DD MMM YYYY',
        dayHeaderFormat: 'dddd, DD/MM',
        eventMaxStack: 2,
        dayPopoverFormat: 'DD MMM YYYY',
        slotLabelFormat: {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        },
      },
      timeGridDay: {
        titleFormat: 'DD MMM YYYY',
        slotLabelFormat: {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        },
      },
      dayGridMonth: {
        displayEventTime: false
      }
    },
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: () => this.currentEvents(),
    eventContent: (arg) => {
      return { html: arg.event.title };
    },
    timeZone: 'local'
  });

  currentEvents = signal<EventInput[]>([]);
  clinicId = 0;

  constructor(
    private formService: FormService,
    private translate : TranslateService,
    public homeService: HomeService,
    private apiService: ApiService,
    private authService : AuthService,
    private activeRoute : ActivatedRoute
  ) {
    translate.get(['js.today', 'js.day', 'js.week', 'js.month']).subscribe(res => {
      this.translationValue = res;
    });
  }

  ngOnInit(): void {
    const calendarOptions = this.calendarOptions();
    calendarOptions.locale = this.translate.currentLang;
    if (calendarOptions.buttonText) {
      calendarOptions.buttonText.today =  this.translationValue['js.today'];
    }

    const time = moment().format("HH:mm:ss");
    calendarOptions.scrollTime = time;

    this.calendarOptions.set(calendarOptions);

    setTimeout(() => {
      this.calendarVisible.set(true);
    }, 100);

    const user = this.authService.getUser();
    if (user) {
      this.clinicId = user.clinic_id;
    }
    this.loadData();

    // Auto open create modal after navigate from list
    this.activeRoute.queryParams.subscribe((params : any) => {
      if (params['openModal']) {
        this.openCreateModal();
      }
    });
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.formService.openEditCreateModal(AppointmentModalComponent, 'modal-lg', {
      title: 'messages.appointment.add_new_appointment',
      clinicId: this.clinicId,
      startTime: selectInfo.startStr,
      endTime: selectInfo.endStr,
    }, () => {
        this.loadData();
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.formService.openEditCreateModal(AppointmentModalComponent, 'modal-lg', {
      title: 'messages.appointment.edit_appointment',
      id : parseInt(clickInfo.event._def.publicId),
      clinicId: this.clinicId,
    }, () => {
        this.loadData();
    });
  }

  loadData() {
    this.apiService.get(`appointments/calendar/${this.clinicId}`).subscribe((res : any) => {
      const data = res['data'];
      this.currentEvents.set(data);

      this.calendarOptions.update((options) => ({
        ...options,
        events: [...data]
      }));
    });
  }

  openCreateModal() {
    const now = new Date();
    const hour = now.getHours() + 1;

    const startTime = new Date(now);
    startTime.setHours(hour, 0, 0, 0);

    const endTime = new Date(now);
    endTime.setHours(hour, 15, 0, 0);

    this.formService.openEditCreateModal(AppointmentModalComponent, 'modal-lg', {
      title: 'messages.appointment.add_new_appointment',
      clinicId: this.clinicId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    }, () => {
        this.loadData();
    });
  }
}
