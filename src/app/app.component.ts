import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ThemeService } from './services/theme.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    ThemeService
  ],
  imports: [
    NgxSpinnerModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cms-ui';

  constructor(private translate: TranslateService, private authService : AuthService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    let user = this.authService.getUser();
    if (this.authService.getUser()) {
      this.translate.use(user.language);
    }
  }
}
