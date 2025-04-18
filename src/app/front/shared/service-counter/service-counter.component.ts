import { Component, signal, ɵunwrapWritableSignal } from '@angular/core';
import { FrontService } from '../../front.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap, map } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-service-counter',
  imports: [
    TranslatePipe
  ],
  templateUrl: './service-counter.component.html',
  styleUrl: './service-counter.component.scss'
})
export class ServiceCounterComponent {
  setting = ɵunwrapWritableSignal<any>({});
  data = ɵunwrapWritableSignal<any>({});

  constructor(private frontService: FrontService) {
    this.setting = this.frontService.setting;
    this.data = toSignal<ServiceCounter[]>(
      toObservable(this.setting).pipe(  
        filter((params: any) => params['clinic_id']),
        switchMap((params) => this.getData(params))
      ),
    );
  }

  getData(params : any) {
    return this.frontService.getServiceCounter(params['clinic_id']).pipe(
      map((data : any) => { return data.data })
    );
  }
}

export interface ServiceCounter {
  specializations : number;
  services : number;
  doctors : number;
  patients : number;
}
