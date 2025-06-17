import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-forgot-password',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm! : FormGroup;
  showAlert = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private themeService : ThemeService,
    private authService: AuthService,
  ) {

  }

  ngOnInit(): void {
    this.themeService.initLoginTheme();
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  forgot(value: any, valid: boolean) {
    this.showAlert = false;
    if (!valid) {
      return;
    }

    this.authService.forgotPassword(value).subscribe({
      next : (res: any) => {
        this.successMessage = res['message'];
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
