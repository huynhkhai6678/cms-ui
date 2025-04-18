import { Component, computed, signal, Signal } from '@angular/core';
import { HeroSectionComponent } from '../shared/hero-section/hero-section.component';
import { FrontService } from '../front.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faqs',
  imports: [
    HeroSectionComponent,
    CommonModule
  ],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss'
})
export class FaqsComponent {
  setting! : Signal<any>;
  faqs! : Signal<any>;
  
  collapseds: { collapsed: boolean }[] = [];
  collapseItem = signal<number>(0);

  constructor(private frontService: FrontService) {
    this.setting = this.frontService.setting;
    this.faqs = toSignal<FAQ[]>(
      toObservable(this.setting).pipe(
        filter((params : any) => params['clinic_id']),
        switchMap((params) => this.getData(params))
      )
    )
  }

  getData(params : any) {
    return this.frontService.getFaqs(params['clinic_id']).pipe(
      map((data : any) => { return data.data })
    )
  }

  setAccordian(id : number) {
    id !== this.collapseItem() ? this.collapseItem.set(id) : this.collapseItem.set(0);
  }
}


export interface FAQ {
  id: number;
  question: string;
  answer: string;
  collapsed : false
}