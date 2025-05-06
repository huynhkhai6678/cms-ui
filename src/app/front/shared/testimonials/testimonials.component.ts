import { Component, inject } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FrontService } from '../../front.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    SlickCarouselModule
  ],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  frontService = inject(FrontService);
  setting = this.frontService.setting;
  testimonials = toSignal<Testimonial[]>(
    toObservable(this.setting).pipe(  
      filter((params: any) => params['clinic_id']),
      switchMap((params) => this.getData(params))
    ),
  );

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

  getData(params : any) {
    return this.frontService.getClinicTestominal(params['clinic_id']).pipe(
      map((data : any) => { return data.data })
    );
  }
}

export interface Testimonial {
  id: number;
  name: string;
  designation: string;
  short_description: string;
  is_default: boolean;
  clinic_id: number;
}
