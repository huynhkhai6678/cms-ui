import { Component, ɵunwrapWritableSignal } from '@angular/core';
import { HeroSectionComponent } from '../shared/hero-section/hero-section.component';
import { FrontService } from '../front.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';
import { FrontDoctorComponent, FrontDoctor } from '../shared/front-doctor/front-doctor.component';

@Component({
  selector: 'app-medical-doctors',
  imports: [
    HeroSectionComponent,
    FrontDoctorComponent
],
  templateUrl: './medical-doctors.component.html',
  styleUrl: './medical-doctors.component.scss'
})
export class MedicalDoctorsComponent {

  setting = ɵunwrapWritableSignal<any>({});
  doctors = ɵunwrapWritableSignal<any>({});

  constructor(private frontService: FrontService) {
    this.setting = this.frontService.setting;
    this.doctors = toSignal<FrontDoctor[]>(
      toObservable(this.setting).pipe(  
        filter((params: any) => params['clinic_id']),
        switchMap((params) => this.getData(params))
      ),
    );
  }

  getData(params : any) {
      return this.frontService.getDoctor(params['clinic_id']).pipe(
        map((data : any) => { return data.data })
      );
  }
}
