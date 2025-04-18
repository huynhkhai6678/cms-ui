import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { superAdminGuard } from '../auths/superadmin.guard';
import { adminGuard } from '../auths/admin.guard';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
        {
          path: 'dashboard',
          loadComponent: () => import('./dashboard/dashboard.component').then(mod => mod.DashboardComponent),
          canActivate: [adminGuard]
        },
        {
            path: 'clinics',
            loadComponent: () => import('./clinics/clinics.component').then(mod => mod.ClinicsComponent),
            canActivate: [superAdminGuard]
        },
        {
            path: 'clinic-chains',
            loadComponent: () => import('./clinic-chain/clinic-chain.component').then(mod => mod.ClinicChainComponent),
            canActivate: [superAdminGuard]
        },
        {
            path: 'users',
            loadComponent: () => import('./users/users.component').then(mod => mod.UsersComponent),
            canActivate: [superAdminGuard]
        },
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        }
    ]
  },
];