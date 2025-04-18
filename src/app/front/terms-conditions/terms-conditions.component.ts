import { Component, OnInit, ɵunwrapWritableSignal } from '@angular/core';
import { FrontService } from '../front.service';

@Component({
  selector: 'app-terms-conditions',
  imports: [],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss'
})
export class TermsConditionsComponent implements OnInit {
  data = ɵunwrapWritableSignal<any>({});

  constructor(private frontService: FrontService) {}

  ngOnInit(): void {
    this.data = this.frontService.setting;
  }
}
