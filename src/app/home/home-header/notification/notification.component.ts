import { Component, computed, OnInit, signal } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Notification } from './notification.model';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TranslatePipe } from '@ngx-translate/core';
import { DiffForHumansPipe } from '../../../pipes/diff-for-humans.pipe';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-notification',
  imports: [
    BsDropdownModule,
    TranslatePipe,
    DiffForHumansPipe
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  data = signal<Notification[]>([]);
  unreadNotification = computed(() => {
    return this.data().filter(not => { return !not.read_at}).length;
  });

  constructor(public apiService: ApiService, private homeService: HomeService) {}

  ngOnInit(): void {
    this.getNotification();
    this.homeService.onMessage().subscribe(() => {
      this.getNotification();
    })
  }

  getNotification(){
    this.apiService.get('notifications').subscribe((res : any) => {
      this.data.set(res['data']);
    });
  }

  read(id : number) {
    this.apiService.get(`notifications/read/${id}`).subscribe((res : any) => {
      const newNoti = res['data'];
      this.data.update(notifications =>
        notifications.map(noti =>
          noti.id === newNoti.id ? { ...newNoti } : noti
        )
      );
    });
  }

  readAll() {
    this.apiService.get(`notifications/read-all`).subscribe(() => {
      this.data.update(notifications =>
        notifications.map(noti => ({
          ...noti,
          read_at: new Date().toDateString()
        }))
      );
    });
  }
}
