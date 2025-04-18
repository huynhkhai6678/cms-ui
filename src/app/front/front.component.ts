import { Component, OnInit, signal } from '@angular/core';
import { FrontHeaderComponent } from "./front-header/front-header.component";
import { FrontFooterComponent } from "./front-footer/front-footer.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FrontService } from './front.service';

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
    private frontService : FrontService
  ) {
    
  }

  ngOnInit(): void {
    const front = document.getElementById('front-page-theme') as HTMLLinkElement;
    const front3 = document.getElementById('front-third-party-theme') as HTMLLinkElement;
    const light = document.getElementById('light-theme') as HTMLLinkElement;
    const dark = document.getElementById('dark-theme') as HTMLLinkElement;

    front3.disabled = false;
    front.disabled = false;
    dark.disabled = true;
    light.disabled = true;

    this.data = this.frontService.setting;

    this.activatedRoute.queryParams.subscribe(params => {
      let name = params['name'] ?? 'default';
        this.frontService.getClinicSetting(name).subscribe((response : any) => {
          this.frontService.updateSignal(response.data);
        });
    });

  }

}
