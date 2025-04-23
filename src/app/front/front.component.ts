import { Component, OnInit, signal } from '@angular/core';
import { FrontHeaderComponent } from "./front-header/front-header.component";
import { FrontFooterComponent } from "./front-footer/front-footer.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FrontService } from './front.service';
import { ThemeService } from '../services/theme.service';

declare var $: any;

@Component({
  selector: 'app-front',
  imports: [FrontHeaderComponent, FrontFooterComponent, RouterModule],
  providers: [FrontService],
  templateUrl: './front.component.html',
  styleUrl: './front.component.scss'
})
export class FrontComponent implements OnInit {
  data: any;

  constructor(
    private activatedRoute : ActivatedRoute,
    private frontService : FrontService,
    private themeService : ThemeService
  ) {
    
  }

  ngOnInit(): void {
    this.themeService.initFrontTheme();

    this.data = this.frontService.setting;

    this.activatedRoute.queryParams.subscribe(params => {
      let name = params['name'] ?? 'default';
        this.frontService.getClinicSetting(name).subscribe((response : any) => {
          this.frontService.updateSignal(response.data);
        });
    });
  }

}
