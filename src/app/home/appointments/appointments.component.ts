import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core/index.js';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-appointments',
  imports: [
    CommonModule,
    FullCalendarModule
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
    // scrollTime: moment().format("HH:mm:ss"),
    views: {
      timeGridWeek: {
          titleFormat: 'DD MMM YYYY',
          dayHeaderFormat: 'dddd, DD/MM',
          eventMaxStack: 2,
          dayPopoverFormat: 'DD MMM YYYY'
      },
      timeGridDay: {
          titleFormat: 'DD MMM YYYY',
      },
      dayGridMonth: {
          displayEventTime: false
      }
    },
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });

  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef, private translate : TranslateService) {
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
    this.calendarOptions.set(calendarOptions);
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;

    console.log(selectInfo);
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
