import { Component, signal, Signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FrontService } from '../../front/front.service';
import moment from 'moment';

@Component({
  selector: 'app-home-footer',
  standalone: true,
  imports: [
    TranslatePipe
  ],
  templateUrl: './home-footer.component.html',
  styleUrl: './home-footer.component.scss'
})
export class HomeFooterComponent {
  setting! : Signal<any>;
  year = signal<number>(2025);

  constructor(private frontService: FrontService) {
    this.setting = this.frontService.setting;
    this.year.set(moment().year());
  }
}
