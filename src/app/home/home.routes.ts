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
        canActivate: [],
        data: { 
          title: 'messages.dashboard' 
        }
      },
      {
        path: 'appointments',
        loadComponent: () => import('./appointments/appointments.component').then(mod => mod.AppointmentsComponent),
        canActivate: [permissionGuard('manage_appointments')],
        data: { 
          title: 'messages.appointments' 
        }
      },
      {
        path: 'appointments/list',
        loadComponent: () => import('./appointments/appointment-list/appointment-list.component').then(mod => mod.AppointmentListComponent),
        canActivate: [permissionGuard('manage_appointments')],
        data: { 
          title: 'messages.appointments' 
        }
      },
      {
          path: 'clinics',
          loadComponent: () => import('./clinics/clinics.component').then(mod => mod.ClinicsComponent),
          canActivate: [permissionGuard('manage_clinics')],
          data: { 
            title: 'messages.clinics.clinics' 
          }
      },
      {
          path: 'clinic-chains',
          loadComponent: () => import('./clinic-chain/clinic-chain.component').then(mod => mod.ClinicChainComponent),
          canActivate: [permissionGuard('manage_clinic_brands')],
          data: { 
            title: 'messages.clinic-chains' 
          }
      },
      {
        path: 'roles',
        loadComponent: () => import('./roles/roles.component').then(mod => mod.RolesComponent),
        canActivate: [permissionGuard('manage_roles')],
        data: { 
          title: 'messages.roles' 
        }
      },
      {
        path: 'currencies',
        loadComponent: () => import('./currencies/currencies.component').then(mod => mod.CurrenciesComponent),
        canActivate: [permissionGuard('manage_currencies')],
        data: { 
          title: 'messages.currencies' 
        }
      },
      {
          path: 'users',
          loadComponent: () => import('./users/users.component').then(mod => mod.UsersComponent),
          canActivate: [permissionGuard('manage_users')],
          data: { 
            title: 'messages.users' 
          }
      },
      {
          path: 'enquiries',
          loadComponent: () => import('./enquiries/enquiries.component').then(mod => mod.EnquiriesComponent),
          canActivate: [permissionGuard('manage_front_cms')],
          data: { 
            title: 'messages.enquiries' 
          }
      },
      {
        path: 'subscribers',
        loadComponent: () => import('./subscribes/subscribes.component').then(mod => mod.SubscribesComponent),
        canActivate: [permissionGuard('manage_settings')],
        data: { 
          title: 'js.subscribers' 
        }
      },
      {
        path: 'clinic-services',
        loadComponent: () => import('./clinic-services/clinic-services.component').then(mod => mod.ClinicServicesComponent),
        canActivate: [permissionGuard('manage_clinic_service')],
        data: { 
          title: 'messages.clinic_service' 
        }
      },
      {
        path: 'clinic-document-setting',
        loadComponent: () => import('./clinic-document-setting/clinic-document-setting.component').then(mod => mod.ClinicDocumentSettingComponent),
        canActivate: [permissionGuard('manage_settings')],
        data: {
          title: 'messages.clinic_document_setting',
        }
      },
      {
        path: 'specializations',
        loadComponent: () => import('./specializations/specializations.component').then(mod => mod.SpecializationsComponent),
        canActivate: [permissionGuard('manage_settings')],
        data: {
          title: 'messages.specializations',
        }
      },
      {
        path: 'clinic-schedules',
        loadComponent: () => import('./clinic-schedules/clinic-schedules.component').then(mod => mod.ClinicSchedulesComponent),
        canActivate: [permissionGuard('manage_settings')],
        data: { 
          title: 'messages.clinic_schedules' 
        }
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.component').then(mod => mod.SettingsComponent),
        canActivate: [permissionGuard('manage_settings')],
        data: { 
          title: 'messages.settings' 
        }
      },
      {
        path: 'cms',
        loadComponent: () => import('./cms/cms.component').then(mod => mod.CmsComponent),
        canActivate: [permissionGuard('manage_front_cms')],
        data: { 
          title: 'messages.cms' 
        }
      },
      {
        path: 'services',
        loadComponent: () => import('./services/services.component').then(mod => mod.ServicesComponent),
        canActivate: [permissionGuard('manage_front_cms')],
        data: { 
          title: 'messages.services' 
        }
      },
      {
        path: 'service-categories',
        loadComponent: () => import('./service-categories/service-categories.component').then(mod => mod.ServiceCategoriesComponent),
        canActivate: [permissionGuard('manage_front_cms')],
        data: { 
          title: 'messages.service_categories' 
        }
      },
      {
        path: 'sliders',
        loadComponent: () => import('./sliders/sliders.component').then(mod => mod.SlidersComponent),
        canActivate: [permissionGuard('manage_front_cms')],
        data: { 
          title: 'messages.sliders' 
        }
      },
      {
        path: 'faqs',
        loadComponent: () => import('./faqs/faqs.component').then(mod => mod.FaqsComponent),
        canActivate: [permissionGuard('manage_front_cms')],
        data: { 
          title: 'messages.faqs' 
        }
      },
      {
        path: 'testimonials',
        loadComponent: () => import('./testimonials/testimonials.component').then(mod => mod.TestimonialsComponent),
        canActivate: [permissionGuard('manage_front_cms')],
        data: { 
          title: 'messages.front_patient_testimonials' 
        }
      },
      {
        path: 'doctors',
        loadComponent: () => import('./doctors/doctors.component').then(mod => mod.DoctorsComponent),
        canActivate: [permissionGuard('manage_doctors')],
        data: { 
          title: 'messages.doctors' 
        }
      },
      {
        path: 'doctors/:id',
        loadComponent: () => import('./doctors/doctor-detail/doctor-detail.component').then(mod => mod.DoctorDetailComponent),
        canActivate: [permissionGuard('manage_doctors')],
        data: { 
          title: 'messages.doctors' 
        }
      },
      {
        path: 'staffs',
        loadComponent: () => import('./staffs/staffs.component').then(mod => mod.StaffsComponent),
        canActivate: [permissionGuard('manage_staff')],
        data: { 
          title: 'messages.staffs' 
        }
      },
      {
        path: 'staffs/:id',
        loadComponent: () => import('./staffs/staff-detail/staff-detail.component').then(mod => mod.StaffDetailComponent),
        canActivate: [permissionGuard('manage_staff')],
        data: { 
          title: 'messages.staffs' 
        }
      },
      {
        path: 'doctor-holidays',
        loadComponent: () => import('./doctor-holidays/doctor-holidays.component').then(mod => mod.DoctorHolidaysComponent),
        canActivate: [permissionGuard('manage_staff')],
        data: { 
          title: 'messages.holiday.doctor_holiday' 
        }
      },
      {
        path: 'patients',
        loadComponent: () => import('./patients/patients.component').then(mod => mod.PatientsComponent),
        canActivate: [permissionGuard('manage_patients')],
        data: { 
          title: 'messages.patients' 
        }
      },
      {
        path: 'patient-medical-record/:id',
        loadChildren: () => import('./patient-medical-record/patient-medical-record.routes').then(mod => mod.patientMedicalRecordRoutes),
      },
      {
        path: 'patients/:id',
        loadComponent: () => import('./patients/patient-detail/patient-detail.component').then(mod => mod.PatientDetailComponent),
        canActivate: [permissionGuard('manage_patients')],
        data: { 
          title: 'messages.patients' 
        }
      },
      {
        path: 'visits',
        loadComponent: () => import('./visits/visits.component').then(mod => mod.VisitsComponent),
        canActivate: [permissionGuard('manage_patients')],
        data: { 
          title: 'messages.visits' 
        }
      },
      {
        path: 'smart-patient-cards',
        loadComponent: () => import('./smart-patient-cards/smart-patient-cards.component').then(mod => mod.SmartPatientCardsComponent),
        canActivate: [permissionGuard('manage_patients')],
        data: { 
          title: 'messages.smart_patient_card.smart_patient_cards' 
        }
      },
      {
        path: 'generate-patient-smart-cards',
        loadComponent: () => import('./generate-patient-smart-cards/generate-patient-smart-cards.component').then(mod => mod.GeneratePatientSmartCardsComponent),
        canActivate: [permissionGuard('manage_patients')],
        data: { 
          title: 'messages.smart_patient_card.generate_patient_smart_cards' 
        }
      },
      {
        path: 'medicines', 
        loadComponent: () => import('./medicines/medicines.component').then(mod => mod.MedicinesComponent),
        canActivate: [permissionGuard('manage_medicines')],
        data: { 
          title: 'messages.medicines' 
        }
      },
      {
        path: 'medicine-inventories/:id', 
        loadComponent: () => import('./medicine-inventories/medicine-inventories.component').then(mod => mod.MedicineInventoriesComponent),
        canActivate: [permissionGuard('manage_medicines')],
        data: { 
          title: 'messages.medicine-inventory.labels' 
        }
      },
      {
        path: 'medicine-inventory-usages/:id', 
        loadComponent: () => import('./medicine-inventory-usages/medicine-inventory-usages.component').then(mod => mod.MedicineInventoryUsagesComponent),
        canActivate: [permissionGuard('manage_medicines')],
        data: { 
          title: 'messages.medicine-inventory.labels' 
        }
      },
      {
        path: 'medicine-purchase', 
        loadComponent: () => import('./medicine-purchase/medicine-purchase.component').then(mod => mod.MedicinePurchaseComponent),
        canActivate: [permissionGuard('manage_medicines')],
        data: { 
          title: 'messages.purchase_medicine.purchase_medicines' 
        }
      },
      {
        path: 'labels', 
        loadComponent: () => import('./labels/labels.component').then(mod => mod.LabelsComponent),
        canActivate: [permissionGuard('manage_medicines')],
        data: { 
          title: 'messages.labels' 
        }
      },
      {
        path: 'brands', 
        loadComponent: () => import('./brands/brands.component').then(mod => mod.BrandsComponent),
        canActivate: [permissionGuard('manage_medicines')],
        data: { 
          title: 'messages.brands' 
        }
      },
      {
        path: 'categories', 
        loadComponent: () => import('./categories/categories.component').then(mod => mod.CategoriesComponent),
        canActivate: [permissionGuard('manage_medicines')],
        data: { 
          title: 'messages.categories' 
        }
      },
      {
        path: 'transactions', 
        loadComponent: () => import('./transactions/transactions.component').then(mod => mod.TransactionsComponent),
        canActivate: [permissionGuard('manage_transactions')],
        data: {
          title: 'messages.transactions',
        }
      },
      {
        path: 'transactions/create/:id', 
        loadComponent: () => import('./transactions/transaction-create/transaction-create.component').then(mod => mod.TransactionCreateComponent),
        canActivate: [permissionGuard('manage_transactions')],
        data: {
          title: 'messages.transactions',
        }
      },
      {
        path: 'reports/sales', 
        loadComponent: () => import('./reports/daily-sales/daily-sales.component').then(mod => mod.DailySalesComponent),
        canActivate: [permissionGuard('manage_report')],
        data: {
          title: 'messages.reports',
        }
      },
      {
        path: 'reports/service-inventory-sales', 
        loadComponent: () => import('./reports/service-inventory-sales/service-inventory-sales.component').then(mod => mod.ServiceInventorySalesComponent),
        canActivate: [permissionGuard('manage_report')],
        data: {
          title: 'messages.reports',
        }
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
];