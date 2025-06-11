import { Routes } from '@angular/router';
import { permissionGuard } from '../../auths/permission.guard';
import { PatientMedicalRecordComponent } from './patient-medical-record.component';

export const patientMedicalRecordRoutes: Routes = [
  {
    path: '',
    component: PatientMedicalRecordComponent,
    children: [
      {
        path: 'blood-pressure',
        loadComponent: () => import('./patient-medical-record-blood-pressure/patient-medical-record-blood-pressure.component').then(mod => mod.PatientMedicalRecordBloodPressureComponent),
        canActivate: [permissionGuard('manage_appointments')],
        data: { 
          title: 'messages.dashboard' 
        }
      },
    ]
  },
];