import { Component, HostListener, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-front-header',
  imports: [
    TranslatePipe,
    RouterModule,
    BsDropdownModule
  ],
  templateUrl: './front-header.component.html',
  styleUrl: './front-header.component.scss'
})
export class FrontHeaderComponent implements OnInit {
  headerClass = signal<string>('');
  currentLanguage = signal<string>('English');
  isLogin = signal<boolean>(false);

  readonly languages = [
    { name: 'English', code: 'en', flag: 'flags/united-states.svg' },
    { name: 'Spanish', code: 'es', flag: 'flags/spain.svg' },
    { name: 'French', code: 'fr', flag: 'flags/france.svg' },
    { name: 'German', code: 'de', flag: 'flags/germany.svg' },
    { name: 'Russian', code: 'ru', flag: 'flags/russia.svg' },
    { name: 'Portuguese', code: 'pt', flag: 'flags/portugal.svg' },
    { name: 'Arabic', code: 'ar', flag: 'flags/iraq.svg' },
    { name: 'Chinese', code: 'zh', flag: 'flags/china.svg' },
    { name: 'Turkish', code: 'tr', flag: 'flags/turkey.svg' },
    { name: 'Italian', code: 'it', flag: 'flags/italy.svg' }
  ]

  constructor(private translateService: TranslateService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.isLogin.set(true);
    }
  }

  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 100) {
      this.headerClass.set('fixed');
    } else {
      this.headerClass.set('');
    }
  }

  setLanguage(code : string) {
    this.translateService.use(code);
    const lang = this.languages.filter(language => { return language.code === code});
    this.currentLanguage.set(lang[0]['name']);
  }

  login() {
    if (this.isLogin()) {
      if (this.authService.isSuperAdmin()) {
        this.router.navigate(['/home/clinics']);
        return;
      } else {
        this.router.navigate(['/home/dashboard']);
        return;
      }
    }

    this.router.navigate(['/login']);
  }
}
