import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { superAdminGuard } from '../auths/superadmin.guard';
import { permissionGuard } from '../auths/permission.guard';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
        {
          path: 'dashboard',
          loadComponent: () => import('./dashboard/dashboard.component').then(mod => mod.DashboardComponent),
          canActivate: [superAdminGuard]
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
            path: 'users',
            loadComponent: () => import('./users/users.component').then(mod => mod.UsersComponent),
            canActivate: [permissionGuard('manage_users')]
        },
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        }
    ]
  },
];