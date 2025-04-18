import { Routes } from '@angular/router';
import { authGuard } from './auths/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./front/front.routes').then(mod => mod.frontRoutes),
        canActivate: [authGuard] 
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then(mod => mod.homeRoutes),
        canActivate: [authGuard] 
    },
    { 
        path: 'login', 
        loadComponent: () => import('./auth/login/login.component').then(mod => mod.LoginComponent) 
    }
];
