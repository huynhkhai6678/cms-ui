import { Routes } from '@angular/router';
import { FrontComponent } from './front.component';
import { LandingComponent } from './landing/landing.component';
import { MedicalContactComponent } from './medical-contact/medical-contact.component';
import { MedicalDoctorsComponent } from './medical-doctors/medical-doctors.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { MedicalAboutUsComponent } from './medical-about-us/medical-about-us.component';
import { MedicalServicesComponent } from './medical-services/medical-services.component';
import { FaqsComponent } from './faqs/faqs.component';

export const frontRoutes: Routes = [
  {
    path: '',
    component: FrontComponent,
    children: [
      { path: '', component: LandingComponent },
      { 
        path: 'medical-contact', 
        component: MedicalContactComponent 
      },
      { 
        path: 'medical-doctors', 
        component: MedicalDoctorsComponent 
      },
      { 
        path: 'medical-services', 
        component: MedicalServicesComponent 
      },
      { 
        path: 'medical-about-us', 
        component: MedicalAboutUsComponent 
      },
      { 
        path: 'faqs', 
        component: FaqsComponent
      },
      { 
        path: 'term-conditions', 
        component: TermsConditionsComponent
      },
      { 
        path: 'privacy-policy', 
        component: PrivacyPolicyComponent
      }
    ]
  },
];