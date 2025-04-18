import { Component, ɵunwrapWritableSignal } from '@angular/core';
import { HeroSectionComponent } from '../shared/hero-section/hero-section.component';
import { ServiceCounterComponent } from "../shared/service-counter/service-counter.component";
import { TestimonialsComponent } from "../shared/testimonials/testimonials.component";
import { AboutUsComponent } from "../shared/about-us/about-us.component";
import { FrontService } from '../front.service';
import { FrontDoctor, FrontDoctorComponent } from '../shared/front-doctor/front-doctor.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-medical-about-us',
  imports: [
    HeroSectionComponent,
    ServiceCounterComponent,
    TestimonialsComponent,
    AboutUsComponent,
    FrontDoctorComponent,
    TranslatePipe
],
  templateUrl: './medical-about-us.component.html',
  styleUrl: './medical-about-us.component.scss'
})
export class MedicalAboutUsComponent {
  setting = ɵunwrapWritableSignal<any>({});
  doctors =  ɵunwrapWritableSignal<any>({});

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
      return this.frontService.getTopDoctor(params['clinic_id']).pipe(
        map((data : any) => { return data.data })
      );
  }
}
