import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { filter } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { ModalModule, BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeLanguageModalComponent } from './change-language-modal/change-language-modal.component';
import { ThemeService } from '../../services/theme.service';
import { ProfileService } from './home-header.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [
    BsDropdownModule,
    RouterModule,
    CommonModule,
    ModalModule,
    TranslatePipe,
  ],
  providers: [
    BsModalService,
    ProfileService
  ],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.scss'
})
export class HomeHeaderComponent implements OnInit {
  headerRoutes = signal<any[]>([]);
  darkMode = signal<boolean>(false);
  user = signal<any>({});
  bsModalRef?: BsModalRef;

  iconClass = computed(() => {
    if (this.darkMode()) {
      return 'fa-sun';
    }
    return 'fa-moon';
  });

  readonly allHeaderRoutes = {
    'clinics': [
      {
        name : 'Clinics',
        link: 'clinics'
      }
    ],
    'clinic-chains': [
      {
        name : 'Chains',
        link: 'clinic-chains'
      }
    ],
    'users': [
      {
        name : 'Users',
        link: 'users'
      }
    ]
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private modalService: BsModalService,
    private profileService: ProfileService,
    private themeService: ThemeService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {

  }

  ngOnInit(): void {
    let user = this.authService.getUser();
    this.user.set(user);
    this.darkMode.set(user.dark_mode);
    
    this.setRouter(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event:NavigationStart) => {      
      this.setRouter(event.url);
    });
  }

  setRouter(url: string) {
    for (const [key, value] of Object.entries(this.allHeaderRoutes)) {
      if (url.indexOf(key) >= 0) {
        this.headerRoutes.set(value);
        return;
      }
    }
  }

  logout() {
    this.authService.logout();
  }

  openChangePassword() {
    this.bsModalRef = this.modalService.show(ChangePasswordComponent);
  }

  openChangeLanguage() {
    this.bsModalRef = this.modalService.show(ChangeLanguageModalComponent);
  }

  openProfile() {
    this.bsModalRef = this.modalService.show(ProfileModalComponent, { class: 'modal-lg'});
  }

  toggleTheme() {
    let dark = this.darkMode();
    this.profileService.updateTheme(!dark).subscribe({
      next : (res: any) => {
        this.translateService.get('messages.flash.theme_change').subscribe((message: string) => {
          this.toastr.success(message);
          this.darkMode.set(!dark);

          let user = this.authService.getUser();
          user.dark_mode = !dark;
          this.authService.saveUser(user);

          this.themeService.changeTheme(this.darkMode());
        });
      },
      error: (error) => {
        this.toastr.error(error.error);
      }
    })
  }
}
