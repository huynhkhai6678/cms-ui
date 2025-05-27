import { Injectable, signal } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Clinic } from './clinics/clinic.model';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
  collapseSider = signal<boolean>(false);
  clinics : Clinic[] = [];
  selectClinics : any[] = [];

  constructor(private apiService: ApiService) {}

  updateCollapseSidebar() {
    this.collapseSider.set(!this.collapseSider());
  }

  getClinics() {
    this.apiService.get(`auth/clinics`).subscribe({
      next : (res : any) => {
        this.clinics = res['data'];
        this.selectClinics = this.clinics.map(clinic => { return { value: clinic.id, label: clinic.name }});
      },
      error : (error) => {
        console.log(error);
        this.clinics = [];
      }
    });
  }

  getDoctorByClinic(clinicId : number) {
    return this.apiService.get(`helper/clinic-doctors/${clinicId}`);
  }

  getPatientByClinic(clinicId : number) {
    return this.apiService.get(`helper/clinic-patients/${clinicId}`);
  }

  getServiceByDoctor(doctorId : number, clinicId = 0) {
    return this.apiService.get(`helper/doctor-services/${doctorId}/${clinicId}`);
  }
}