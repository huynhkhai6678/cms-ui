import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './services/theme.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthService } from './services/auth.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs';

moment.updateLocale('en', {
  week: {
    dow: 1, // Monday
  }
});

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    ThemeService,
  ],
  imports: [
    TabsModule,
    NgxSpinnerModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cms-ui';
  

  constructor(
    private translate: TranslateService, 
    private authService : AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    const user = this.authService.getUser();
    if (this.authService.getUser()) {
      this.translate.use(user.language);
    }

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute.firstChild;
          while (route?.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route?.data ?? [])
      )
      .subscribe(data => {
        if (data['title']) {
          this.translate.get(data['title']).subscribe((res : string) => {
            this.titleService.setTitle(res);
          });
        }
      });
  }
}
