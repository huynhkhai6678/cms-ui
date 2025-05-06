import { Component, computed, model, OnInit, Signal, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home-sidebar',
  standalone: true,
  imports: [
    RouterModule,
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
      name : 'Clinics',
      link: 'clinics',
      permission : 'manage_clinics'
    },
    {
      icon : 'fa-solid fa-calendar',
      name : 'Chains',
      link: 'clinic-chains',
      permission : 'manage_clinic_brands'
    },
    {
      icon : 'fa-solid fa-calendar',
      name : 'Users',
      link: 'users',
      permission : 'manage_users'
    },
    {
      icon : 'fa-solid fa-digital-tachograph',
      name : 'Dashboard',
      link: 'dashboard',
      permission : 'manage_admin_dashboard'
    },
    {
      icon : 'fa-solid fa-calendar-alt',
      name : 'Appointments',
      link: 'appointments',
      permission: 'manage_appointments'
    },
    {
      icon : 'fa-solid fa-calendar',
      name : 'Queues',
      link: 'queues',
      permission: 'manage_patient_visits'
    },
    {
      icon : 'fa-solid fa-hospital-user',
      name : 'Patients',
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
