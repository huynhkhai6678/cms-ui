import { Routes } from '@angular/router';
import { authGuard } from './auths/auth.guard';
import { permissionGuard } from './auths/permission.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./front/front.routes').then(mod => mod.frontRoutes)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then(mod => mod.homeRoutes),
        canActivate: [authGuard] 
    },
    {
        path: 'transactions-label/:id', 
        loadComponent: () => import('./home/transactions/transaction-label/transaction-label.component').then(mod => mod.TransactionLabelComponent),
        canActivate: [permissionGuard('manage_transactions')]
    },
    { 
        path: 'login', 
        loadComponent: () => import('./auth/login/login.component').then(mod => mod.LoginComponent) 
    },
    { 
        path: 'forbidden', 
        loadComponent: () => import('./error/forbidden/forbidden.component').then(mod => mod.ForbiddenComponent) 
    },
    { 
        path: 'not-found', 
        loadComponent: () => import('./error/not-found/not-found.component').then(mod => mod.NotFoundComponent) 
    }
];
