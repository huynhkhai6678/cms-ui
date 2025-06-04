import { Component, computed, Signal } from '@angular/core';
import { TestimonialsComponent } from "../shared/testimonials/testimonials.component";
import { AboutUsComponent } from '../shared/about-us/about-us.component';
import { FrontService } from '../front.service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-landing',
  imports: [
    TestimonialsComponent,
    AboutUsComponent,
    RouterLink,
    TranslatePipe,
    SlickCarouselModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  setting! : Signal<any>;
  data! : Signal<any>;
  slideConfig = {
    dots: true,
    centerPadding: '0',
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  chunkServicesData = computed(() => {
    const arr : any = [];
    if (this.data()) {
      for (let i = 0; i < this.data().services.length; i += 2) {
        arr.push(this.data().services.slice(i, i + 2));
      }
      return arr;
    }
    return arr;
  })

  constructor(private frontService: FrontService) {
    this.setting = this.frontService.setting;
    this.data = toSignal(
      toObservable(this.setting).pipe(  
        filter((params: any) => params['clinic_id']),
        switchMap((params) => this.getData(params))
      ),
    );
  }

  getData(params : any) {
    return this.frontService.getLanding(params['clinic_id']);
  }
}
