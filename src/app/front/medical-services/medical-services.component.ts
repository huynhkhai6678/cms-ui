import { Component, ɵunwrapWritableSignal } from '@angular/core';
import { HeroSectionComponent } from '../shared/hero-section/hero-section.component';
import { ServiceCounterComponent } from "../shared/service-counter/service-counter.component";
import { FrontService } from '../front.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-medical-services',
  imports: [
    RouterModule,
    TranslatePipe,
    HeroSectionComponent,
    ServiceCounterComponent
],
  templateUrl: './medical-services.component.html',
  styleUrl: './medical-services.component.scss'
})
export class MedicalServicesComponent {
  setting = ɵunwrapWritableSignal<any>({});
  services = ɵunwrapWritableSignal<any>([])

  constructor(private frontService: FrontService) {
    this.setting = this.frontService.setting;
    this.services = toSignal(
      toObservable(this.setting).pipe(
        filter((params : any) => params['clinic_id']),
        switchMap(params => this.getData(params))
      )
    )
  }

  getData(params : any) {
    return this.frontService.getServices(params['clinic_id']).pipe(
      map((data : any) => { return data.data })
    );
  }

}

export interface Service {
  id: number;
  avatar : string;
  name : string;
  short_description : string;
}
