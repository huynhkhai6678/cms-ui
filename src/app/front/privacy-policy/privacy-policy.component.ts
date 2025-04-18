import { Component, OnInit, ɵunwrapWritableSignal } from '@angular/core';
import { FrontService } from '../front.service';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {
  data = ɵunwrapWritableSignal<any>({});

  constructor(private frontService: FrontService) {}

  ngOnInit(): void {
    this.data = this.frontService.setting;
  }
}
