import { Component, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Select2 } from 'ng-select2-component';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../home-header.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-change-language-modal',
  providers: [
    ProfileService
  ],
  imports: [
    TranslatePipe,
    Select2,
    FormsModule
  ],
  templateUrl: './change-language-modal.component.html',
  styleUrl: './change-language-modal.component.scss'
})
export class ChangeLanguageModalComponent implements OnInit {

  selectedLanguage! : string;

  readonly LANGUAGES = [
    { label: 'English', value: 'en'},
    { label: '中文', value: 'zh'},
    { label: 'Bahasa', value: 'id'},
    { label: 'ភាសាខ្មែរ', value: 'km'},
  ]

  readonly OLD = [
    { label: 'English', value: 'en'},
    { label: 'Spanish', value: 'es'},
    { label: 'French', value: 'fr'},
    { label: 'German', value: 'de'},
    { label: 'Russian', value: 'ru'},
    { label: 'Portuguese', value: 'pt'},
    { label: 'Arabic', value: 'ar'},
    { label: 'Chinese', value: 'zh'},
    { label: 'Turkish', value: 'tr'},
    { label: 'Italian', value: 'it'}
  ]

  constructor(
    public bsModalRef: BsModalRef, 
    private translateService: TranslateService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = this.translateService.currentLang;
  }

  changeLanguage() {
    this.profileService.updateLanguage(this.selectedLanguage).subscribe({
      next : () => {
        this.translateService.get('messages.flash.language_update').subscribe((message: string) => {
          this.toastr.success(message);

          const user = this.authService.getUser();
          user.language = this.selectedLanguage;
          this.authService.saveUser(user);
          
          this.translateService.use(this.selectedLanguage);
          this.bsModalRef.hide();
        });
      },
      error: (error) => {
        this.toastr.error(error.error);
      }
    })
  }
}
