import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { permissionGuard } from '../auths/permission.guard';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(mod => mod.DashboardComponent),
        canActivate: []
      },
      {
        path: 'appointments',
        loadComponent: () => import('./appointments/appointments.component').then(mod => mod.AppointmentsComponent),
        canActivate: []
      },
      {
          path: 'clinics',
          loadComponent: () => import('./clinics/clinics.component').then(mod => mod.ClinicsComponent),
          canActivate: [permissionGuard('manage_clinics')]
      },
      {
          path: 'clinic-chains',
          loadComponent: () => import('./clinic-chain/clinic-chain.component').then(mod => mod.ClinicChainComponent),
          canActivate: [permissionGuard('manage_clinic_brands')]
      },
      {
        path: 'roles',
        loadComponent: () => import('./roles/roles.component').then(mod => mod.RolesComponent),
        canActivate: [permissionGuard('manage_roles')]
      },
      {
        path: 'currencies',
        loadComponent: () => import('./currencies/currencies.component').then(mod => mod.CurrenciesComponent),
        canActivate: [permissionGuard('manage_currencies')]
      },
      {
          path: 'users',
          loadComponent: () => import('./users/users.component').then(mod => mod.UsersComponent),
          canActivate: [permissionGuard('manage_users')]
      },
      {
          path: 'enquiries',
          loadComponent: () => import('./enquiries/enquiries.component').then(mod => mod.EnquiriesComponent),
          canActivate: [permissionGuard('manage_front_cms')]
      },
      {
        path: 'subscribers',
        loadComponent: () => import('./subscribes/subscribes.component').then(mod => mod.SubscribesComponent),
        canActivate: [permissionGuard('manage_settings')],
      },
      {
        path: 'clinic-services',
        loadComponent: () => import('./clinic-services/clinic-services.component').then(mod => mod.ClinicServicesComponent),
        canActivate: [permissionGuard('manage_clinic_service')]
      },
      {
        path: 'clinic-document-setting',
        loadComponent: () => import('./clinic-document-setting/clinic-document-setting.component').then(mod => mod.ClinicDocumentSettingComponent),
        canActivate: [permissionGuard('manage_settings')],
        data: {
          group: 'master_list',
        }
      },
      {
        path: 'specializations',
        loadComponent: () => import('./specializations/specializations.component').then(mod => mod.SpecializationsComponent),
        canActivate: [permissionGuard('manage_settings')]
      },
      {
        path: 'clinic-schedules',
        loadComponent: () => import('./clinic-schedules/clinic-schedules.component').then(mod => mod.ClinicSchedulesComponent),
        canActivate: [permissionGuard('manage_settings')]
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.component').then(mod => mod.SettingsComponent),
        canActivate: [permissionGuard('manage_settings')]
      },
      {
        path: 'cms',
        loadComponent: () => import('./cms/cms.component').then(mod => mod.CmsComponent),
        canActivate: [permissionGuard('manage_front_cms')]
      },
      {
        path: 'services',
        loadComponent: () => import('./services/services.component').then(mod => mod.ServicesComponent),
        canActivate: [permissionGuard('manage_front_cms')]
      },
      {
        path: 'service-categories',
        loadComponent: () => import('./service-categories/service-categories.component').then(mod => mod.ServiceCategoriesComponent),
        canActivate: [permissionGuard('manage_front_cms')]
      },
      {
        path: 'sliders',
        loadComponent: () => import('./sliders/sliders.component').then(mod => mod.SlidersComponent),
        canActivate: [permissionGuard('manage_front_cms')]
      },
      {
        path: 'faqs',
        loadComponent: () => import('./faqs/faqs.component').then(mod => mod.FaqsComponent),
        canActivate: [permissionGuard('manage_front_cms')]
      },
      {
        path: 'testimonials',
        loadComponent: () => import('./testimonials/testimonials.component').then(mod => mod.TestimonialsComponent),
        canActivate: [permissionGuard('manage_front_cms')]
      },
      {
        path: 'doctors',
        loadComponent: () => import('./doctors/doctors.component').then(mod => mod.DoctorsComponent),
        canActivate: [permissionGuard('manage_doctors')]
      },
      {
        path: 'doctors/:id',
        loadComponent: () => import('./doctors/doctor-detail/doctor-detail.component').then(mod => mod.DoctorDetailComponent),
        canActivate: [permissionGuard('manage_doctors')],
      },
      {
        path: 'staffs',
        loadComponent: () => import('./staffs/staffs.component').then(mod => mod.StaffsComponent),
        canActivate: [permissionGuard('manage_staff')]
      },
      {
        path: 'staffs/:id',
        loadComponent: () => import('./staffs/staff-detail/staff-detail.component').then(mod => mod.StaffDetailComponent),
        canActivate: [permissionGuard('manage_staff')]
      },
      {
        path: 'doctor-holidays',
        loadComponent: () => import('./doctor-holidays/doctor-holidays.component').then(mod => mod.DoctorHolidaysComponent),
        canActivate: [permissionGuard('manage_staff')]
      },
      {
        path: 'patients',
        loadComponent: () => import('./patients/patients.component').then(mod => mod.PatientsComponent),
        canActivate: [permissionGuard('manage_patients')],
      },
      {
        path: 'patients/:id',
        loadComponent: () => import('./patients/patient-detail/patient-detail.component').then(mod => mod.PatientDetailComponent),
        canActivate: [permissionGuard('manage_patients')]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
];