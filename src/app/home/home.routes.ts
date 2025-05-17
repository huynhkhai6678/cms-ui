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
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        }
    ]
  },
];