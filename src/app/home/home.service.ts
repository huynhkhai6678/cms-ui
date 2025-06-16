import { Injectable, signal } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Clinic } from './clinics/clinic.model';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
  collapseSider = signal<boolean>(false);
  clinics : Clinic[] = [];
  selectClinics : any[] = [];
  socket: Socket;
  readonly apiUrl = environment.apiUrl;

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.socket = io(this.apiUrl, {
      auth: {
        token : this.authService.getToken()
      },
    });
  }

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

  onMessage(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('notification', (message: string) => {
        observer.next(message);
      });
    });
  }
}