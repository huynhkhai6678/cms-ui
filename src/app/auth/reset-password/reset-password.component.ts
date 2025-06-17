import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    TranslatePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetForm! : FormGroup;
  isSubmitted = false;
  showAlert = false;
  showNewPassword = false;
  showComfirmPassword = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private themeService : ThemeService,
    private activeRoute : ActivatedRoute,
    private authService: AuthService,
  ) {

  }

  ngOnInit(): void {
    this.themeService.initLoginTheme();
    this.resetForm = this.fb.group({
      token : ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });

    this.activeRoute.queryParams.subscribe((queryParams : any) => {
      if (queryParams['token']) {
        this.resetForm.controls['token'].setValue(queryParams['token']);
      }
    });
  }

  forgot(value: any, valid: boolean) {
    this.showAlert = false;
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.authService.resetPassword(value).subscribe({
      next : (res: any) => {
        this.successMessage = res['message'];
        this.isSubmitted = false;
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000);
      },
      error: () => {
        this.showAlert = true;
      }
    });
  }
}
