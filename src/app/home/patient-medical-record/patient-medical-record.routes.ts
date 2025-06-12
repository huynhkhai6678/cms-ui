import { Routes } from '@angular/router';
import { permissionGuard } from '../../auths/permission.guard';
import { PatientMedicalRecordComponent } from './patient-medical-record.component';

export const patientMedicalRecordRoutes: Routes = [
  {
    path: '',
    component: PatientMedicalRecordComponent,
    canActivate: [permissionGuard('manage_patients')],
    data: { 
      title: 'messages.patients' 
    }
  },
  {
    path: 'blood-pressure',
    loadComponent: () => import('./patient-medical-record-blood-pressure/patient-medical-record-blood-pressure.component').then(mod => mod.PatientMedicalRecordBloodPressureComponent),
    canActivate: [permissionGuard('manage_patients')],
    data: { 
      title: 'messages.patients' 
    }
  },
  {
    path: 'pulse-rate',
    loadComponent: () => import('./patient-medical-record-pulse-rate/patient-medical-record-pulse-rate.component').then(mod => mod.PatientMedicalRecordPulseRateComponent),
    canActivate: [permissionGuard('manage_patients')],
    data: { 
      title: 'messages.patients' 
    }
  },
  {
    path: 'weight',
    loadComponent: () => import('./patient-medical-record-weight/patient-medical-record-weight.component').then(mod => mod.PatientMedicalRecordWeightComponent),
    canActivate: [permissionGuard('manage_patients')],
    data: { 
      title: 'messages.patients' 
    }
  },
  {
    path: 'temperature',
    loadComponent: () => import('./patient-medical-record-temperature/patient-medical-record-temperature.component').then(mod => mod.PatientMedicalRecordTemperatureComponent),
    canActivate: [permissionGuard('manage_patients')],
    data: { 
      title: 'messages.patients' 
    }
  }
];