import { Component, computed, model, OnInit, Signal, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
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
      link: 'visits',
      permission: 'manage_patient_visits'
    },
    {
      icon : 'fa-solid fa-hospital-user',
      name : 'messages.patients',
      link: 'patients',
      permission: 'manage_patients'
    },
    {
      icon : 'fa-solid fa-id-card',
      name : 'messages.smart_patient_card.smart_patient_cards',
      link: 'smart-patient-cards',
      permission: 'manage_patients',
      groups : ['smart-patient-cards', 'generate-patient-smart-cards'],
    },
    {
      icon : 'fa-solid fa-money-bill-wave',
      name : 'messages.transactions',
      link: 'transactions',
      permission: 'manage_transactions'
    },
    {
      icon : 'fa-solid fa-capsules',
      name : 'messages.medicines',
      link: 'medicines',
      permission: 'manage_medicines',
      groups : ['medicines', 'labels', 'brands', 'brands', 'categories', 'medicine-purchase'],
    },
    {
      icon : 'fa-solid fa-question-circle',
      name : 'messages.enquiries',
      link: 'enquiries',
      permission: 'manage_front_cms'
    },
    {
      icon : 'fa-solid fa-building',
      name : 'messages.clinic_service',
      link: 'clinic-services',
      permission: 'manage_clinic_service'
    },
    {
      icon : 'fa-solid fa-file',
      name : 'messages.reports',
      link: 'reports/sales',
      permission: 'manage_report',
      groups : ['sales', 'service-inventory-sales'],
    },
    {
      icon : 'fa-solid fa-list',
      name : 'messages.master_list',
      link: 'subscribers',
      groups : ['subscribers', 'clinic-document-setting'],
      permission: 'manage_settings'
    },
    {
      icon : 'fa-solid fa-cogs',
      name : 'messages.settings',
      link: 'specializations',
      permission: 'manage_settings',
      groups : ['settings', 'specializations', 'clinic-schedules'],
    },
    {
      icon : 'fa-solid fa-tasks',
      name : 'messages.website',
      link: 'cms',
      permission: 'manage_front_cms',
      groups : ['cms', 'services', 'service-categories', 'sliders', 'faqs', 'testimonials'],
    },
    {
      icon : 'fa-solid fa-users',
      name : 'messages.users',
      link: 'staffs',
      permission: 'manage_staff',
      groups : ['staffs', 'doctors', 'doctor-holidays'],
    },
  ];

  constructor(
    private authService: AuthService,
    private homeService : HomeService,
    private router : Router
  ) {}

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

  isActiveRoute(route: HomeSidebarLink): boolean {
    const currentPath = this.router.url.split('?')[0].split('#')[0];
    const routePaths = [route.link, ...(route.groups || [])];
    return routePaths.some(path => currentPath.endsWith('/' + path) || currentPath === '/' + path);
  }

}

export interface HomeSidebarLink {
  icon: string;
  name: string;
  link: string;
  permission: string;
  groups?: string[];
}
