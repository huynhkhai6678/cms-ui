import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { filter } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
  headerRoutes = signal<RouteData[]>([]);
  darkMode = signal<boolean>(false);
  user = signal<any>({});
  bsModalRef?: BsModalRef;

  iconClass = computed(() => {
    if (this.darkMode()) {
      return 'fa-sun';
    }
    return 'fa-moon';
  });

  readonly allHeaderRoutes : Record<string, RouteData[]> = {
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
    ],
    'clinic-services': [
      {
        name : 'messages.clinic_service',
        link: 'clinic-services'
      }
    ],
    'patients': [
      {
        name : 'messages.patients',
        link: 'patients'
      }
    ],
    'smart-patient-cards': [
      {
        name : 'messages.smart_patient_card.smart_patient_cards',
        link: 'smart-patient-cards'
      },
      {
        name : 'messages.smart_patient_card.generate_patient_smart_cards',
        link: 'generate-patient-smart-cards'
      }
    ],
    'medicines': [
      {
        name : 'messages.medicines',
        link: 'medicines'
      },
      {
        name : 'messages.labels',
        link: 'labels'
      },
      {
        name : 'messages.brands',
        link: 'brands'
      },
      {
        name : 'messages.categories',
        link: 'categories'
      }
    ],
    'master_list': [
      {
        name : 'messages.subscribers',
        link: 'subscribers'
      },
      {
        name : 'messages.clinic_document_setting',
        link: 'clinic-document-setting'
      }
    ],
    'website': [
      {
        name : 'messages.cms.cms',
        link: 'cms'
      },
      {
        name : 'messages.services',
        link: 'services'
      },
      {
        name : 'messages.service_categories',
        link: 'service-categories'
      },
      {
        name : 'messages.sliders',
        link: 'sliders'
      },
      {
        name : 'messages.faqs',
        link: 'faqs'
      },
      {
        name : 'messages.front_patient_testimonials',
        link: 'testimonials'
      }
    ],
    'settings': [
      {
        name : 'messages.settings',
        link: 'settings'
      },
      {
        name : 'messages.specializations',
        link: 'specializations'
      },
      {
        name : 'messages.clinic_schedules',
        link: 'clinic-schedules'
      }
    ],
    'user': [
      {
        name : 'messages.doctors',
        link: 'doctors'
      },
      {
        name : 'messages.staffs',
        link: 'staffs'
      },
      {
        name : 'messages.holiday.doctor_holiday',
        link: 'doctor-holidays'
      }
    ],
  }

  readonly sharedRoutesGroups = {
    'master_list': ['subscribers', 'clinic-document-setting'],
    'settings': ['settings', 'specializations', 'clinic-schedules'],
    'website' : ['cms', 'services', 'service-categories', 'sliders', 'faqs', 'testimonials'],
    'user' : ['doctors', 'staffs', 'doctor-holidays'],
    'smart-patient-cards' : ['smart-patient-cards', 'generate-patient-smart-cards'],
    'medicines' : ['medicines', 'brands', 'categories', 'labels']
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private profileService: ProfileService,
    private themeService: ThemeService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {

  }

  ngOnInit(): void {
    const user = this.authService.getUser();
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

    for (const [groupKey, routes] of Object.entries(this.sharedRoutesGroups)) {
      if (routes.some(route => url.indexOf(route) >= 0)) {
        this.headerRoutes.set(this.allHeaderRoutes[groupKey]);
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
    const dark = this.darkMode();
    this.profileService.updateTheme(!dark).subscribe({
      next : () => {
        this.translateService.get('messages.flash.theme_change').subscribe((message: string) => {
          this.toastr.success(message);
          this.darkMode.set(!dark);

          const user = this.authService.getUser();
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

interface RouteData {
  name: string;
  link: string;
}
