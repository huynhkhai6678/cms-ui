import { Routes } from '@angular/router';
import { FrontComponent } from './front.component';

export const frontRoutes: Routes = [
  {
    path: '',
    component: FrontComponent,
    children: [
      { path: '',
        loadComponent: () => import('./landing/landing.component').then(mod => mod.LandingComponent),
      },
      { 
        path: 'medical-contact',
        loadComponent: () => import('./medical-contact/medical-contact.component').then(mod => mod.MedicalContactComponent),
      },
      { 
        path: 'medical-doctors',
        loadComponent: () => import('./medical-doctors/medical-doctors.component').then(mod => mod.MedicalDoctorsComponent),
      },
      { 
        path: 'medical-services',
        loadComponent: () => import('./medical-services/medical-services.component').then(mod => mod.MedicalServicesComponent),
      },
      { 
        path: 'medical-about-us',
        loadComponent: () => import('./medical-about-us/medical-about-us.component').then(mod => mod.MedicalAboutUsComponent),
      },
      { 
        path: 'faqs',
        loadComponent: () => import('./faqs/faqs.component').then(mod => mod.FaqsComponent),
      },
      { 
        path: 'term-conditions',
        loadComponent: () => import('./terms-conditions/terms-conditions.component').then(mod => mod.TermsConditionsComponent),
      },
      { 
        path: 'privacy-policy',
        loadComponent: () => import('./privacy-policy/privacy-policy.component').then(mod => mod.PrivacyPolicyComponent),
      }
    ]
  },
];