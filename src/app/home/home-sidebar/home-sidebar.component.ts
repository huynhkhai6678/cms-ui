import { Component, computed, model, OnInit, Signal, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../home.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './home-sidebar.component.html',
  styleUrl: './home-sidebar.component.scss'
})
export class HomeSidebarComponent implements OnInit {
  routes = signal<HomeSidebarLink[]>([]);
  search = model<string>('');
  collapse! : Signal<boolean>;

  filteredRoutes = computed(() =>
    this.routes().filter(s => {
      return s.name.toLowerCase().includes(this.search().toLowerCase())
    })
  );

  readonly allRoutes : HomeSidebarLink[] = [
    {
      icon : 'fa-solid fa-calendar',
      name : 'messages.clinics.clinics',
      link: 'clinics',
      permission : 'manage_clinics'
    },
    {
      icon : 'fa-solid fa-calendar',
      name : 'messages.clinic_chains.clinic_chains',
      link: 'clinic-chains',
      permission : 'manage_clinic_brands'
    },
    {
      icon : 'fa-solid fa-calendar',
      name : 'messages.user_manage.users',
      link: 'users',
      permission : 'manage_users'
    },
    {
      icon : 'fa-solid fa-calendar',
      name : 'messages.setting.currency',
      link: 'currencies',
      permission : 'manage_users'
    },
    {
      icon : 'fa-solid fa-calendar',
      name : 'messages.role.role',
      link: 'roles',
      permission : 'manage_users'
    },
    {
      icon : 'fa-solid fa-digital-tachograph',
      name : 'messages.dashboard',
      link: 'dashboard',
      permission : 'manage_admin_dashboard'
    },
    {
      icon : 'fa-solid fa-calendar-alt',
      name : 'messages.appointments',
      link: 'appointments',
      permission: 'manage_appointments'
    },
    {
      icon : 'fa-solid fa-calendar',
      name : 'messages.queue',
      link: 'queues',
      permission: 'manage_patient_visits'
    },
    {
      icon : 'fa-solid fa-hospital-user',
      name : 'messages.patients',
      link: 'patients',
      permission: 'manage_patients'
    }
  ];

  constructor(
    private authService: AuthService,
    private homeService : HomeService
  ) {

  }

  ngOnInit(): void {
    const user : any = this.authService.getUser();
    if (!user) {
      return;
    }

    const permissions : string[] = this.authService.getPermission();
    this.routes.set(this.allRoutes.filter((router) => { return permissions.includes(router.permission)}));
    this.collapse = this.homeService.collapseSider;
  }

  collapseMenu() {
    this.homeService.updateCollapseSidebar();
  }
}

export interface HomeSidebarLink {
  icon: string;
  name: string;
  link: string;
  permission: string;
}
